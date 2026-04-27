import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FilterBar, useFilterBar } from "@/components/app/filter-bar";

export const Route = createFileRoute("/financial/commitments")({
  component: Commitments,
  head: () => ({ meta: [{ title: "Commitments" }] }),
});

const items = [
  { id: "PO-3041", vendor: "Sherwin-Williams", project: "Greenfield HQ", type: "Purchase Order", amount: 18200, paid: 14000, status: "Open" },
  { id: "SC-2018", vendor: "ProDrywall Sub Inc.", project: "Sunset Plaza Phase 2", type: "Subcontract", amount: 42000, paid: 18500, status: "Open" },
  { id: "PO-3038", vendor: "Behr Pro", project: "Marina Lofts", type: "Purchase Order", amount: 6400, paid: 6400, status: "Closed" },
  { id: "SC-2015", vendor: "Coastal Scaffold Co.", project: "Coral Tower Lobby", type: "Subcontract", amount: 9800, paid: 0, status: "Open" },
];

function Commitments() {
  const [filters, setFilters] = useFilterBar();
  const visible = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return items.filter((c) => {
      if (q && !`${c.id} ${c.vendor} ${c.project} ${c.type}`.toLowerCase().includes(q)) return false;
      if (filters.status === "open" && c.status !== "Open") return false;
      if (filters.status === "closed" && c.status !== "Closed") return false;
      return true;
    });
  }, [filters]);
  return (
    <div className="space-y-6">
      <PageHeader
        title="Commitments"
        description="Subcontracts and purchase orders against active jobs."
        actions={
          <Button size="sm" className="h-9 gap-1.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white">
            <Plus className="h-4 w-4" /> New Commitment
          </Button>
        }
      />
      <FilterBar value={filters} onChange={setFilters} searchPlaceholder="Search commitments…" />
      <Card className="border-border shadow-[var(--shadow-card)]">
        <CardHeader className="pb-2"><CardTitle className="text-sm">Open Commitments</CardTitle></CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-2.5">ID</th>
                <th className="text-left px-4 py-2.5">Type</th>
                <th className="text-left px-4 py-2.5">Vendor</th>
                <th className="text-left px-4 py-2.5">Project</th>
                <th className="text-right px-4 py-2.5">Committed</th>
                <th className="text-right px-4 py-2.5">Paid</th>
                <th className="text-left px-4 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visible.map((c) => (
                <tr key={c.id} className="hover:bg-muted/30">
                  <td className="px-4 py-2.5 font-mono text-xs">{c.id}</td>
                  <td className="px-4 py-2.5">{c.type}</td>
                  <td className="px-4 py-2.5 font-medium">{c.vendor}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{c.project}</td>
                  <td className="px-4 py-2.5 text-right font-medium">${c.amount.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-right">${c.paid.toLocaleString()}</td>
                  <td className="px-4 py-2.5">
                    <Badge className={`border-0 ${c.status === "Open" ? "bg-[var(--accent)]/10 text-[var(--accent)]" : "bg-muted"}`}>
                      {c.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}