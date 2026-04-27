import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, LineChart, PieChart, Table, Download, Plus, GripVertical } from "lucide-react";
import { FilterBar, useFilterBar } from "@/components/app/filter-bar";

export const Route = createFileRoute("/reporting")({
  component: Reporting,
  head: () => ({ meta: [{ title: "Reporting" }] }),
});

const fields = ["Project", "Customer", "Estimator", "Status", "Proposal $", "CO $", "Actual Cost", "Margin %", "Awarded Date"];
const presets = [
  { name: "Win Rate by Estimator", icon: BarChart3 },
  { name: "Revenue Forecast 12mo", icon: LineChart },
  { name: "Margin by Customer", icon: PieChart },
  { name: "Aging A/R", icon: Table },
];

function Reporting() {
  const [filters, setFilters] = useFilterBar();
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reporting"
        description="Build, save and schedule reports across CRM, estimating and financials."
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9 gap-1.5"><Download className="h-4 w-4" />Export</Button>
            <Button size="sm" className="h-9 gap-1.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white">
              <Plus className="h-4 w-4" /> New Report
            </Button>
          </>
        }
      />
      <FilterBar
        value={filters}
        onChange={setFilters}
        searchPlaceholder="Search reports, fields, datasets…"
        categoryOptions={[
          { value: "all", label: "All datasets" },
          { value: "estimate", label: "Estimating" },
          { value: "proposal", label: "Pipeline" },
          { value: "billing", label: "Financials" },
          { value: "change-order", label: "Operations" },
        ]}
      />
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 lg:col-span-3 border-border shadow-[var(--shadow-card)]">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Fields</CardTitle></CardHeader>
          <CardContent className="space-y-1">
            {fields.map((f) => (
              <div key={f} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted cursor-grab">
                <GripVertical className="h-3.5 w-3.5 text-muted-foreground/50" />
                {f}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-12 lg:col-span-6 border-border shadow-[var(--shadow-card)]">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Report Canvas — Win Rate by Estimator</CardTitle>
            <Badge variant="secondary">Auto-saved</Badge>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-dashed border-border h-[360px] grid place-items-center text-sm text-muted-foreground">
              <div className="text-center space-y-2">
                <BarChart3 className="h-10 w-10 mx-auto text-muted-foreground/50" />
                <p>Drop fields from the left to start building.</p>
                <p className="text-xs">Visualization: Bar · Group by: Estimator · Metric: Win %</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-12 lg:col-span-3 border-border shadow-[var(--shadow-card)]">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Saved Reports</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {presets.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.name} className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted/50 cursor-pointer">
                  <Icon className="h-4 w-4 text-[var(--accent)]" />
                  <span className="flex-1 truncate">{p.name}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}