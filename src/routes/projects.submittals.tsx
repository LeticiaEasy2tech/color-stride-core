import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, FileCheck } from "lucide-react";
import { FilterBar, useFilterBar } from "@/components/app/filter-bar";

export const Route = createFileRoute("/projects/submittals")({
  component: Submittals,
  head: () => ({ meta: [{ title: "Submittals" }] }),
});

const subs = [
  { id: "SUB-009", project: "Greenfield HQ", item: "Sherwin-Williams Emerald — color match", status: "Approved", rev: "Rev 1" },
  { id: "SUB-008", project: "Marina Lofts", item: "Vinyl wallcovering — Knoll Astoria", status: "Pending", rev: "Rev 0" },
  { id: "SUB-007", project: "Sapphire Unit 1103", item: "Specialty Venetian plaster sample", status: "Revise & Resubmit", rev: "Rev 2" },
  { id: "SUB-006", project: "Sunset Plaza Phase 2", item: "Intumescent coating spec sheet", status: "Approved", rev: "Rev 1" },
];

const tone: Record<string, string> = {
  Approved: "bg-[var(--success)]/15 text-[var(--success)]",
  Pending: "bg-[var(--warning)]/15 text-[oklch(0.5_0.16_75)]",
  "Revise & Resubmit": "bg-[var(--destructive)]/10 text-[var(--destructive)]",
};

function Submittals() {
  const [filters, setFilters] = useFilterBar();
  const visible = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return subs.filter((s) => {
      if (q && !`${s.id} ${s.item} ${s.project}`.toLowerCase().includes(q)) return false;
      if (filters.status === "approved" && s.status !== "Approved") return false;
      if (filters.status === "pending" && s.status !== "Pending") return false;
      return true;
    });
  }, [filters]);
  return (
    <div className="space-y-6">
      <PageHeader
        title="Submittals"
        description="Product data, samples and shop drawings awaiting approval."
        actions={
          <Button size="sm" className="h-9 gap-1.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white">
            <Plus className="h-4 w-4" /> New Submittal
          </Button>
        }
      />
      <FilterBar value={filters} onChange={setFilters} searchPlaceholder="Search submittals…" />
      <div className="grid gap-3">
        {visible.map((s) => (
          <Card key={s.id} className="border-border shadow-[var(--shadow-card)]">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-[var(--accent)]" />
                {s.id} · {s.item}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{s.rev}</Badge>
                <Badge className={`border-0 ${tone[s.status]}`}>{s.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">{s.project}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}