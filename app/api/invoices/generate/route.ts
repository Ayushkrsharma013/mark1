import { NextRequest, NextResponse } from 'next/server';
import { requireAuthApi } from '@/lib/auth';

const SYSTEM_PROMPT = `You are FlowForges Invoice Agent. Extract invoice details from the user's message.

Return ONLY valid JSON in this exact format, no other text:
{
  "client_name": "Company or person name",
  "client_email": "email if mentioned or null",
  "items": [{"description": "Service description", "quantity": 1, "rate": 0, "amount": 0}],
  "tax_rate": 0,
  "notes": "any additional notes or empty string",
  "subtotal": 0,
  "tax_amount": 0,
  "total": 0
}

Rules:
- If user says "18% GST" or similar, set tax_rate to that number
- Calculate amounts: amount = quantity * rate, subtotal = sum of amounts, tax_amount = subtotal * (tax_rate / 100), total = subtotal + tax_amount
- Use whole numbers for rates unless decimal specified
- Default to 0 tax_rate if not mentioned
- Extract whatever details the user provides, leave missing fields as defaults`;

export async function POST(req: NextRequest) {
  try {
    await requireAuthApi();

    const body = await req.json();
    const { messages } = body as {
      messages: { role: 'user' | 'assistant'; content: string }[];
    };

    if (!messages?.length) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured' },
        { status: 500 }
      );
    }

    // Build conversation contents: system instruction + message history
    const contents = messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    if (contents.length === 0 || contents[contents.length - 1].role !== 'user') {
      return NextResponse.json({ error: 'Last message must be from user' }, { status: 400 });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents,
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 1024,
            response_mime_type: 'application/json',
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('No content in Gemini response');
    }

    let invoiceData;
    try {
      invoiceData = JSON.parse(text);
    } catch {
      // Fallback: extract JSON from markdown code block
      const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        invoiceData = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error('Failed to parse generated invoice as JSON');
      }
    }

    return NextResponse.json({ success: true, data: invoiceData });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    if (msg === 'Authentication required' || msg === 'Insufficient permissions') {
      return NextResponse.json({ error: msg }, { status: 401 });
    }
    console.error('[invoice/generate] Error:', msg);
    return NextResponse.json(
      { error: 'Failed to generate invoice', details: msg },
      { status: 500 }
    );
  }
}
