import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Briefcase,
  Clock,
  Trophy,
  TrendingUp,
  Percent,
  Target,
  AlertTriangle,
  HardHat,
  ArrowRight,
  CheckCircle2,
  Bell,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  kpis,
  revenueTrend,
  budgetVsActual,
  pipeline,
  activities,
  tasks,
  alerts,
} from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Dashboard — New Touch of Color" },
      { name: "description", content: "Operations overview, pipeline and financial KPIs." },
    ],
  }),
});

const kpiIcons = [Briefcase, Clock, Trophy, TrendingUp, Percent, Target, AlertTriangle, HardHat];

function Index() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back, Jordan — here's what's moving today."
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9">Export</Button>
            <Button size="sm" className="h-9 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white">
              New Estimate
            </Button>
          </>
        }
      />

      {/* KPI grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((k, i) => {
          const Icon = kpiIcons[i];
          return (
            <StatCard
              key={k.label}
              label={k.label}
              value={k.value}
              tone={k.tone}
              delta={{ value: k.delta, positive: !("negative" in k && k.negative) && !k.delta.startsWith("-") }}
              icon={<Icon className="h-4 w-4" />}
            />
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border-border shadow-[var(--shadow-card)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Revenue trend</CardTitle>
              <p className="text-xs text-muted-foreground">Forecast vs realized — last 8 months</p>
            </div>
            <Badge variant="secondary" className="text-xs">USD (k)</Badge>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={revenueTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="fc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--success)" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="var(--success)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: 12 }} />
                <Area type="monotone" dataKey="forecast" stroke="var(--success)" fill="url(#fc)" strokeWidth={2} />
                <Area type="monotone" dataKey="revenue" stroke="var(--accent)" fill="url(#rev)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Budget vs Actual</CardTitle>
            <p className="text-xs text-muted-foreground">Active jobs aggregate</p>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={budgetVsActual} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="budget" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline kanban */}
      <Card className="border-border shadow-[var(--shadow-card)]">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base">Proposal Pipeline</CardTitle>
            <p className="text-xs text-muted-foreground">Drag-and-drop in Sales Pipeline → Tracking</p>
          </div>
          <Button variant="ghost" size="sm" className="text-[var(--accent)] gap-1">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {Object.entries(pipeline).map(([stage, cards]) => (
              <div key={stage} className="rounded-lg border border-border bg-muted/30 p-2.5">
                <div className="flex items-center justify-between px-1 mb-2">
                  <span className="text-xs font-semibold text-foreground">{stage}</span>
                  <span className="text-[10px] text-muted-foreground">{cards.length}</span>
                </div>
                <div className="space-y-2">
                  {cards.map((c) => (
                    <div
                      key={c.id}
                      className="rounded-md bg-card p-2.5 border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elev)] transition-shadow cursor-grab"
                    >
                      <div className="text-[10px] text-muted-foreground">{c.id}</div>
                      <div className="text-xs font-medium text-foreground truncate">{c.title}</div>
                      <div className="text-[11px] text-muted-foreground truncate">{c.customer}</div>
                      <div className="mt-1.5 flex items-center justify-between">
                        <span className="text-xs font-semibold text-foreground">
                          ${c.amount.toLocaleString()}
                        </span>
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[9px] bg-[var(--accent)]/15 text-[var(--accent)]">
                            {c.owner}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity / Tasks / Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activities.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="text-[10px] bg-muted">
                    {a.who.split(" ").map((p) => p[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-xs leading-snug">
                  <span className="font-medium text-foreground">{a.who}</span>{" "}
                  <span className="text-muted-foreground">{a.what}</span>{" "}
                  <span className="font-medium text-foreground">{a.target}</span>
                  {a.to && <span className="text-muted-foreground"> · {a.to}</span>}
                  <div className="text-[10px] text-muted-foreground/80">{a.time}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">My tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {tasks.map((t) => (
              <div key={t.id} className="flex items-center gap-2.5 rounded-md border border-border p-2.5">
                <CheckCircle2 className="h-4 w-4 text-muted-foreground/60" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-foreground truncate">{t.title}</div>
                  <div className="text-[10px] text-muted-foreground">Due {t.due}</div>
                </div>
                <Badge
                  variant="secondary"
                  className={`text-[10px] ${
                    t.priority === "High"
                      ? "bg-[var(--destructive)]/10 text-[var(--destructive)]"
                      : t.priority === "Med"
                      ? "bg-[var(--warning)]/15 text-[oklch(0.5_0.16_75)]"
                      : "bg-muted"
                  }`}
                >
                  {t.priority}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base">Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-2">
            {alerts.map((a, i) => {
              const tone =
                a.tone === "danger"
                  ? "border-[var(--destructive)]/30 bg-[var(--destructive)]/5"
                  : a.tone === "warning"
                  ? "border-[var(--warning)]/30 bg-[var(--warning)]/5"
                  : "border-[var(--accent)]/30 bg-[var(--accent)]/5";
              return (
                <div key={i} className={`rounded-md border p-2.5 ${tone}`}>
                  <div className="text-xs font-medium text-foreground">{a.title}</div>
                  <div className="text-[10px] text-muted-foreground">{a.subtitle}</div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
