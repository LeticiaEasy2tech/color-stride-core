import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Send, Download, Eye } from "lucide-react";

export const Route = createFileRoute("/estimating/proposal")({
  component: ProposalGenerator,
  head: () => ({ meta: [{ title: "Proposal Generator" }] }),
});

function ProposalGenerator() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Proposal Generator"
        description="EST-2026-0142 · Coral Tower Lobby · Generate a branded PDF proposal."
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9 gap-1.5"><Eye className="h-4 w-4" />Preview</Button>
            <Button variant="outline" size="sm" className="h-9 gap-1.5"><Download className="h-4 w-4" />Download PDF</Button>
            <Button size="sm" className="h-9 gap-1.5 bg-[var(--success)] hover:bg-[var(--success)]/90 text-white">
              <Send className="h-4 w-4" />Send via DocuSign
            </Button>
          </>
        }
      />
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 lg:col-span-4 border-border shadow-[var(--shadow-card)]">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Template & Sections</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {[
              "Cover page",
              "Project narrative",
              "Scope of work",
              "Schedule of values",
              "Inclusions & exclusions",
              "Terms & conditions",
              "Signature block",
            ].map((s) => (
              <label key={s} className="flex items-center gap-2 rounded-md border border-border px-3 py-2 cursor-pointer hover:bg-muted/50">
                <input type="checkbox" defaultChecked className="accent-[var(--accent)]" />
                <span className="text-sm">{s}</span>
              </label>
            ))}
            <Badge variant="secondary" className="w-full justify-center mt-2">Template: Premium 2026</Badge>
          </CardContent>
        </Card>

        <Card className="col-span-12 lg:col-span-8 border-border shadow-[var(--shadow-card)]">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Live Preview</CardTitle>
            <Badge variant="secondary"><FileText className="h-3 w-3 mr-1" />A4 · 8 pages</Badge>
          </CardHeader>
          <CardContent>
            <div className="aspect-[8.5/11] w-full max-w-2xl mx-auto rounded-md border border-border bg-card p-10 shadow-[var(--shadow-elev)]">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Proposal</div>
              <div className="mt-2 text-2xl font-semibold text-foreground">Coral Tower Lobby</div>
              <div className="text-sm text-muted-foreground">Prepared for ARCO/Murray Design Build</div>
              <div className="mt-6 h-px bg-border" />
              <div className="mt-6 space-y-3 text-sm leading-relaxed text-foreground/80">
                <p>New Touch of Color is pleased to submit this proposal for the painting and finishing scope of the Coral Tower lobby renovation.</p>
                <p>Total contract value: <span className="font-semibold text-foreground">$18,400.00</span></p>
                <p>Schedule: 14 working days from notice to proceed.</p>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-6 text-xs">
                <div>
                  <div className="h-px bg-foreground/40 mb-1" />
                  <div className="text-muted-foreground">New Touch of Color</div>
                </div>
                <div>
                  <div className="h-px bg-foreground/40 mb-1" />
                  <div className="text-muted-foreground">Customer signature</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}