import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Flame, Snowflake, Thermometer } from "lucide-react";

export const Route = createFileRoute("/crm/leads")({
  component: Leads,
  head: () => ({ meta: [{ title: "Leads — CRM" }] }),
});

const leads = [
  { id: "L-2042", name: "Coral Tower Lobby", source: "Referral", owner: "AS", value: 18400, score: "Hot", stage: "Qualifying" },
  { id: "L-2041", name: "Beachview Repaint", source: "Web", owner: "DB", value: 9800, score: "Warm", stage: "Discovery" },
  { id: "L-2040", name: "Sunset Plaza Phase 2", source: "Existing", owner: "JM", value: 42100, score: "Hot", stage: "Proposal" },
  { id: "L-2039", name: "Old Mill Restoration", source: "Web", owner: "DB", value: 15400, score: "Cold", stage: "Discovery" },
  { id: "L-2038", name: "Sapphire Unit 1103", source: "Referral", owner: "DB", value: 6200, score: "Warm", stage: "Qualifying" },
];

const scoreIcon = { Hot: Flame, Warm: Thermometer, Cold: Snowflake } as const;
const scoreClass: Record<string, string> = {
  Hot: "bg-[var(--destructive)]/10 text-[var(--destructive)]",
  Warm: "bg-[var(--warning)]/15 text-[oklch(0.5_0.16_75)]",
  Cold: "bg-[var(--accent)]/10 text-[var(--accent)]",
};

function Leads() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Leads"
        description="Inbound and prospected opportunities — qualify before estimating."
        actions={
          <Button size="sm" className="h-9 gap-1.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white">
            <Plus className="h-4 w-4" /> New Lead
          </Button>
        }
      />
      <Card className="border-border shadow-[var(--shadow-card)]">
        <CardHeader className="pb-2"><CardTitle className="text-sm">All Leads</CardTitle></CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-2.5">ID</th>
                <th className="text-left px-4 py-2.5">Opportunity</th>
                <th className="text-left px-4 py-2.5">Source</th>
                <th className="text-left px-4 py-2.5">Stage</th>
                <th className="text-left px-4 py-2.5">Score</th>
                <th className="text-right px-4 py-2.5">Value</th>
                <th className="text-left px-4 py-2.5">Owner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leads.map((l) => {
                const Icon = scoreIcon[l.score as keyof typeof scoreIcon];
                return (
                  <tr key={l.id} className="hover:bg-muted/30">
                    <td className="px-4 py-2.5 font-mono text-xs">{l.id}</td>
                    <td className="px-4 py-2.5 font-medium">{l.name}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{l.source}</td>
                    <td className="px-4 py-2.5"><Badge variant="secondary">{l.stage}</Badge></td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs ${scoreClass[l.score]}`}>
                        <Icon className="h-3 w-3" />{l.score}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right font-medium">${l.value.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-xs">{l.owner}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}