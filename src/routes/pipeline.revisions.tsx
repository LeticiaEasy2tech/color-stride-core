import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/pipeline/revisions")({
  component: Revisions,
  head: () => ({ meta: [{ title: "Revisions — Sales Pipeline" }] }),
});

const revisions = [
  { id: "P-1018", title: "Beachview Repaint", customer: "Tracon LLC", from: "v1 · $11,200", to: "v2 · $9,800", reason: "Reduced exterior scope", at: "2h ago" },
  { id: "P-1011", title: "Sunset Plaza Phase 2", customer: "Eco Building", from: "v2 · $44,300", to: "v3 · $42,100", reason: "Value engineering — alt. coatings", at: "Yesterday" },
  { id: "P-1029", title: "Atlantic Suites", customer: "AJAX Construction", from: "v1 · $26,000", to: "v2 · $24,500", reason: "Removed punch list contingency", at: "2d ago" },
];

function Revisions() {
  return (
    <div className="space-y-6">
      <PageHeader title="Revisions" description="Every estimate revision with diff and reason." />
      <div className="grid gap-3">
        {revisions.map((r) => (
          <Card key={r.id} className="border-border shadow-[var(--shadow-card)]">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <History className="h-4 w-4 text-[var(--accent)]" />
                {r.id} · {r.title}
              </CardTitle>
              <Badge variant="secondary">{r.at}</Badge>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="text-muted-foreground text-xs">{r.customer}</div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="rounded-md bg-muted px-2 py-1 text-xs">{r.from}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <span className="rounded-md bg-[var(--accent)]/10 text-[var(--accent)] px-2 py-1 text-xs font-medium">{r.to}</span>
              </div>
              <p className="text-sm text-foreground/80">{r.reason}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}