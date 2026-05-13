"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AsciiBackground } from "@/components/ui/AsciiBackground";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (!data.session?.user) {
        setError("No user found. Please check your credentials.");
        setLoading(false);
        return;
      }

      const role = data.session.user.user_metadata?.role || "client";

      if (role === "super_admin" || role === "client") {
        router.replace(redirectTo);
      } else {
        setError("You don't have permission to access the dashboard.");
        setLoading(false);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#060608] relative">
      <AsciiBackground mode="home" className="absolute inset-0 w-full h-full opacity-60" />

      <nav className="relative z-20 flex items-center p-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-[#a1a1aa] hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </Link>
      </nav>

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 pb-20">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <span className="text-xl font-bold tracking-tight">
                <span className="text-[#00d4ff]">Flow</span>
                <span className="text-white">Forges</span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="text-sm text-[#71717a] mt-2">
              Sign in to your command center
            </p>
          </div>

          <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] backdrop-blur-xl p-6 md:p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#a1a1aa] mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-[#52525b]" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    autoComplete="email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white placeholder-[#52525b] focus:outline-none focus:border-[rgba(0,212,255,0.3)] transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#a1a1aa] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-[#52525b]" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    className="w-full pl-10 pr-12 py-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white placeholder-[#52525b] focus:outline-none focus:border-[rgba(0,212,255,0.3)] transition-colors text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-[#52525b] hover:text-[#a1a1aa] transition-colors" />
                    ) : (
                      <Eye className="h-4 w-4 text-[#52525b] hover:text-[#a1a1aa] transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-400 bg-[rgba(255,0,0,0.05)] border border-[rgba(255,0,0,0.1)] rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#00d4ff] text-black font-semibold py-3 hover:bg-[#00b8e6] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  "Signing in..."
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-[#52525b] mt-6">
            Need access? Contact your administrator or{" "}
            <a href="mailto:hello@flowforges.com" className="text-[#00d4ff] hover:underline">
              email us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
