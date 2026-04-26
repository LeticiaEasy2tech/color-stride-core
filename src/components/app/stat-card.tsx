import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function StatCard({
  label,
  value,
  delta,
  icon,
  tone = "default",
}: {
  label: string;
  value: string;
  delta?: { value: string; positive?: boolean };
  icon?: ReactNode;
  tone?: "default" | "accent" | "success" | "warning" | "danger";
}) {
  const toneBg: Record<string, string> = {
    default: "bg-muted text-foreground",
    accent: "bg-[var(--accent)]/10 text-[var(--accent)]",
    success: "bg-[var(--success)]/10 text-[var(--success)]",
    warning: "bg-[var(--warning)]/15 text-[oklch(0.5_0.16_75)]",
    danger: "bg-[var(--destructive)]/10 text-[var(--destructive)]",
  };
  return (
    <Card className="border-border shadow-[var(--shadow-card)]">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {label}
            </div>
            <div className="text-2xl font-semibold tracking-tight text-foreground">{value}</div>
            {delta && (
              <div
                className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                  delta.positive ? "text-[var(--success)]" : "text-[var(--destructive)]"
                }`}
              >
                {delta.positive ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {delta.value}
              </div>
            )}
          </div>
          {icon && (
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${toneBg[tone]}`}>
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}