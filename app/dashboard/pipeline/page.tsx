export const dynamic = "force-dynamic";

import { PipelineClient } from "@/components/pipeline/PipelineClient";

export default function PipelinePage() {
  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 lg:px-8 border-b border-white/[0.06]">
        <h1 className="text-xl font-semibold text-[#F1F5F9]">Pipeline</h1>
        <p className="text-xs text-[#94A3B8] mt-0.5">
          Manage leads through your sales funnel. Click the arrow on a card to advance stages.
        </p>
      </div>
      <div className="flex-1 overflow-hidden px-6 py-4 lg:px-8">
        <PipelineClient />
      </div>
    </div>
  );
}
