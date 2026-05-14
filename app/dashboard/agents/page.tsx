export const dynamic = "force-dynamic";

import { AgentGrid } from '@/components/agents/AgentGrid';

export default function AgentsPage() {
  return (
    <div className="px-6 py-6 lg:px-8 lg:py-8 h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#F1F5F9] mb-1">My Agents</h1>
        <p className="text-sm text-[#94A3B8]">
          Your AI employee workforce — 10 prebuilt agents + any custom ones you create.
        </p>
      </div>
      <AgentGrid />
    </div>
  );
}
