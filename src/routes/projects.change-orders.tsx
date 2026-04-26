import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/projects/change-orders")({
  component: ChangeOrders,
  head: () => ({ meta: [{ title: "Change Orders" }] }),
});

const cos = [
  { id: "CO-014", project: "Greenfield HQ", desc: "Add specialty finish to executive corridor", amount: 4200, status: "Approved" },
  { id: "CO-013", project: "Sunset Plaza Phase 2", desc: "Additional drywall patching after MEP rework", amount: 1800, status: "Approved" },
  { id: "CO-012", project: "Marina Lofts", desc: "Repaint Unit 402 — water damage", amount: 2400, status: "Pending" },
  { id: "CO-011", project: "Atlantic Suites", desc: "Owner-requested color change Lobby B", amount: 950, status: "Rejected" },
];

const tone: Record<string, string> = {
  Approved: "bg-[var(--success)]/15 text-[var(--success)]",
  Pending: "bg-[var(--warning)]/15 text-[oklch(0.5_0.16_75)]",
  Rejected: "bg-[var(--destructive)]/10 text-[var(--destructive)]",
};

function ChangeOrders() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Change Orders"
        description="Track pricing changes and owner approvals across active jobs."
        actions={
          <Button size="sm" className="h-9 gap-1.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white">
            <Plus className="h-4 w-4" /> New CO
          </Button>
        }
      />
      <Card className="border-border shadow-[var(--shadow-card)]">
        <CardHeader className="pb-2"><CardTitle className="text-sm">All Change Orders</CardTitle></CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-2.5">CO #</th>
                <th className="text-left px-4 py-2.5">Project</th>
                <th className="text-left px-4 py-2.5">Description</th>
                <th className="text-right px-4 py-2.5">Amount</th>
                <th className="text-left px-4 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {cos.map((c) => (
                <tr key={c.id} className="hover:bg-muted/30">
                  <td className="px-4 py-2.5 font-mono text-xs">{c.id}</td>
                  <td className="px-4 py-2.5 font-medium">{c.project}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{c.desc}</td>
                  <td className="px-4 py-2.5 text-right font-medium">${c.amount.toLocaleString()}</td>
                  <td className="px-4 py-2.5">
                    <Badge className={`border-0 ${tone[c.status]}`}>{c.status}</Badge>
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