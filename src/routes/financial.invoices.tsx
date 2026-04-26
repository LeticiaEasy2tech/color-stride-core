import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { invoices } from "@/lib/mock-data";

const tone: Record<string, string> = {
  Paid: "bg-[var(--success)]/15 text-[var(--success)]",
  Sent: "bg-[var(--accent)]/10 text-[var(--accent)]",
  Overdue: "bg-[var(--destructive)]/10 text-[var(--destructive)]",
  Draft: "bg-muted text-foreground",
};

export const Route = createFileRoute("/financial/invoices")({
  component: () => (
    <div className="space-y-6">
      <PageHeader title="Invoices" description="All issued invoices and their status." />
      <Card className="border-border shadow-[var(--shadow-card)]">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-2.5">#</th>
                <th className="text-left px-4 py-2.5">Project</th>
                <th className="text-left px-4 py-2.5">Customer</th>
                <th className="text-right px-4 py-2.5">Amount</th>
                <th className="text-left px-4 py-2.5">Due</th>
                <th className="text-left px-4 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoices.map((i) => (
                <tr key={i.id} className="hover:bg-muted/30">
                  <td className="px-4 py-2.5 font-mono text-xs">{i.id}</td>
                  <td className="px-4 py-2.5">{i.project}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{i.customer}</td>
                  <td className="px-4 py-2.5 text-right font-medium">${i.amount.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{i.due}</td>
                  <td className="px-4 py-2.5">
                    <Badge className={`text-[10px] border-0 ${tone[i.status]}`}>{i.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  ),
});