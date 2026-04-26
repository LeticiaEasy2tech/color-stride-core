export type Tone = "default" | "accent" | "success" | "warning" | "danger";

export const kpis: { label: string; value: string; delta: string; tone: Tone; negative?: boolean }[] = [
  { label: "Open Bids", value: "47", delta: "+12%", tone: "accent" },
  { label: "Pending Proposals", value: "23", delta: "+5%", tone: "warning" },
  { label: "Awarded Projects", value: "$2.4M", delta: "+18%", tone: "success" },
  { label: "Revenue Forecast", value: "$5.8M", delta: "+8%", tone: "accent" },
  { label: "Gross Margin", value: "32.4%", delta: "+1.2pp", tone: "success" },
  { label: "Win Rate", value: "41%", delta: "-2pp", tone: "warning", negative: true },
  { label: "Aging > 60d", value: "$184k", delta: "-9%", tone: "danger" },
  { label: "Active Jobs", value: "32", delta: "+3", tone: "default" },
];

export const revenueTrend = [
  { m: "Jan", revenue: 320, forecast: 300 },
  { m: "Feb", revenue: 410, forecast: 380 },
  { m: "Mar", revenue: 380, forecast: 420 },
  { m: "Apr", revenue: 510, forecast: 470 },
  { m: "May", revenue: 590, forecast: 540 },
  { m: "Jun", revenue: 620, forecast: 610 },
  { m: "Jul", revenue: 705, forecast: 680 },
  { m: "Aug", revenue: 780, forecast: 740 },
];

export const budgetVsActual = [
  { name: "Labor", budget: 320, actual: 295 },
  { name: "Materials", budget: 480, actual: 510 },
  { name: "Equipment", budget: 120, actual: 105 },
  { name: "Subs", budget: 240, actual: 260 },
  { name: "Overhead", budget: 90, actual: 82 },
];

export type PipelineCard = {
  id: string;
  title: string;
  customer: string;
  amount: number;
  due: string;
  owner: string;
};

export const pipeline: Record<string, PipelineCard[]> = {
  Pending: [
    { id: "P-1042", title: "Sapphire Unit 1103", customer: "Prescott Carpentries", amount: 6200, due: "Apr 30", owner: "DB" },
    { id: "P-1051", title: "Coral Tower Lobby", customer: "ARCO/Murray", amount: 18400, due: "May 02", owner: "AS" },
  ],
  Sent: [
    { id: "P-1037", title: "State Farm Demise", customer: "DeLauter Dev.", amount: 7071, due: "May 04", owner: "AS" },
    { id: "P-1029", title: "Atlantic Suites", customer: "AJAX Construction", amount: 24500, due: "May 08", owner: "JM" },
  ],
  Revision: [
    { id: "P-1018", title: "Beachview Repaint", customer: "Tracon LLC", amount: 9800, due: "May 10", owner: "DB" },
  ],
  Negotiating: [
    { id: "P-1011", title: "Sunset Plaza Phase 2", customer: "Eco Building", amount: 42100, due: "May 12", owner: "JM" },
  ],
  Awarded: [
    { id: "P-1004", title: "Greenfield HQ", customer: "Winkel Construction", amount: 88600, due: "—", owner: "JM" },
    { id: "P-0998", title: "Marina Lofts", customer: "TGSV Enterprises", amount: 31200, due: "—", owner: "AS" },
  ],
  Lost: [
    { id: "P-0987", title: "Old Mill Restoration", customer: "Blackline Corp", amount: 15400, due: "—", owner: "DB" },
  ],
};

export type Customer = {
  id: number; name: string; type: string; first: string; last: string;
  phone: string; email: string; city: string; state: string; zip: string; active: boolean;
};

