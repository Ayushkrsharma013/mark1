import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/admin';

async function generateGeminiResponse(systemPrompt: string, taskDescription: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [
          { role: 'user', parts: [{ text: taskDescription }] },
        ],
        generationConfig: { maxOutputTokens: 1200, temperature: 0.7 },
      }),
    }
  );

  if (!response.ok) return null;
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
}

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getAdminClient() as any;

    const { data: task, error: taskError } = await db
      .from('agent_tasks')
      .select('*')
      .eq('id', id)
      .single();

    if (taskError || !task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    if (task.status !== 'pending') {
      return NextResponse.json(
        { error: 'Task already processed' },
        { status: 400 }
      );
    }

    const { data: agent, error: agentError } = await db
      .from('agents')
      .select('*')
      .eq('id', task.agent_id)
      .single();

    if (agentError || !agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    await db
      .from('agent_tasks')
      .update({ status: 'in_progress' })
      .eq('id', id);

    const result = await generateGeminiResponse(
      agent.system_prompt,
      task.description
    );

    if (result) {
      await db
        .from('agent_tasks')
        .update({
          status: 'completed',
          result,
          completed_at: new Date().toISOString(),
        })
        .eq('id', id);

      return NextResponse.json({ success: true, result });
    } else {
      await db
        .from('agent_tasks')
        .update({
          status: 'failed',
          result: 'Failed to generate response from AI model',
          completed_at: new Date().toISOString(),
        })
        .eq('id', id);

      return NextResponse.json({ error: 'Execution failed' }, { status: 500 });
    }
  } catch (error) {
    console.error('Task run error:', error);
    return NextResponse.json(
      { error: 'Failed to execute task' },
      { status: 500 }
    );
  }
}
