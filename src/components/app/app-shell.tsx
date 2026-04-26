import { Link, useRouterState, Outlet } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Calculator,
  KanbanSquare,
  Building2,
  Wallet,
  BarChart3,
  Plug,
  Shield,
  Search,
  Bell,
  Plus,
  ChevronDown,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type NavItem = { label: string; to: string; icon: any };
type NavGroup = { label: string; items: NavItem[] };

const groups: NavGroup[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", to: "/", icon: LayoutDashboard }],
  },
  {
    label: "CRM",
    items: [
      { label: "Customers", to: "/crm/customers", icon: Users },
      { label: "Contacts", to: "/crm/contacts", icon: Users },
      { label: "Leads", to: "/crm/leads", icon: Users },
    ],
  },
  {
    label: "Estimating",
    items: [
      { label: "Estimates", to: "/estimating/estimates", icon: Calculator },
      { label: "Cost Codes", to: "/estimating/cost-codes", icon: Calculator },
      { label: "Proposal Generator", to: "/estimating/proposal", icon: Calculator },
    ],
  },
  {
    label: "Sales Pipeline",
    items: [
      { label: "Proposal Tracking", to: "/pipeline/tracking", icon: KanbanSquare },
      { label: "Revisions", to: "/pipeline/revisions", icon: KanbanSquare },
      { label: "Awarded Jobs", to: "/pipeline/awarded", icon: KanbanSquare },
    ],
  },
  {
    label: "Projects",
    items: [
      { label: "Active Jobs", to: "/projects/active", icon: Building2 },
      { label: "Change Orders", to: "/projects/change-orders", icon: Building2 },
      { label: "RFIs", to: "/projects/rfis", icon: Building2 },
      { label: "Submittals", to: "/projects/submittals", icon: Building2 },
    ],
  },
  {
    label: "Financial",
    items: [
      { label: "Billing", to: "/financial/billing", icon: Wallet },
      { label: "Invoices", to: "/financial/invoices", icon: Wallet },
      { label: "Commitments", to: "/financial/commitments", icon: Wallet },
      { label: "Budget vs Actual", to: "/financial/budget", icon: Wallet },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Reporting", to: "/reporting", icon: BarChart3 },
      { label: "Integrations", to: "/integrations", icon: Plug },
      { label: "Admin", to: "/admin", icon: Shield },
    ],
  },
];

function SidebarLink({ item }: { item: NavItem }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      className={`group flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors ${
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
      }`}
    >
      <Icon className={`h-4 w-4 ${active ? "text-[var(--accent)]" : "opacity-70"}`} />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

export function AppShell() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
        <div className="flex h-14 items-center gap-2 px-4 border-b border-sidebar-border">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 p-1">
            <img src={logo} alt="New Touch of Color" className="h-full w-full object-contain" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[13px] font-semibold text-white">New Touch of Color</span>
            <span className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60">
              Budget Management
            </span>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {groups.map((g) => (
            <div key={g.label} className="space-y-1">
              <div className="px-2.5 text-[10px] uppercase tracking-wider text-sidebar-foreground/45 font-semibold">
                {g.label}
              </div>
              {g.items.map((it) => (
                <SidebarLink key={it.to} item={it} />
              ))}
            </div>
          ))}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-2 rounded-md bg-sidebar-accent/40 px-2.5 py-2">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-[var(--accent)] text-white text-xs">JM</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-white truncate">Jordan Miller</div>
              <div className="text-[10px] text-sidebar-foreground/60 truncate">Administrator</div>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-sidebar-foreground/60" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-card/80 backdrop-blur px-4 lg:px-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects, customers, estimates…"
              className="pl-8 h-9 bg-background border-border"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" className="h-9 gap-1.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white">
              <Plus className="h-4 w-4" /> New Estimate
            </Button>
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px] bg-[var(--destructive)] text-white border-0">
                3
              </Badge>
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-[var(--primary)] text-white text-xs">JM</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}