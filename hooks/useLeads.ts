'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  fetchLeads,
  updateLead,
  deleteLead,
  startScrape,
  pollScrape,
  importRuns,
  fetchApifyRuns,
} from '@/lib/api/leads';
import type { Lead, LeadStatus } from '@/lib/leads/types';

export function useLeads() {
  const [data, setData] = useState<Lead[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (params?: Parameters<typeof fetchLeads>[0]) => {
    try {
      setIsLoading(true);
      const result = await fetchLeads(params);
      setData(result.leads);
      setCount(result.count);
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Unable to load leads');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(() => load(), [load]);

  const updateStatus = useCallback(async (id: string, status: LeadStatus) => {
    try {
      const updated = await updateLead(id, { status });
      setData((prev) => prev.map((l) => (l.id === id ? updated : l)));
      return updated;
    } catch (e: any) {
      setError(e.message || 'Failed to update lead');
      return null;
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    try {
      await deleteLead(id);
      setData((prev) => prev.filter((l) => l.id !== id));
      setCount((c) => Math.max(0, c - 1));
      return true;
    } catch (e: any) {
      setError(e.message || 'Failed to delete lead');
      return false;
    }
  }, []);

  return {
    data,
    count,
    isLoading,
    error,
    refetch,
    load,
    updateStatus,
    remove,
  };
}

export function useScrape() {
  const [runId, setRunId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [progress, setProgress] = useState<{
    leads?: Record<string, unknown>[];
    datasetId?: string;
    error?: string;
  } | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<{
    added: number;
    updated: number;
    total: number;
  } | null>(null);

  const start = useCallback(async (source: string, fields?: Record<string, string>) => {
    const res = await startScrape(source, fields);
    setRunId(res.runId);
    setStatus('RUNNING');
    setProgress(null);
    setImportResult(null);
    return res.runId;
  }, []);

  const poll = useCallback(async (targetRunId: string) => {
    const res = await pollScrape(targetRunId);
    setStatus(res.status);
    if (res.status === 'SUCCEEDED') {
      setProgress({ leads: res.leads, datasetId: res.datasetId });
    } else if (res.error) {
      setProgress({ error: res.error });
    }
    return res;
  }, []);

  const importRun = useCallback(async (targetRunId: string) => {
    setIsImporting(true);
    try {
      const result = await importRuns(targetRunId);
      setImportResult({ added: result.added, updated: result.updated, total: result.total });
      return result;
    } finally {
      setIsImporting(false);
    }
  }, []);

  return {
    runId,
    status,
    progress,
    isImporting,
    importResult,
    start,
    poll,
    importRun,
  };
}

export function useApifyRuns() {
  const [runs, setRuns] = useState<Array<{
    runId: string;
    finishedAt: string;
    leadCount: number;
    datasetId: string;
    hasMore: boolean;
  }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await fetchApifyRuns();
      setRuns(result.runs);
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Unable to load runs');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { runs, isLoading, error, refetch: load };
}
