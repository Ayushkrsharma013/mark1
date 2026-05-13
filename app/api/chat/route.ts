import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the FlowForges AI Assistant. You help visitors learn about our agency and services.

About FlowForges:
- We are an AI automation agency founded by Ayush Kumar Sharma
- We build AI agents, workflow automation, predictive analytics, and custom AI solutions
- Our flagship product is Prospecting OS — an AI-powered B2B lead generation platform
- We offer: AI Agents & Chatbots, Workflow Automation, Custom AI Development, Productized Services, AI Analytics, AI Strategy & Consulting
- Location: India, serving clients worldwide
- Contact: hello@flowforges.com

Products page: /products — showcases Prospecting OS and upcoming products
Services page: /services — details all six service offerings with pricing
Case Studies: /case-studies — three detailed case studies with real metrics
Blog: /blog — articles about AI, automation, and engineering
Contact: /contact — form to reach us

Keep responses:
- Friendly and conversational
- Short (2-4 sentences max unless asked for detail)
- Focused on how we can help the visitor
- Be specific about our services and products when relevant
- If asked something you don't know, suggest they contact us at hello@flowforges.com`;

function buildFallbackReply(lastMsg: string): string {
  const lc = lastMsg.toLowerCase();

  if (lc.includes("price") || lc.includes("cost") || lc.includes("pricing")) {
    return "Our services start from $3,000 for AI strategy consulting, and go up to $15,000+ for custom AI development. Prospecting OS is available as a subscription. Check our /services page for full details, or email hello@flowforges.com for a tailored quote.";
  }
  if (lc.includes("service") || lc.includes("offer") || lc.includes("do")) {
    return "We offer six core services: AI Agents & Chatbots, Workflow Automation, Custom AI Development, Productized Services, AI Analytics, and AI Strategy Consulting. Head to /services for the full breakdown with pricing and deliverables!";
  }
  if (lc.includes("prospect") || lc.includes("lead") || lc.includes("sales")) {
    return "That's exactly what Prospecting OS is built for! It's our flagship product — an AI-powered B2B lead generation platform that scrapes, scores, and messages leads from LinkedIn, Google Maps, and Amazon. Check it out at /products!";
  }
  if (lc.includes("contact") || lc.includes("email") || lc.includes("reach")) {
    return "You can reach us at hello@flowforges.com, or use the contact form at /contact. We respond within 24 hours!";
  }
  if (lc.includes("who") || lc.includes("about") || lc.includes("founder")) {
    return "FlowForges was founded by Ayush Kumar Sharma. We're an AI automation agency based in India, serving clients worldwide. We build intelligence into businesses — from solo operators to enterprises.";
  }

  return "I'd love to help! Could you tell me more about what you're looking for? Our team at hello@flowforges.com can also give you a personalized response within 24 hours.";
}

interface ChatMessage {
  role: string;
  content: string;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      const lastMsg = messages[messages.length - 1]?.content || "";
      return NextResponse.json({ reply: buildFallbackReply(lastMsg) });
    }

    // Convert messages to Gemini format
    const contents = messages.map((m: ChatMessage) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents,
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm here to help! What would you like to know about FlowForges?";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply:
          "I'm having trouble connecting right now. Please email us at hello@flowforges.com and we'll get back to you within 24 hours!",
      },
      { status: 200 }
    );
  }
}
