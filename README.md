# New Touch of Color — Budget Management System

A premium frontend prototype for a construction ERP / estimating / CRM platform.
Built with **React 19 + TypeScript + Vite + Tailwind v4 + shadcn/ui + TanStack Router/Start + Recharts**.

This repository ships **front-end only** with mock data and mock authentication.
It is intentionally architected to be exported to GitHub and continued in Replit
for backend integration.

---

## 🔐 Demo login

| Field    | Value             |
| -------- | ----------------- |
| Email    | `demo@ntoc.com`   |
| Password | `demo123`         |

Auth state is persisted in `localStorage` (or `sessionStorage` if "Remember me"
is unchecked). All app routes are protected and redirect unauthenticated users
to `/login`. Use the user menu in the sidebar (or the avatar in the topbar) to
log out.

---

## 🚀 Run locally

```bash
npm install      # or: bun install / pnpm install
npm run dev      # starts Vite on http://localhost:8080
```

> The dev server uses TanStack Start with file-based routing in `src/routes/`.
> The route tree (`src/routeTree.gen.ts`) is regenerated automatically on save.

### Build & preview

```bash
npm run build        # production build
npm run preview      # preview the built app
```

---

## 🧰 Run in Replit

1. **Create a new Repl** → "Import from GitHub" and paste this repository URL.
2. Replit will auto-detect Node. If it asks for a template, pick **Node.js**.
3. Open the **Shell** and run:
   ```bash
   npm install
   npm run dev
   ```
4. Replit exposes the dev server on its built-in webview. The Vite config
   already binds to `0.0.0.0` and uses `strictPort`, which Replit needs.
5. Open the webview and navigate to `/login` if you are not redirected
   automatically.

### Optional `.replit` file

Create a file named `.replit` at the repo root with:

```toml
run = "npm run dev"
entrypoint = "src/routes/index.tsx"

[nix]
channel = "stable-24_05"

[[ports]]
localPort = 8080
externalPort = 80
```

> No Cloudflare Wrangler / Workers commands are needed to run the prototype.
> The Cloudflare adapter listed in dependencies is only used for the hosted
> Lovable preview deployment and is a no-op in local/Replit dev.

---

## 🔑 Environment variables

The prototype runs **with zero environment variables** because all data is mocked.
When you wire a real backend, create a `.env.local` (gitignored) with values like:

```bash
VITE_API_URL=https://api.example.com
VITE_AUTH_DOMAIN=auth.example.com
```

Vite only exposes variables prefixed with `VITE_` to the client.

---

## 📂 Project structure (GitHub export)

```
.
├── README.md
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config (via styles.css @theme)
├── components.json              # shadcn/ui config
└── src/
    ├── assets/                  # logo, images
    ├── components/
    │   ├── app/                 # AppShell, PageHeader, StatCard
    │   └── ui/                  # shadcn/ui primitives
    ├── hooks/
    ├── lib/
    │   ├── auth.tsx             # mock auth context (localStorage)
    │   ├── mock-data.ts         # all KPIs, customers, pipeline, financials
    │   └── utils.ts
    ├── routes/                  # file-based routes (TanStack Router)
    │   ├── __root.tsx           # root shell + AuthProvider + guard
    │   ├── index.tsx            # Dashboard
    │   ├── login.tsx            # Login page
    │   ├── crm.customers.tsx
    │   ├── crm.contacts.tsx
    │   ├── crm.leads.tsx
    │   ├── estimating.estimates.tsx
    │   ├── estimating.cost-codes.tsx
    │   ├── estimating.proposal.tsx
    │   ├── pipeline.tracking.tsx
    │   ├── pipeline.revisions.tsx
    │   ├── pipeline.awarded.tsx
    │   ├── projects.active.tsx
    │   ├── projects.change-orders.tsx
    │   ├── projects.rfis.tsx
    │   ├── projects.submittals.tsx
    │   ├── financial.billing.tsx
    │   ├── financial.invoices.tsx
    │   ├── financial.commitments.tsx
    │   ├── financial.budget.tsx
    │   ├── reporting.tsx
    │   ├── integrations.tsx
    │   └── admin.tsx
    ├── router.tsx
    ├── routeTree.gen.ts         # auto-generated, do NOT edit
    └── styles.css               # design tokens (oklch) + Tailwind v4 theme
```

---

## 🗺️ Routes the client can demo

| Route                          | Module                          |
| ------------------------------ | ------------------------------- |
| `/login`                       | Login (mock)                    |
| `/`                            | Executive Dashboard             |
| `/crm/customers`               | Customers (table + cards)       |
| `/crm/contacts`                | Contacts grid                   |
| `/crm/leads`                   | Lead scoring                    |
| `/estimating/estimates`        | Estimate Builder (3-column)     |
| `/estimating/cost-codes`       | CSI Cost Code library           |
| `/estimating/proposal`         | Proposal generator              |
| `/pipeline/tracking`           | Proposal Pipeline (Kanban)      |
| `/pipeline/revisions`          | Revision history                |
| `/pipeline/awarded`            | Awarded jobs                    |
| `/projects/active`             | Active projects                 |
| `/projects/change-orders`      | Change orders                   |
| `/projects/rfis`               | RFIs                            |
| `/projects/submittals`         | Submittals                      |
| `/financial/billing`           | AIA-style progress billing      |
| `/financial/invoices`          | Invoices                        |
| `/financial/commitments`       | POs / subcontracts              |
| `/financial/budget`            | Budget vs Actual                |
| `/reporting`                   | Report builder canvas           |
| `/integrations`                | QuickBooks, DocuSign, etc.      |
| `/admin`                       | Roles & users                   |

---

## 🎨 Design system

- **Colors** (oklch tokens in `src/styles.css`)
  - Primary `#0F172A`, Accent `#2563EB`, Success `#16A34A`,
    Warning `#F59E0B`, Danger `#DC2626`, Background `#F8FAFC`
- **Typography**: Inter (body) + Space Grotesk (display)
- **Components**: shadcn/ui (Radix primitives + Tailwind variants)
- **Charts**: Recharts (with static-SVG fallbacks where needed)

---

## 🔌 Wiring a real backend (next step in Replit)

1. Replace the `DEMO_USER` flow in `src/lib/auth.tsx` with real API calls
   (Supabase, Auth.js, or your own endpoint).
2. Replace mock arrays in `src/lib/mock-data.ts` with TanStack Query hooks
   that fetch from your API.
3. Add server routes under `src/routes/api/` (TanStack Start server functions)
   or call out to an external Node API hosted in the same Repl.
4. Move secrets into Replit's **Secrets** panel — never commit `.env*` files.

---

## 📝 Notes

- All charts degrade gracefully — if Recharts fails to mount, KPIs and
  surrounding UI still render.
- Routes are statically registered, so unknown URLs show the 404 page in
  `__root.tsx`.
- The app is fully responsive down to ~640px; the sidebar collapses on
  smaller viewports.
