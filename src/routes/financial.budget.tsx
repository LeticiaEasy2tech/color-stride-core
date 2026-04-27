import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { budgetVsActual } from "@/lib/mock-data";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FilterBar, useFilterBar } from "@/components/app/filter-bar";

export const Route = createFileRoute("/financial/budget")({
  component: Budget,
  head: () => ({ meta: [{ title: "Budget vs Actual" }] }),
});

function Budget() {
  const [filters, setFilters] = useFilterBar();
  const data = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return budgetVsActual.filter((b) => !q || b.name.toLowerCase().includes(q));
  }, [filters]);
  const totalBudget = data.reduce((s, b) => s + b.budget, 0);
  const totalActual = data.reduce((s, b) => s + b.actual, 0);
  const variance = totalBudget - totalActual;
  return (
    <div className="space-y-6">
      <PageHeader title="Budget vs Actual" description="Job-level cost tracking with variance and forecast." />
      <FilterBar value={filters} onChange={setFilters} searchPlaceholder="Search cost categories…" />
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground">Total Budget</div>
            <div className="text-2xl font-semibold mt-1">${totalBudget.toLocaleString()}k</div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground">Actual Cost</div>
            <div className="text-2xl font-semibold mt-1">${totalActual.toLocaleString()}k</div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground">Variance</div>
            <div className={`text-2xl font-semibold mt-1 ${variance >= 0 ? "text-[var(--success)]" : "text-[var(--destructive)]"}`}>
              {variance >= 0 ? "+" : ""}${variance.toLocaleString()}k
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border shadow-[var(--shadow-card)]">
        <CardHeader className="pb-2"><CardTitle className="text-sm">By Cost Category</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="budget" fill="var(--accent)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="actual" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}