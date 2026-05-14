import { NextResponse } from 'next/server';
import { requireAuthApi } from '@/lib/auth';
import { SKILLS } from '@/lib/skills/registry';

const BUILDER_SYSTEM_PROMPT = `You are the FlowForges Agent Builder Wizard. Your job is to help users create AI employees by understanding their needs and suggesting the right configuration.

When a user describes what they need, you should:
1. Suggest a creative name for the AI employee (single word, memorable)
2. Suggest a role title (e.g., "SEO Strategist", "Sales Development Rep")
3. Suggest 2-5 relevant skills from the available skill list
4. Write a brief description of what this agent will do

Available skills:
${SKILLS.map((s) => `- ${s.id}: ${s.name} — ${s.description}`).join('\n')}

Response format:
Always respond in this structured format:
NAME: <suggested name>
ROLE: <role title>
SKILLS: <comma-separated skill IDs>
DESCRIPTION: <2-3 sentence description>

Then add a friendly message confirming the configuration and asking if they'd like to create this agent.

If the user's request is vague, ask clarifying questions about their business, goals, or target audience.`;

interface ChatMessage {
  role: string;
  content: string;
}

async function generateBuilderResponse(messages: ChatMessage[]) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return "I'd love to help you build an agent! Could you tell me more about what tasks you need help with?";
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
        system_instruction: { parts: [{ text: BUILDER_SYSTEM_PROMPT }] },
        contents,
        generationConfig: { maxOutputTokens: 800, temperature: 0.8 },
      }),
    }
  );

  if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);

  const data = await response.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "I'm here to help you build the perfect AI employee! What do you need help with?"
  );
}

export async function POST(req: Request) {
  try {
    await requireAuthApi();
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'messages array is required' },
        { status: 400 }
      );
    }

    const reply = await generateBuilderResponse(messages);
    return NextResponse.json({ reply });
  } catch (error: any) {
    if (error.message === 'Authentication required') {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error('Agent builder error:', error);
    return NextResponse.json(
      { error: 'Failed to process builder chat' },
      { status: 500 }
    );
  }
}
