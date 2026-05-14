import { NextResponse } from 'next/server';
import { requireAuthApi } from '@/lib/auth';
import { createSupabaseServerClientForApi } from '@/lib/supabase/admin';

interface ChatMessage {
  role: string;
  content: string;
}

async function generateGeminiResponse(systemPrompt: string, messages: ChatMessage[]) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return "I'm having trouble connecting right now. Please try again later.";
  }

  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: { maxOutputTokens: 1200, temperature: 0.7 },
      }),
    }
  );

  if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);

  const data = await response.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "I'm here to help! What would you like to work on?"
  );
}

export async function GET(req: Request) {
  try {
    const session = await requireAuthApi();
    const { searchParams } = new URL(req.url);
    const agentId = searchParams.get('agentId');

    if (!agentId) {
      return NextResponse.json({ error: 'agentId is required' }, { status: 400 });
    }

    const supabase = await createSupabaseServerClientForApi();
    const { data, error } = await supabase
      .from('agent_conversations' as any)
      .select('*')
      .eq('agent_id', agentId)
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return NextResponse.json({ messages: data || [] });
  } catch (error: any) {
    if (error.message === 'Authentication required') {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error('Agent chat GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch conversation' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await requireAuthApi();
    const body = await req.json();
    const { agentId, message } = body;

    if (!agentId || !message) {
      return NextResponse.json(
        { error: 'agentId and message are required' },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseServerClientForApi();

    const { data: agent, error: agentError } = await supabase
      .from('agents' as any)
      .select('*')
      .eq('id', agentId)
      .eq('user_id', session.user.id)
      .single();

    if (agentError || !agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    const { data: history, error: histError } = await supabase
      .from('agent_conversations' as any)
      .select('*')
      .eq('agent_id', agentId)
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(20);

    if (histError) console.error('History fetch error:', histError);

    const recentHistory = (history || [])
      .reverse()
      .map((h) => ({ role: h.role, content: h.content }));

    const geminiMessages = [...recentHistory, { role: 'user', content: message }];
    const reply = await generateGeminiResponse(agent.system_prompt, geminiMessages);

    const now = new Date().toISOString();
    const { error: insertError } = await supabase.from('agent_conversations').insert([
      {
        agent_id: agentId,
        user_id: session.user.id,
        role: 'user',
        content: message,
        created_at: now,
      },
      {
        agent_id: agentId,
        user_id: session.user.id,
        role: 'assistant',
        content: reply,
        created_at: now,
      },
    ]);

    if (insertError) console.error('Conversation insert error:', insertError);

    return NextResponse.json({ reply });
  } catch (error: any) {
    if (error.message === 'Authentication required') {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error('Agent chat POST error:', error);
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}
