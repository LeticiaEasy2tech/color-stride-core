import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { costCodes } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Plus, Folder, FileCode } from "lucide-react";

export const Route = createFileRoute("/estimating/cost-codes")({
  component: CostCodes,
  head: () => ({ meta: [{ title: "Cost Codes — Estimating" }] }),
});

function CostCodes() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Cost Codes"
        description="CSI-aligned cost code library used by every estimate."
        actions={
          <Button size="sm" className="h-9 gap-1.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white">
            <Plus className="h-4 w-4" /> New Code
          </Button>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {costCodes.map((g) => (
          <Card key={g.code} className="border-border shadow-[var(--shadow-card)]">
            <CardHeader className="pb-2 flex flex-row items-center gap-2">
              <Folder className="h-4 w-4 text-[var(--accent)]" />
              <CardTitle className="text-sm">{g.code} · {g.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5">
              {g.children?.map((c) => (
                <div key={c.code} className="flex items-center gap-2 text-sm rounded-md px-2 py-1.5 hover:bg-muted">
                  <FileCode className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-mono text-xs text-muted-foreground">{c.code}</span>
                  <span className="text-foreground">{c.name}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}