export const customers: Customer[] = [
  { id: 1107, name: "ARCO/Murray Design Build", type: "Business", first: "Drew", last: "Murray", phone: "954-294-6364", email: "drew@arcomurray.com", city: "Fort Lauderdale", state: "FL", zip: "33309", active: true },
  { id: 1106, name: "Construction & Development Group", type: "Business", first: "BR", last: "Construction", phone: "305-810-9664", email: "info@cdg.com", city: "Miami Gardens", state: "FL", zip: "33014", active: true },
  { id: 1105, name: "Constructors, Inc.", type: "Business", first: "Mulligan", last: "Constructors", phone: "407-654-6523", email: "hello@constructors.com", city: "Orlando", state: "FL", zip: "32809", active: true },
  { id: 1104, name: "Contracting Solutions", type: "Business", first: "DAX", last: "Solutions", phone: "816-935-9137", email: "ops@contracting.com", city: "Sunrise Beach", state: "MO", zip: "65079", active: true },
  { id: 1103, name: "AJAX Construction", type: "Commercial", first: "AJAX", last: "Construction", phone: "770-674-2889", email: "bid@ajax.com", city: "Atlanta", state: "GA", zip: "30342", active: true },
  { id: 1102, name: "DCRV Contracting LLC", type: "Business", first: "DCRV", last: "Contracting", phone: "904-589-0589", email: "hi@dcrv.com", city: "Green Cove Springs", state: "FL", zip: "32043", active: true },
  { id: 1101, name: "Tracon Construction LLC", type: "Business", first: "Tracon", last: "Construction", phone: "469-915-4141", email: "info@traconconstruction.com", city: "Heath", state: "TX", zip: "75032", active: true },
  { id: 1100, name: "DMR Construction Services", type: "Commercial", first: "DMR", last: "Services", phone: "201-652-2411", email: "admin@dmrconstruct.com", city: "Delray Beach", state: "FL", zip: "33483", active: true },
  { id: 1099, name: "PRESCOTT CARPENTRIES INC.", type: "Residential", first: "Prescott", last: "Carpentries", phone: "954-554-0459", email: "office@prescott.com", city: "MCALPIN", state: "FL", zip: "32062", active: true },
  { id: 1098, name: "Acassa Construction", type: "Business", first: "Acassa", last: "Construction", phone: "561-404-0136", email: "hello@acassa.com", city: "Delray Beach", state: "FL", zip: "33445", active: true },
];

export type CostCode = { code: string; name: string; children?: CostCode[] };

export const costCodes: CostCode[] = [
  { code: "01-100", name: "General Conditions", children: [
    { code: "01-110", name: "Project Management" },
    { code: "01-120", name: "Site Mobilization" },
  ]},
  { code: "09-900", name: "Painting & Coating", children: [
    { code: "09-910", name: "Interior Paint" },
    { code: "09-920", name: "Exterior Paint" },
    { code: "09-930", name: "Specialty Finishes" },
  ]},
  { code: "09-700", name: "Wall Coverings", children: [
    { code: "09-720", name: "Wallcovering Install" },
  ]},
  { code: "06-100", name: "Carpentry", children: [
    { code: "06-110", name: "Rough Carpentry" },
  ]},
];

export type EstimateLine = {
  id: number; code: string; desc: string; qty: number; unit: string;
  labor: number; mat: number; eq: number;
};

export const estimateLines: EstimateLine[] = [
  { id: 1, code: "09-910", desc: "Interior paint — Lobby walls", qty: 1850, unit: "SF", labor: 1.2, mat: 0.85, eq: 0.05 },
  { id: 2, code: "09-910", desc: "Interior paint — Corridor ceilings", qty: 920, unit: "SF", labor: 1.4, mat: 0.95, eq: 0.05 },
  { id: 3, code: "09-920", desc: "Exterior paint — Facade", qty: 4200, unit: "SF", labor: 1.6, mat: 1.1, eq: 0.15 },
  { id: 4, code: "09-930", desc: "Specialty finish — Accent wall", qty: 320, unit: "SF", labor: 2.4, mat: 2.1, eq: 0.1 },
  { id: 5, code: "09-720", desc: "Wallcovering install — Suites", qty: 1200, unit: "SF", labor: 1.8, mat: 3.4, eq: 0.05 },
];

export type Project = {
  id: number; name: string; gc: string; estimator: string;
  status: string; proposal: number; co: number;
};

