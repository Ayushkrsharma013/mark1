"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  avatar_url?: string;
}

export function CommandCenterShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (!session?.user) {
          router.push("/login");
          setLoading(false);
          return;
        }
        return supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()
          .then(({ data: profile, error: profileError }) => {
            if (profileError || !profile) {
              setLoading(false);
              return;
            }
            setUser({
              id: profile.id,
              email: profile.email || session.user.email || "",
              full_name: profile.full_name || "",
              role: profile.role || "client",
              avatar_url: profile.avatar_url,
            });
            setLoading(false);
          });
      })
      .catch(() => {
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-white/10 animate-pulse" />
          <p className="text-sm text-[var(--cc-text-muted)]">Loading Command Center...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-black">
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileOpenChange={setMobileOpen}
        user={{
          name: user.full_name,
          email: user.email,
          role: user.role,
          avatar: user.avatar_url,
        }}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar
          user={{
            name: user.full_name,
            avatar: user.avatar_url,
          }}
          onNewAgent={() => router.push("/dashboard/agent-builder")}
          onMenuToggle={() => setMobileOpen(true)}
        />
        <main className="flex-1 overflow-y-auto bg-black">
          {children}
        </main>
      </div>
    </div>
  );
}
