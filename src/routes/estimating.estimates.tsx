import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { costCodes, estimateLines, EstimateLine } from "@/lib/mock-data";
import { ChevronRight, FileText, Save, Send, Plus, Copy, History } from "lucide-react";

export const Route = createFileRoute("/estimating/estimates")({
  component: EstimateBuilder,
  head: () => ({ meta: [{ title: "Estimate Builder" }] }),
});

function EstimateBuilder() {
  const [lines, setLines] = useState<EstimateLine[]>(estimateLines);
  const [markup, setMarkup] = useState(18);

  const totals = useMemo(() => {
    const labor = lines.reduce((s, l) => s + l.qty * l.labor, 0);
    const mat = lines.reduce((s, l) => s + l.qty * l.mat, 0);
    const eq = lines.reduce((s, l) => s + l.qty * l.eq, 0);
    const cost = labor + mat + eq;
    const sell = cost * (1 + markup / 100);
    const margin = ((sell - cost) / sell) * 100;
    return { labor, mat, eq, cost, sell, margin };
  }, [lines, markup]);

  const updateLine = (id: number, key: keyof EstimateLine, val: number) => {
    setLines((xs) => xs.map((l) => (l.id === id ? { ...l, [key]: val } : l)));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Estimate Builder"
        description="EST-2026-0142 · Coral Tower Lobby · ARCO/Murray"
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9 gap-1.5"><History className="h-4 w-4" />v3</Button>
            <Button variant="outline" size="sm" className="h-9 gap-1.5"><Copy className="h-4 w-4" />Duplicate</Button>
            <Button variant="outline" size="sm" className="h-9 gap-1.5"><Save className="h-4 w-4" />Save Draft</Button>
            <Button size="sm" className="h-9 gap-1.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white">
              <FileText className="h-4 w-4" />Generate Proposal
            </Button>
            <Button size="sm" className="h-9 gap-1.5 bg-[var(--success)] hover:bg-[var(--success)]/90 text-white">
              <Send className="h-4 w-4" />Send to GC
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-12 gap-4">
        {/* Cost code tree */}
        <Card className="col-span-12 lg:col-span-3 border-border shadow-[var(--shadow-card)]">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Cost Codes</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-1.5">
            {costCodes.map((g) => (
              <div key={g.code} className="space-y-1">
                <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
                  <ChevronRight className="h-3 w-3" />
                  {g.code} · {g.name}
                </div>
                <div className="ml-5 space-y-0.5">
                  {g.children?.map((c) => (
                    <div
                      key={c.code}
                      className="text-xs text-muted-foreground px-2 py-1 rounded hover:bg-muted cursor-pointer"
                    >
                      {c.code} · {c.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Grid */}
        <Card className="col-span-12 lg:col-span-6 border-border shadow-[var(--shadow-card)]">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Estimate Lines</CardTitle>
            <Button size="sm" variant="outline" className="h-8 gap-1.5"><Plus className="h-3.5 w-3.5" />Line</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-muted/50 text-muted-foreground uppercase">
                  <tr>
                    <th className="text-left px-2 py-2">Code</th>
                    <th className="text-left px-2 py-2">Description</th>
                    <th className="text-right px-2 py-2">Qty</th>
                    <th className="text-left px-2 py-2">UoM</th>
                    <th className="text-right px-2 py-2">Labor</th>
                    <th className="text-right px-2 py-2">Material</th>
                    <th className="text-right px-2 py-2">Equip.</th>
                    <th className="text-right px-2 py-2">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {lines.map((l) => {
                    const total = l.qty * (l.labor + l.mat + l.eq);
                    return (
                      <tr key={l.id}>
                        <td className="px-2 py-1.5 font-mono text-[11px]">{l.code}</td>
                        <td className="px-2 py-1.5">{l.desc}</td>
                        <td className="px-2 py-1.5 text-right">
                          <Input
                            type="number"
                            value={l.qty}
                            onChange={(e) => updateLine(l.id, "qty", Number(e.target.value))}
                            className="h-7 w-20 text-right text-xs ml-auto"
                          />
                        </td>
                        <td className="px-2 py-1.5">{l.unit}</td>
                        <td className="px-2 py-1.5 text-right">${l.labor.toFixed(2)}</td>
                        <td className="px-2 py-1.5 text-right">${l.mat.toFixed(2)}</td>
                        <td className="px-2 py-1.5 text-right">${l.eq.toFixed(2)}</td>
                        <td className="px-2 py-1.5 text-right font-medium">${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Margin */}
        <Card className="col-span-12 lg:col-span-3 border-border shadow-[var(--shadow-card)]">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Live Margin</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Row label="Labor" value={`$${totals.labor.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
            <Row label="Materials" value={`$${totals.mat.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
            <Row label="Equipment" value={`$${totals.eq.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
            <div className="h-px bg-border" />
            <Row label="Total Cost" value={`$${totals.cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} bold />
            <div>
              <div className="text-xs text-muted-foreground mb-1">Markup %</div>
              <Input
                type="number"
                value={markup}
                onChange={(e) => setMarkup(Number(e.target.value))}
                className="h-8 text-sm"
              />
            </div>
            <Row label="Sell Price" value={`$${totals.sell.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} bold />
            <div className="rounded-md bg-[var(--success)]/10 p-3">
              <div className="text-xs text-muted-foreground">Gross Margin</div>
              <div className="text-2xl font-semibold text-[var(--success)]">{totals.margin.toFixed(1)}%</div>
            </div>
            <Badge variant="secondary" className="w-full justify-center">v3 — saved 2m ago</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={bold ? "font-semibold text-foreground" : "text-foreground"}>{value}</span>
    </div>
  );
}