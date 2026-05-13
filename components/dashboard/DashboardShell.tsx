"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Sidebar } from "@/components/dashboard/Sidebar";

interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  avatar_url?: string;
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const supabase = createClient();

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (!session?.user) {
          setError("No session. Please log in.");
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
              setError(
                "Profile not found: " + (profileError?.message || "no data")
              );
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
      .catch((e) => {
        setError("Error: " + (e?.message || "unknown"));
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          background: "#060608",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "#00d4ff", fontSize: "16px" }}>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          height: "100vh",
          background: "#060608",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
        <a href="/login" style={{ color: "#00d4ff" }}>
          Go to Login
        </a>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex h-screen bg-[#060608]">
      <Sidebar
        user={{
          full_name: user.full_name,
          email: user.email,
          role: user.role,
          avatar_url: user.avatar_url,
        }}
      />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
