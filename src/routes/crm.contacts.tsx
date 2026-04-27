import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { customers } from "@/lib/mock-data";
import { Mail, Phone, Plus, Search } from "lucide-react";
import { FilterBar, useFilterBar } from "@/components/app/filter-bar";

export const Route = createFileRoute("/crm/contacts")({
  component: Contacts,
  head: () => ({ meta: [{ title: "Contacts — CRM" }] }),
});

function Contacts() {
  const [filters, setFilters] = useFilterBar();

  const visible = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return customers.filter((c) => {
      if (q && !`${c.first} ${c.last} ${c.name} ${c.email}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contacts"
        description="Every person across your customer accounts."
        actions={
          <Button size="sm" className="h-9 gap-1.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white">
            <Plus className="h-4 w-4" /> New Contact
          </Button>
        }
      />
      <FilterBar value={filters} onChange={setFilters} searchPlaceholder="Search contacts…" />
      <div className="flex items-center gap-2">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search contacts…" className="pl-8 h-9" />
        </div>
        <Badge variant="secondary">{visible.length} contacts</Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {visible.map((c) => (
          <Card key={c.id} className="border-border shadow-[var(--shadow-card)]">
            <CardContent className="p-4 flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-[var(--accent)]/15 text-[var(--accent)] text-xs">
                  {c.first[0]}{c.last[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-foreground truncate">{c.first} {c.last}</div>
                <div className="text-xs text-muted-foreground truncate">{c.name}</div>
                <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5"><Mail className="h-3 w-3" />{c.email}</div>
                  <div className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{c.phone}</div>
                </div>
              </div>
              <Badge variant="secondary" className="text-[10px]">{c.state}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}