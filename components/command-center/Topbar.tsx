'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell, Plus, Command, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopbarProps {
  user: {
    name?: string;
    avatar?: string;
  } | null;
  onNewAgent?: () => void;
  onMenuToggle?: () => void;
}

export function Topbar({ user, onNewAgent, onMenuToggle }: TopbarProps) {
  const pathname = usePathname();
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('cc_recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && searchQuery.trim()) {
        const next = [searchQuery.trim(), ...recentSearches.filter((s) => s !== searchQuery.trim())].slice(0, 5);
        setRecentSearches(next);
        localStorage.setItem('cc_recent_searches', JSON.stringify(next));
        setSearchFocused(false);
      }
    },
    [searchQuery, recentSearches]
  );

  const breadcrumb = pathname
    ?.replace('/dashboard', 'Command Center')
    .split('/')
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' / ') || 'Command Center';

  return (
    <header className="sticky top-0 z-40 flex items-center gap-4 px-4 sm:px-6 py-3 bg-[rgba(8,12,20,0.8)] backdrop-blur-[16px] border-b border-[rgba(255,255,255,0.05)]">
      {/* Mobile hamburger */}
      {onMenuToggle && (
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-[#475569] hover:text-[#F1F5F9] hover:bg-[rgba(255,255,255,0.04)] transition-colors shrink-0"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}

      {/* Breadcrumb */}
      <div className="hidden md:flex items-center text-xs text-[#475569] shrink-0">
        <span className="text-[#94A3B8]">{breadcrumb}</span>
      </div>

      {/* Search */}
      <div ref={searchRef} className="relative flex-1 max-w-md mx-auto">
        <div
          className={cn(
            'flex items-center gap-2 rounded-lg border bg-[#0F1422] px-3 py-2 transition-all',
            searchFocused
              ? 'border-[rgba(99,102,241,0.4)] shadow-[0_0_0_3px_rgba(99,102,241,0.12)]'
              : 'border-[rgba(255,255,255,0.08)]'
          )}
        >
          <Search className="h-4 w-4 text-[#475569] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onKeyDown={handleSearch}
            placeholder="Search agents, tasks, logs..."
            className="flex-1 bg-transparent text-sm text-[#F1F5F9] placeholder-[#475569] outline-none"
          />
          <div className="hidden sm:flex items-center gap-1 text-[10px] text-[#475569] border border-[rgba(255,255,255,0.08)] rounded px-1.5 py-0.5">
            <Command className="h-3 w-3" />
            <span>K</span>
          </div>
        </div>

        {searchFocused && recentSearches.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#0F1422] p-2 shadow-xl">
            <p className="text-[10px] font-medium uppercase tracking-wide text-[#475569] px-2 py-1">
              Recent
            </p>
            {recentSearches.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSearchQuery(s);
                  setSearchFocused(false);
                }}
                className="w-full text-left text-sm text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[rgba(255,255,255,0.04)] rounded-md px-2 py-1.5 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3 shrink-0">
        <button className="relative p-2 rounded-lg text-[#475569] hover:text-[#F1F5F9] hover:bg-[rgba(255,255,255,0.04)] transition-colors">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#EF4444]" />
        </button>

        <button
          onClick={onNewAgent}
          className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-[#F59E0B] text-black text-xs font-semibold px-3 py-2 hover:bg-[#FBBF24] transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          New Agent
        </button>

        <Link
          href="/dashboard/settings"
          className="h-8 w-8 rounded-full bg-[#6366F1] flex items-center justify-center text-xs font-semibold text-white shrink-0"
        >
          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
        </Link>
      </div>
    </header>
  );
}
