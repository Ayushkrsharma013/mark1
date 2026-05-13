import { Bot, Workflow, Target, TrendingUp, Code2, Compass } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  size: "large" | "small";
}

export const services: Service[] = [
  {
    id: "ai-agents",
    title: "AI Agents & Chatbots",
    description:
      "Custom agents handling support, lead qualification, and scheduling. 24/7, zero human intervention, fully auditable.",
    icon: Bot,
    badge: "Most Popular",
    size: "large",
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    description:
      "End-to-end elimination of repetitive ops. Multi-step, multi-tool, self-healing pipelines.",
    icon: Workflow,
    size: "small",
  },
  {
    id: "lead-intelligence",
    title: "Lead Intelligence Engine",
    description:
      "AI-powered prospecting from LinkedIn, Google Maps, and Apollo. ICP scoring + personalized outreach at scale.",
    icon: Target,
    size: "small",
  },
  {
    id: "predictive-analytics",
    title: "Predictive Analytics",
    description:
      "Churn prediction, revenue modeling, ICP scoring. ML that turns your data into foresight.",
    icon: TrendingUp,
    size: "small",
  },
  {
    id: "custom-ai",
    title: "Custom AI Development",
    description:
      "Bespoke solutions built on Claude, GPT-4o, and open-source models. Tailored to your exact business logic.",
    icon: Code2,
    size: "large",
  },
  {
    id: "ai-strategy",
    title: "AI Strategy & Consulting",
    description:
      "We audit your operations, map automation opportunities, and build a phased roadmap that actually ships.",
    icon: Compass,
    size: "small",
  },
];
