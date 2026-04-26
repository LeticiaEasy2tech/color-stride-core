import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Shield } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: Admin,
  head: () => ({ meta: [{ title: "Admin" }] }),
});

const users = [
  { name: "Jordan Miller", initials: "JM", role: "Administrator", email: "jordan@ntoc.com", active: true },
  { name: "Ana Schmidel", initials: "AS", role: "Estimator", email: "ana@ntoc.com", active: true },
  { name: "Daniel Brandão", initials: "DB", role: "Sales Rep", email: "daniel@ntoc.com", active: true },
  { name: "Leticia Esteves", initials: "LE", role: "Project Manager/Crew Leader", email: "leticia@ntoc.com", active: true },
  { name: "Marcus Reed", initials: "MR", role: "Assistant PM", email: "marcus@ntoc.com", active: true },
  { name: "Priya Shah", initials: "PS", role: "Billing", email: "priya@ntoc.com", active: true },
  { name: "Tomás Ortiz", initials: "TO", role: "Office", email: "tomas@ntoc.com", active: false },
  { name: "Hana Park", initials: "HP", role: "Scheduler", email: "hana@ntoc.com", active: true },
  { name: "Behr Pro Vendor", initials: "BV", role: "Vendor", email: "vendor@behr.com", active: true },
];

const roles = [
  "Administrator", "Assistant PM", "Billing", "Estimator", "Office",
  "Project Manager/Crew Leader", "Sales Rep", "Scheduler", "Vendor",
];

function Admin() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin"
        description="Users, roles and workspace settings."
        actions={
          <Button size="sm" className="h-9 gap-1.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white">
            <Plus className="h-4 w-4" /> Invite User
          </Button>
        }
      />
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 lg:col-span-8 border-border shadow-[var(--shadow-card)]">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Users</CardTitle></CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground text-xs uppercase">
                <tr>
                  <th className="text-left px-4 py-2.5">Name</th>
                  <th className="text-left px-4 py-2.5">Role</th>
                  <th className="text-left px-4 py-2.5">Email</th>
                  <th className="text-left px-4 py-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((u) => (
                  <tr key={u.email} className="hover:bg-muted/30">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-[10px] bg-[var(--accent)]/15 text-[var(--accent)]">{u.initials}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">{u.role}</td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground">{u.email}</td>
                    <td className="px-4 py-2.5">
                      <Badge className={`border-0 ${u.active ? "bg-[var(--success)]/15 text-[var(--success)]" : "bg-muted"}`}>
                        {u.active ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="col-span-12 lg:col-span-4 border-border shadow-[var(--shadow-card)]">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Roles & Permissions</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {roles.map((r) => (
              <div key={r} className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm">
                <Shield className="h-4 w-4 text-[var(--accent)]" />
                <span className="flex-1">{r}</span>
                <Badge variant="secondary" className="text-[10px]">Edit</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}