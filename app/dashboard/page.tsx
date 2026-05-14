import { OverviewStats } from "@/components/command-center/panels/OverviewStats";
import { PipelineChart } from "@/components/command-center/panels/PipelineChart";
import { AgentGrid } from "@/components/command-center/panels/AgentGrid";
import { ActivityFeed } from "@/components/command-center/panels/ActivityFeed";
import { RecentTasks } from "@/components/command-center/panels/RecentTasks";
import { QuickActions } from "@/components/command-center/panels/QuickActions";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="space-y-6 px-6 py-6 lg:px-8 lg:py-8">
      <QuickActions />
      <OverviewStats />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <PipelineChart />
        </div>
        <div className="lg:col-span-2">
          <AgentGrid />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <RecentTasks />
        </div>
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
