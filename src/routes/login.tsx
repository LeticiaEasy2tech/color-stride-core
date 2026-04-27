import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Loader2, Lock, Mail, ShieldCheck, Building2 } from "lucide-react";
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
      {/* Left – corporate identity panel */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-[var(--primary)] text-white p-12">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 55% at 15% 0%, rgba(255,255,255,0.10) 0%, transparent 60%)",
          }}
        />

        <div className="relative flex items-center gap-3">
          <div className="h-9 w-9 rounded-md bg-white/10 p-1.5 ring-1 ring-white/15 backdrop-blur">
            <img src={logo} alt="" className="h-full w-full object-contain" />
          </div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-white/70">
            New Touch of Color
          </div>
        </div>

        <div className="relative space-y-5 max-w-md">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Internal system
          </div>
          <h1 className="text-[2.6rem] leading-[1.05] font-semibold tracking-tight">
            Budget Management System
          </h1>
          <p className="text-white/65 text-sm leading-relaxed max-w-sm">
            Internal access for authorized users.
          </p>
        </div>

        <div className="relative flex items-center justify-between text-[11px] text-white/55">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            Secure project, estimating and financial operations.
          </div>
          <div className="hidden xl:block">v1.0</div>
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
            <h2 className="text-2xl font-semibold tracking-tight">Sign in</h2>
            <p className="text-sm text-muted-foreground">
              Authorized personnel only. Use your company credentials.
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
