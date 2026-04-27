import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects, budgetVsActual } from "@/lib/mock-data";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { FilterBar, useFilterBar } from "@/components/app/filter-bar";
import { useMemo } from "react";

const statusColor: Record<string, string> = {
  "To be Scheduled": "bg-[var(--warning)]/15 text-[oklch(0.5_0.16_75)]",
  "In Progress": "bg-[var(--accent)]/10 text-[var(--accent)]",
  "SoW Complete": "bg-[var(--success)]/15 text-[var(--success)]",
  "Closed/Paid": "bg-muted text-foreground",
};

export const Route = createFileRoute("/projects/active")({
  component: ActiveJobs,
});

function ActiveJobs() {
  const [filters, setFilters] = useFilterBar();
  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return projects.filter((p) => {
      if (q && !`${p.name} ${p.gc} ${p.estimator}`.toLowerCase().includes(q)) return false;
      if (filters.status === "open" && !["In Progress", "To be Scheduled"].includes(p.status)) return false;
      if (filters.status === "closed" && p.status !== "Closed/Paid") return false;
      if (filters.view === "my-open-items" && p.status === "Closed/Paid") return false;
      if (filters.view === "active-jobs" && p.status === "Closed/Paid") return false;
      if (filters.view === "pending-co" && p.co === 0) return false;
      return true;
    });
  }, [filters]);
  return (
    <div className="space-y-6">
      <PageHeader title="Active Jobs" description="All projects in execution." />
      <FilterBar
        value={filters}
        onChange={setFilters}
        searchPlaceholder="Search projects, GCs, estimators…"
        statusOptions={[
          { value: "all", label: "All statuses" },
          { value: "active", label: "In Progress" },
          { value: "pending", label: "To be Scheduled" },
          { value: "closed", label: "Closed / Paid" },
        ]}
      />
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="budget">Budget vs Actual</TabsTrigger>
          <TabsTrigger value="co">Change Orders</TabsTrigger>
          <TabsTrigger value="commit">Commitments</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <Card className="border-border shadow-[var(--shadow-card)]">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="text-left px-4 py-2.5">#</th>
                    <th className="text-left px-4 py-2.5">Project</th>
                    <th className="text-left px-4 py-2.5">GC</th>
                    <th className="text-left px-4 py-2.5">Estimator</th>
                    <th className="text-left px-4 py-2.5">Status</th>
                    <th className="text-right px-4 py-2.5">Proposal</th>
                    <th className="text-right px-4 py-2.5">CO Total</th>
                    <th className="text-right px-4 py-2.5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-muted/30">
                      <td className="px-4 py-2.5 text-muted-foreground font-mono text-xs">{p.id}</td>
                      <td className="px-4 py-2.5 font-medium">{p.name}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{p.gc}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{p.estimator}</td>
                      <td className="px-4 py-2.5">
                        <Badge className={`${statusColor[p.status]} border-0 text-[10px]`}>{p.status}</Badge>
                      </td>
                      <td className="px-4 py-2.5 text-right">${p.proposal.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-right">{p.co ? `$${p.co.toLocaleString()}` : "—"}</td>
                      <td className="px-4 py-2.5 text-right"><Button size="sm" variant="ghost" className="h-7">Open</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="mt-4">
          <Card className="border-border shadow-[var(--shadow-card)]">
            <CardContent className="p-6">
              <div className="space-y-3">
                {filtered.map((p, i) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <div className="w-56 text-sm font-medium truncate">{p.name}</div>
                    <div className="flex-1 h-6 bg-muted rounded relative">
                      <div
                        className="absolute h-6 rounded bg-[var(--accent)]/70"
                        style={{ left: `${i * 8}%`, width: `${30 + i * 5}%` }}
                      />
                    </div>
                    <div className="w-20 text-xs text-muted-foreground text-right">{p.status}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="mt-4">
          <Card className="border-border shadow-[var(--shadow-card)]">
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={budgetVsActual}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="budget" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actual" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="co" className="mt-4">
          <Card className="border-border shadow-[var(--shadow-card)]">
            <CardContent className="p-6 text-sm text-muted-foreground">
              4 approved change orders totaling <span className="font-semibold text-[var(--success)]">+$6,000</span>. 2 pending review.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commit" className="mt-4">
          <Card className="border-border shadow-[var(--shadow-card)]">
            <CardContent className="p-6 text-sm text-muted-foreground">
              12 active subcontractor commitments · $384,200 outstanding.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-4">
          <Card className="border-border shadow-[var(--shadow-card)]">
            <CardContent className="p-6 text-sm text-muted-foreground">
              See Financial → Billing for pay applications.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}