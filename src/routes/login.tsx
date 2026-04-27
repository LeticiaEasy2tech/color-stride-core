import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Building2, Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth, DEMO_CREDENTIALS } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { login, isAuthenticated, isReady } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isReady && isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isReady, isAuthenticated, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const res = await login(email, password, remember);
    setSubmitting(false);
    if (res.ok) {
      navigate({ to: "/" });
    } else {
      setError(res.error);
    }
  };

  const fillDemo = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
    setError(null);
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-background">
      {/* Left – brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-[var(--primary)] text-white p-10">
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(60% 50% at 20% 10%, rgba(37,99,235,0.55) 0%, transparent 60%), radial-gradient(50% 40% at 90% 90%, rgba(37,99,235,0.35) 0%, transparent 60%)",
          }}
        />
        <div className="relative flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-white/10 p-1.5 backdrop-blur">
            <img src={logo} alt="" className="h-full w-full object-contain" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">New Touch of Color</div>
            <div className="text-[11px] uppercase tracking-wider text-white/60">
              Budget Management System
            </div>
          </div>
        </div>

        <div className="relative space-y-6 max-w-md">
          <h1 className="text-4xl font-semibold leading-tight font-[var(--font-display)]">
            Construction estimating, sales pipeline & financials in one premium workspace.
          </h1>
          <p className="text-white/70 text-sm leading-relaxed">
            From bid to billing — manage estimates, proposals, change orders, and
            profitability with the clarity your team deserves.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { k: "Active Bids", v: "42" },
              { k: "Win Rate", v: "38%" },
              { k: "Pipeline", v: "$12.4M" },
            ].map((s) => (
              <div key={s.k} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 backdrop-blur">
                <div className="text-lg font-semibold">{s.v}</div>
                <div className="text-[10px] uppercase tracking-wider text-white/60">{s.k}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center gap-2 text-xs text-white/60">
          <ShieldCheck className="h-4 w-4" />
          Enterprise-grade security · SOC 2 ready architecture
        </div>
      </div>

      {/* Right – form */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="h-9 w-9 rounded-md bg-[var(--primary)] p-1.5">
              <img src={logo} alt="" className="h-full w-full object-contain" />
            </div>
            <span className="text-sm font-semibold">New Touch of Color</span>
          </div>

          <div className="space-y-1.5 mb-8">
            <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
            <p className="text-sm text-muted-foreground">
              Sign in to your Budget Management workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 h-10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/login"
                  className="text-xs text-[var(--accent)] hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    setError("Password reset is disabled in the demo prototype.");
                  }}
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 h-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={remember}
                onCheckedChange={(v) => setRemember(!!v)}
              />
              <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                Remember me on this device
              </Label>
            </div>

            {error && (
              <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-10 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="mt-6 rounded-lg border border-dashed border-border bg-muted/40 p-3 text-xs">
            <div className="flex items-center gap-1.5 font-medium text-foreground">
              <Building2 className="h-3.5 w-3.5 text-[var(--accent)]" />
              Demo credentials
            </div>
            <div className="mt-1.5 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-muted-foreground">
              <span>Email</span>
              <code className="text-foreground">demo@ntoc.com</code>
              <span>Password</span>
              <code className="text-foreground">demo123</code>
            </div>
            <button
              type="button"
              onClick={fillDemo}
              className="mt-2 text-[var(--accent)] hover:underline"
            >
              Use demo credentials →
            </button>
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} New Touch of Color. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
