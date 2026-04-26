import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pipeline } from "@/lib/mock-data";
import { Trophy, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/pipeline/awarded")({
  component: Awarded,
  head: () => ({ meta: [{ title: "Awarded Jobs — Pipeline" }] }),
});

function Awarded() {
  const cards = pipeline.Awarded;
  const total = cards.reduce((s, c) => s + c.amount, 0);
  return (
    <div className="space-y-6">
      <PageHeader
        title="Awarded Jobs"
        description="Proposals converted to contracts — ready to mobilize."
        actions={
          <Badge className="bg-[var(--success)]/15 text-[var(--success)] border-0">
            <Trophy className="h-3 w-3 mr-1" />
            ${total.toLocaleString()} awarded MTD
          </Badge>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Card key={c.id} className="border-border shadow-[var(--shadow-card)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{c.title}</CardTitle>
              <p className="text-xs text-muted-foreground">{c.customer} · {c.id}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-2xl font-semibold">${c.amount.toLocaleString()}</div>
              <Badge className="bg-[var(--success)]/15 text-[var(--success)] border-0">Awarded</Badge>
              <Button variant="outline" size="sm" className="w-full h-8" asChild>
                <Link to="/projects/active">Open project <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}