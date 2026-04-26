import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/projects/rfis")({
  component: RFIs,
  head: () => ({ meta: [{ title: "RFIs" }] }),
});

const rfis = [
  { id: "RFI-021", project: "Sapphire Unit 1103", q: "Confirm finish spec on lobby column wraps.", status: "Open", days: 2 },
  { id: "RFI-020", project: "Greenfield HQ", q: "Drywall scope at south stair — by us or GC?", status: "Open", days: 4 },
  { id: "RFI-019", project: "Marina Lofts", q: "Approved color for amenity lounge ceiling?", status: "Answered", days: 0 },
  { id: "RFI-018", project: "Sunset Plaza Phase 2", q: "Substrate prep for moisture-affected walls.", status: "Closed", days: 0 },
];

const tone: Record<string, string> = {
  Open: "bg-[var(--warning)]/15 text-[oklch(0.5_0.16_75)]",
  Answered: "bg-[var(--accent)]/10 text-[var(--accent)]",
  Closed: "bg-muted text-foreground",
};

function RFIs() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="RFIs"
        description="Requests for information across all active projects."
        actions={
          <Button size="sm" className="h-9 gap-1.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white">
            <Plus className="h-4 w-4" /> New RFI
          </Button>
        }
      />
      <div className="grid gap-3">
        {rfis.map((r) => (
          <Card key={r.id} className="border-border shadow-[var(--shadow-card)]">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[var(--accent)]" />
                {r.id} · {r.project}
              </CardTitle>
              <div className="flex items-center gap-2">
                {r.status === "Open" && <Badge variant="secondary">{r.days}d open</Badge>}
                <Badge className={`border-0 ${tone[r.status]}`}>{r.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-foreground/80">{r.q}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}