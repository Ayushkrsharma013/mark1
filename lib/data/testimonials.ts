export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  metric: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "FlowForges rebuilt our entire outreach pipeline in 12 days. We went from 5 qualified calls/week to 23. The Prospecting OS alone paid for 6 months of work.",
    name: "James R.",
    title: "Head of Growth",
    company: "Clearpath Agency",
    metric: "4.6x pipeline growth",
    initials: "JR",
  },
  {
    id: "2",
    quote:
      "The AI chatbot they deployed handles 80% of our support tickets automatically. Response time went from 4 hours to 28 seconds. Our team finally has breathing room.",
    name: "Priya S.",
    title: "VP Operations",
    company: "FinStack",
    metric: "80% ticket deflection",
    initials: "PS",
  },
  {
    id: "3",
    quote:
      "We brought them a spaghetti Zapier stack that was breaking every week. They replaced it with a self-healing n8n pipeline that's been running flawlessly for 4 months.",
    name: "Michael C.",
    title: "CTO",
    company: "DataBridge",
    metric: "Zero downtime since launch",
    initials: "MC",
  },
  {
    id: "4",
    quote:
      "Best ROI decision we made this year. Our proposal generation went from 3 hours to 11 minutes. We close deals faster because we respond faster.",
    name: "Sarah L.",
    title: "Founder",
    company: "Orbit Creative",
    metric: "93% time reduction",
    initials: "SL",
  },
  {
    id: "5",
    quote:
      "They didn't just build — they taught us. We understand every workflow they deployed. That ownership matters when you're scaling.",
    name: "Tom K.",
    title: "Director of Ops",
    company: "NorthScale",
    metric: "Full knowledge transfer",
    initials: "TK",
  },
  {
    id: "6",
    quote:
      "FlowForges understood our niche (recruitment agency automation) without us having to explain it. Felt like working with specialists, not generalists.",
    name: "Amara O.",
    title: "MD",
    company: "Apex Workflows",
    metric: "Deployed in 11 days",
    initials: "AO",
  },
];
