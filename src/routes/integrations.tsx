import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { integrations } from "@/lib/mock-data";
import { CheckCircle2, Plug } from "lucide-react";

export const Route = createFileRoute("/integrations")({
  component: Integrations,
  head: () => ({ meta: [{ title: "Integrations" }] }),
});

function Integrations() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Integrations"
        description="Connect accounting, takeoff, time-tracking, photos, storage, billing and signatures."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {integrations.map((it) => (
          <Card key={it.name} className="border-border shadow-[var(--shadow-card)]">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-[var(--accent)]/10 grid place-items-center">
                  <Plug className="h-4 w-4 text-[var(--accent)]" />
                </div>
                {it.name}
              </CardTitle>
              {it.connected ? (
                <Badge className="bg-[var(--success)]/15 text-[var(--success)] border-0 gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Connected
                </Badge>
              ) : (
                <Badge variant="secondary">Not connected</Badge>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground">{it.desc}</p>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70">{it.category}</div>
              <Button
                size="sm"
                variant={it.connected ? "outline" : "default"}
                className={`h-8 w-full ${!it.connected ? "bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white" : ""}`}
              >
                {it.connected ? "Manage" : "Connect"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}