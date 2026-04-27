import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { invoices } from "@/lib/mock-data";
import { CircleDollarSign, Clock, FileSignature, Plus } from "lucide-react";
import { FilterBar, useFilterBar } from "@/components/app/filter-bar";

export const Route = createFileRoute("/financial/billing")({
  component: Billing,
  head: () => ({ meta: [{ title: "Billing" }] }),
});

function Billing() {
  const [filters, setFilters] = useFilterBar();
  const total = invoices.reduce((s, i) => s + i.amount, 0);
  const outstanding = invoices.filter((i) => i.status !== "Paid").reduce((s, i) => s + i.amount, 0);
  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing"
        description="Pay applications, retainage, and AIA-style billing per project."
        actions={
          <Button size="sm" className="h-9 gap-1.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white">
            <Plus className="h-4 w-4" /> New Pay App
          </Button>
        }
      />
      <FilterBar
        value={filters}
        onChange={setFilters}
        searchPlaceholder="Search pay apps, projects, invoices…"
        statusOptions={[
          { value: "all", label: "All statuses" },
          { value: "active", label: "Approved" },
          { value: "pending", label: "Submitted" },
          { value: "overdue", label: "Overdue" },
          { value: "closed", label: "Paid" },
        ]}
        categoryOptions={[
          { value: "all", label: "All types" },
          { value: "billing", label: "Pay Application" },
          { value: "change-order", label: "Change Order" },
          { value: "estimate", label: "Retainage" },
        ]}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Billed MTD" value={`$${(total / 1000).toFixed(1)}k`} tone="accent" icon={<CircleDollarSign className="h-4 w-4" />} />
        <StatCard label="Outstanding" value={`$${(outstanding / 1000).toFixed(1)}k`} tone="warning" icon={<Clock className="h-4 w-4" />} />
        <StatCard label="Retainage Held" value="$48.2k" tone="default" icon={<FileSignature className="h-4 w-4" />} />
        <StatCard label="Pay Apps Open" value="6" tone="success" icon={<FileSignature className="h-4 w-4" />} />
      </div>

      <Card className="border-border shadow-[var(--shadow-card)]">
        <CardHeader className="pb-2"><CardTitle className="text-sm">Pay Application Schedule</CardTitle></CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-2.5">Project</th>
                <th className="text-left px-4 py-2.5">App #</th>
                <th className="text-right px-4 py-2.5">Period</th>
                <th className="text-right px-4 py-2.5">This Period</th>
                <th className="text-right px-4 py-2.5">% Complete</th>
                <th className="text-left px-4 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { p: "Greenfield HQ", n: "PA-08", per: "Apr 2026", amt: 22150, pct: 78, st: "Approved" },
                { p: "Sunset Plaza Phase 2", n: "PA-04", per: "Apr 2026", amt: 14800, pct: 42, st: "Submitted" },
                { p: "Marina Lofts", n: "PA-06", per: "Apr 2026", amt: 9600, pct: 65, st: "Draft" },
                { p: "Atlantic Suites", n: "PA-12", per: "Mar 2026", amt: 24500, pct: 100, st: "Paid" },
              ].map((r) => (
                <tr key={r.p + r.n} className="hover:bg-muted/30">
                  <td className="px-4 py-2.5 font-medium">{r.p}</td>
                  <td className="px-4 py-2.5 font-mono text-xs">{r.n}</td>
                  <td className="px-4 py-2.5 text-right text-muted-foreground">{r.per}</td>
                  <td className="px-4 py-2.5 text-right font-medium">${r.amt.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--accent)]" style={{ width: `${r.pct}%` }} />
                      </div>
                      <span className="text-xs">{r.pct}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5"><Badge variant="secondary">{r.st}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}