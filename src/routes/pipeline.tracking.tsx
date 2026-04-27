import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { pipeline } from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, GripVertical } from "lucide-react";
import { FilterBar, useFilterBar } from "@/components/app/filter-bar";
import { useMemo } from "react";

const stageColors: Record<string, string> = {
  Pending: "bg-muted text-foreground",
  Sent: "bg-[var(--accent)]/10 text-[var(--accent)]",
  Revision: "bg-[var(--warning)]/15 text-[oklch(0.5_0.16_75)]",
  Negotiating: "bg-purple-100 text-purple-800",
  Awarded: "bg-[var(--success)]/15 text-[var(--success)]",
  Lost: "bg-[var(--destructive)]/10 text-[var(--destructive)]",
};

export const Route = createFileRoute("/pipeline/tracking")({
  component: PipelineTracking,
});

function PipelineTracking() {
  const [filters, setFilters] = useFilterBar();
  const filteredPipeline = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    const out: typeof pipeline = {} as typeof pipeline;
    Object.entries(pipeline).forEach(([stage, cards]) => {
      out[stage] = cards.filter((c) => {
        if (q && !`${c.title} ${c.customer} ${c.id}`.toLowerCase().includes(q)) return false;
        if (filters.view === "awarded-month" && stage !== "Awarded") return false;
        if (filters.status === "awarded" && stage !== "Awarded") return false;
        if (filters.status === "pending" && !["Pending", "Sent", "Revision"].includes(stage)) return false;
        return true;
      });
    });
    return out;
  }, [filters]);
  return (
    <div className="space-y-6">
      <PageHeader title="Proposal Tracking" description="Drag-and-drop pipeline. Six stages from pending to closed." />
      <FilterBar
        value={filters}
        onChange={setFilters}
        searchPlaceholder="Search proposals, customers, IDs…"
        statusOptions={[
          { value: "all", label: "All stages" },
          { value: "pending", label: "Pending / Sent" },
          { value: "awarded", label: "Awarded" },
          { value: "closed", label: "Lost" },
        ]}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {Object.entries(filteredPipeline).map(([stage, cards]) => (
          <div key={stage} className="rounded-lg bg-muted/30 border border-border p-3 min-h-[400px]">
            <div className="flex items-center justify-between mb-3">
              <div className={`px-2 py-0.5 rounded-md text-xs font-semibold ${stageColors[stage]}`}>{stage}</div>
              <span className="text-[10px] text-muted-foreground">{cards.length}</span>
            </div>
            <div className="space-y-2">
              {cards.map((c) => (
                <Card key={c.id} className="border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elev)] cursor-grab transition-shadow">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-1">
                      <GripVertical className="h-3.5 w-3.5 text-muted-foreground/40 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-muted-foreground">{c.id}</div>
                        <div className="text-sm font-medium truncate">{c.title}</div>
                        <div className="text-xs text-muted-foreground truncate">{c.customer}</div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm font-semibold">${c.amount.toLocaleString()}</span>
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-[10px] bg-[var(--accent)]/15 text-[var(--accent)]">{c.owner}</AvatarFallback>
                          </Avatar>
                        </div>
                        {c.due !== "—" && (
                          <div className="mt-1.5 flex items-center gap-1 text-[10px] text-muted-foreground">
                            <Calendar className="h-3 w-3" />Due {c.due}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}