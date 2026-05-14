export type BookingStep =
  | "idle"
  | "collecting_name"
  | "collecting_company"
  | "collecting_email"
  | "collecting_datetime"
  | "confirming"
  | "done";

export interface BookingData {
  step: BookingStep;
  name?: string;
  company?: string;
  email?: string;
  date?: string;
  time?: string;
}

export function getNextStep(
  data: BookingData,
  userInput: string
): { step: BookingStep; data: BookingData; reply: string; done?: boolean } {
  const input = userInput.trim();
  const step = data.step;

  // idle → detect booking intent
  if (step === "idle") {
    const lc = input.toLowerCase();
    if (
      lc.includes("book") ||
      lc.includes("demo") ||
      lc.includes("schedule") ||
      lc.includes("appointment") ||
      lc.includes("call") ||
      lc.includes("meeting")
    ) {
      return {
        step: "collecting_name",
        data: { ...data, step: "collecting_name" },
        reply: "Awesome — let's get your demo booked! First, what's your full name?",
      };
    }
    // General knowledge
    if (lc.includes("price") || lc.includes("cost")) {
      return {
        step: "idle",
        data,
        reply: "Our services start from $39 for AI strategy consulting, and go up to $2,000+ for custom AI development. Prospecting OS is available as a subscription. Check our /pricing page for full details!",
      };
    }
    if (lc.includes("service") || lc.includes("offer")) {
      return {
        step: "idle",
        data,
        reply: "We offer six core services: AI Agents & Chatbots, Workflow Automation, Custom AI Development, Productized Services, AI Analytics, and AI Strategy Consulting. Want to book a demo to discuss your needs?",
      };
    }
    return {
      step: "idle",
      data,
      reply: "I can help you book a demo, answer questions about our services, or walk you through pricing. What would you like to know?",
    };
  }

  // collecting_name
  if (step === "collecting_name") {
    return {
      step: "collecting_company",
      data: { ...data, step: "collecting_company", name: input },
      reply: `Great, nice to meet you ${input}! What company are you with? (type "skip" if not applicable)`,
    };
  }

  // collecting_company
  if (step === "collecting_company") {
    const company = input.toLowerCase() === "skip" ? "" : input;
    return {
      step: "collecting_email",
      data: { ...data, step: "collecting_email", company },
      reply: `Got it${company ? ` — ${company}` : ""}. What's the best email to send the calendar invitation to?`,
    };
  }

  // collecting_email
  if (step === "collecting_email") {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
      return {
        step: "collecting_email",
        data,
        reply: "Hmm, that doesn't look like a valid email. Can you double-check?",
      };
    }
    return {
      step: "collecting_datetime",
      data: { ...data, step: "collecting_datetime", email: input },
      reply:
        "Perfect! Now, when works for you? Pick a date and time — for example: 'June 15 at 2:00 PM' or 'Next Monday 10:00 AM'.",
    };
  }

  // collecting_datetime
  if (step === "collecting_datetime") {
    const timeMatch = input.match(
      /(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)?/
    );
    const dateMatch = input.match(
      /(\d{4})-(\d{2})-(\d{2})|(\w+)\s+(\d{1,2})/
    );

    if (!dateMatch || !timeMatch) {
      return {
        step: "collecting_datetime",
        data,
        reply:
          "I need both a date and time to book this. Try something like 'June 15 at 2:00 PM' — what works for you?",
      };
    }

    // Use the matched date/time as stored values (simplified)
    const date = dateMatch[0];
    const time = timeMatch[0];

    return {
      step: "confirming",
      data: { ...data, step: "confirming", date, time },
      reply: `Here's what I have:\n\n📅 **${date}**\n🕐 **${time}**\n👤 **${data.name}**\n📧 **${data.email}**${data.company ? `\n🏢 **${data.company}**` : ""}\n\nDoes this look right? Type "confirm" to book it, or let me know what to change.`,
    };
  }

  // confirming
  if (step === "confirming") {
    const lc = input.toLowerCase();
    if (lc.includes("yes") || lc.includes("confirm") || lc.includes("looks good") || lc.includes("correct")) {
      return {
        step: "done",
        data: { ...data, step: "done" },
        reply: "You're all set! Your demo has been booked and a confirmation is on its way to your email. We're excited to chat! 🚀",
        done: true,
      };
    }
    // Restart
    return {
      step: "collecting_datetime",
      data: { ...data, step: "collecting_datetime" },
      reply: "No problem — let's try again. What date and time works best for you?",
    };
  }

  // done
  return {
    step: "done",
    data,
    reply: "Your demo is confirmed! Is there anything else I can help you with?",
  };
}
