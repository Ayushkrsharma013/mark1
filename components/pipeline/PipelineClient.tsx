'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Loader2, Play, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { KanbanBoard } from './KanbanBoard';
import { useScrape, useApifyRuns } from '@/hooks/useLeads';

export function PipelineClient() {
  const [showImporter, setShowImporter] = useState(false);
  const { runs, isLoading: runsLoading, refetch: refetchRuns } = useApifyRuns();
  const {
    runId,
    status,
    isImporting,
    importResult,
    start,
    poll,
    importRun,
  } = useScrape();

  const handleImport = async (targetRunId: string) => {
    await importRun(targetRunId);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowImporter((s) => !s)}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-[#6366F1] text-white hover:bg-[#4F46E5] transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            Import Leads
          </button>
        </div>

        {importResult && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-xs text-[#10B981] bg-[#10B981]/10 px-3 py-1.5 rounded-lg"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            {importResult.total} leads imported ({importResult.added} new, {importResult.updated} updated)
            <button onClick={() => {}} className="ml-1 text-[#10B981] hover:text-white">
              <X className="h-3 w-3" />
            </button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showImporter && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="shrink-0 overflow-hidden"
          >
            <div className="rounded-xl border border-white/[0.06] bg-[#0F1422] p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-[#F1F5F9]">Recent Apify Runs</h3>
                <button
                  onClick={refetchRuns}
                  className="text-xs text-[#6366F1] hover:text-[#818CF8] transition-colors"
                >
                  Refresh
                </button>
              </div>

              {runsLoading ? (
                <div className="flex items-center gap-2 py-4 text-sm text-[#94A3B8]">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading runs...
                </div>
              ) : runs.length === 0 ? (
                <div className="py-4 text-sm text-[#475569]">
                  No completed runs found. Start a scrape from an agent chat or the API.
                </div>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {runs.map((run) => (
                    <div
                      key={run.runId}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#161D30] border border-white/[0.04]"
                    >
                      <div>
                        <p className="text-xs font-medium text-[#F1F5F9]">Run {run.runId.slice(0, 8)}...</p>
                        <p className="text-[11px] text-[#475569]">
                          {run.leadCount} leads • {new Date(run.finishedAt).toLocaleString()}
                          {run.hasMore && ' (+more)'}
                        </p>
                      </div>
                      <button
                        onClick={() => handleImport(run.runId)}
                        disabled={isImporting}
                        className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-md bg-[#6366F1]/10 text-[#6366F1] hover:bg-[#6366F1]/20 transition-colors disabled:opacity-50"
                      >
                        {isImporting && runId === run.runId ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Play className="h-3 w-3" />
                        )}
                        Import
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-hidden">
        <KanbanBoard />
      </div>
    </div>
  );
}