export const projects: Project[] = [
  { id: 7692, name: "Sapphire Unit 1103 — Fort Lauderdale", gc: "PRESCOTT CARPENTRIES", estimator: "dbrandao", status: "To be Scheduled", proposal: 6200, co: 0 },
  { id: 7565, name: "State Farm Demise — Delray Beach", gc: "DeLauter Development", estimator: "a.schmidel", status: "To be Scheduled", proposal: 7071, co: 0 },
  { id: 7501, name: "Greenfield HQ — Miami", gc: "Winkel Construction", estimator: "j.miller", status: "In Progress", proposal: 88600, co: 4200 },
  { id: 7488, name: "Marina Lofts — Tampa", gc: "TGSV Enterprises", estimator: "a.schmidel", status: "In Progress", proposal: 31200, co: 0 },
  { id: 7401, name: "Sunset Plaza Phase 2 — Naples", gc: "Eco Building", estimator: "j.miller", status: "SoW Complete", proposal: 42100, co: 1800 },
  { id: 7388, name: "Atlantic Suites — Atlanta", gc: "AJAX Construction", estimator: "dbrandao", status: "Closed/Paid", proposal: 24500, co: 0 },
];

export type Invoice = {
  id: string; project: string; customer: string; amount: number;
  status: "Paid" | "Sent" | "Overdue" | "Draft"; due: string;
};

export const invoices: Invoice[] = [
  { id: "INV-20451", project: "Greenfield HQ", customer: "Winkel Construction", amount: 22150, status: "Paid", due: "Apr 12" },
  { id: "INV-20450", project: "Sunset Plaza Phase 2", customer: "Eco Building", amount: 14800, status: "Sent", due: "Apr 28" },
  { id: "INV-20449", project: "Marina Lofts", customer: "TGSV Enterprises", amount: 9600, status: "Overdue", due: "Apr 02" },
  { id: "INV-20448", project: "Atlantic Suites", customer: "AJAX Construction", amount: 24500, status: "Paid", due: "Mar 30" },
  { id: "INV-20447", project: "State Farm Demise", customer: "DeLauter Dev.", amount: 7071, status: "Draft", due: "May 04" },
];

export type Activity = { who: string; what: string; target: string; to: string; time: string };
export const activities: Activity[] = [
  { who: "Jordan M.", what: "moved", target: "Greenfield HQ", to: "Awarded", time: "12m ago" },
  { who: "Ana S.", what: "sent proposal for", target: "Atlantic Suites", to: "AJAX Construction", time: "48m ago" },
  { who: "Daniel B.", what: "uploaded RFI #21 to", target: "Sapphire Unit 1103", to: "", time: "2h ago" },
  { who: "Leticia E.", what: "approved change order on", target: "Sunset Plaza Phase 2", to: "+ $1,800", time: "5h ago" },
  { who: "Jordan M.", what: "created estimate for", target: "Coral Tower Lobby", to: "$18,400", time: "Yesterday" },
];

export type Task = { id: number; title: string; due: string; priority: "High" | "Med" | "Low" };
export const tasks: Task[] = [
  { id: 1, title: "Review revisions on Beachview Repaint", due: "Today", priority: "High" },
  { id: 2, title: "Send proposal — Coral Tower Lobby", due: "Tomorrow", priority: "Med" },
  { id: 3, title: "Walkthrough — Marina Lofts", due: "Apr 28", priority: "Med" },
  { id: 4, title: "Approve invoice INV-20450", due: "Apr 28", priority: "Low" },
];

export type Alert = { tone: "danger" | "warning" | "accent"; title: string; subtitle: string };
export const alerts: Alert[] = [
  { tone: "danger", title: "Invoice INV-20449 overdue 24 days", subtitle: "TGSV Enterprises — $9,600" },
  { tone: "warning", title: "Estimate P-1018 awaiting client revision", subtitle: "Tracon LLC — 3 days" },
  { tone: "accent", title: "New RFI on Greenfield HQ", subtitle: "RFI #14 — Drywall scope" },
];

export type Integration = { name: string; category: string; connected: boolean; desc: string };
export const integrations: Integration[] = [
  { name: "QuickBooks", category: "Accounting", connected: true, desc: "Sync invoices, customers and payments." },
  { name: "PlanSwift", category: "Takeoff", connected: true, desc: "Import takeoffs into estimates." },
  { name: "ExakTime", category: "Time tracking", connected: false, desc: "Field time and labor cost." },
  { name: "CompanyCam", category: "Photos", connected: true, desc: "Project photos linked to jobs." },
  { name: "pCloud", category: "Storage", connected: false, desc: "Unified document storage." },
  { name: "Siteline", category: "AR / Billing", connected: false, desc: "Pay applications and lien waivers." },
  { name: "DocuSign", category: "Signatures", connected: true, desc: "Send proposals & change orders for signature." },
];