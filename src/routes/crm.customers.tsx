import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { customers } from "@/lib/mock-data";
import { Search, Plus, Building2, Phone, Mail, MapPin } from "lucide-react";

export const Route = createFileRoute("/crm/customers")({
  component: CustomersPage,
  head: () => ({ meta: [{ title: "Customers — CRM" }] }),
});

function CustomersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        description="All accounts, GCs and direct customers."
        actions={
          <Button size="sm" className="h-9 gap-1.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white">
            <Plus className="h-4 w-4" /> New Customer
          </Button>
        }
      />

      <Card className="border-border shadow-[var(--shadow-card)]">
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[220px] max-w-sm">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search customers" className="pl-8 h-9" />
            </div>
            <Button variant="outline" size="sm" className="h-9">All fields</Button>
            <Button variant="outline" size="sm" className="h-9">Contains</Button>
            <Button variant="outline" size="sm" className="h-9 ml-auto">Columns</Button>
            <Button variant="outline" size="sm" className="h-9">Export</Button>
          </div>

          <Tabs defaultValue="table">
            <TabsList>
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
            </TabsList>
            <TabsContent value="table" className="mt-3">
              <div className="overflow-x-auto rounded-md border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="text-left font-medium px-3 py-2.5">#</th>
                      <th className="text-left font-medium px-3 py-2.5">Name</th>
                      <th className="text-left font-medium px-3 py-2.5">Type</th>
                      <th className="text-left font-medium px-3 py-2.5">Contact</th>
                      <th className="text-left font-medium px-3 py-2.5">Phone</th>
                      <th className="text-left font-medium px-3 py-2.5">Email</th>
                      <th className="text-left font-medium px-3 py-2.5">City</th>
                      <th className="text-left font-medium px-3 py-2.5">State</th>
                      <th className="text-left font-medium px-3 py-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {customers.map((c) => (
                      <tr key={c.id} className="hover:bg-muted/30 cursor-pointer">
                        <td className="px-3 py-2.5 text-muted-foreground">{c.id}</td>
                        <td className="px-3 py-2.5 font-medium text-foreground">{c.name}</td>
                        <td className="px-3 py-2.5">
                          <Badge variant="secondary" className="text-[10px]">{c.type}</Badge>
                        </td>
                        <td className="px-3 py-2.5">{c.first} {c.last}</td>
                        <td className="px-3 py-2.5 text-muted-foreground">{c.phone}</td>
                        <td className="px-3 py-2.5 text-muted-foreground">{c.email}</td>
                        <td className="px-3 py-2.5">{c.city}</td>
                        <td className="px-3 py-2.5">{c.state}</td>
                        <td className="px-3 py-2.5">
                          <Badge className="bg-[var(--success)]/15 text-[var(--success)] border-0 text-[10px]">
                            Active
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="cards" className="mt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {customers.map((c) => (
                  <Card key={c.id} className="border-border hover:shadow-[var(--shadow-elev)] transition-shadow cursor-pointer">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-md bg-[var(--accent)]/10 flex items-center justify-center">
                          <Building2 className="h-4 w-4 text-[var(--accent)]" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-sm truncate">{c.name}</div>
                          <div className="text-[10px] text-muted-foreground">#{c.id} · {c.type}</div>
                        </div>
                      </div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{c.phone}</div>
                        <div className="flex items-center gap-1.5"><Mail className="h-3 w-3" />{c.email}</div>
                        <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{c.city}, {c.state}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}