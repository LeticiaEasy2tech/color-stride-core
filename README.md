# New Touch of Color — Estimator Platform

A premium **frontend prototype** for an internal construction estimating, CRM,
project management, and financial operations platform built for **New Touch of
Color**. This codebase is the client-ready demo; backend integration will be
performed in Replit after handoff.

> ⚠️ **Mock data only.** All KPIs, customers, pipeline entries, projects,
> invoices, and reports are loaded from `src/lib/mock-data.ts`. Authentication
> is mocked in `src/lib/auth.tsx` and persisted in `localStorage` /
> `sessionStorage`. No external services are called.

---

## 🔐 Demo login

| Field    | Value             |
| -------- | ----------------- |
| Email    | `demo@ntoc.com`   |
| Password | `demo123`         |

All routes are protected and redirect unauthenticated users to `/login`.

---

## 🧱 Tech stack

- **React 19** + **TypeScript**
- **Vite 7** (dev server + build)
- **TanStack Router / Start v1** — file-based routing in `src/routes/`
- **TanStack Query** — ready for data fetching when backend is wired
- **Tailwind CSS v4** — design tokens in `src/styles.css` (`oklch` palette)
- **shadcn/ui** (Radix primitives) — components in `src/components/ui/`
- **Recharts** — charts on the Dashboard / Reporting screens
- **Lucide React** — icon set
- **Zod**, **react-hook-form**, **date-fns**, **sonner**

---

## 🚀 Run locally

```bash
npm install
npm run dev          # http://localhost:8080
```

### Other scripts

```bash
npm run build        # production build
npm run preview      # preview the production build
npm run lint         # eslint
npm run format       # prettier --write .
```

---

## 🧰 Run in Replit

1. **Create a new Repl** → *Import from GitHub* and paste the repository URL.
2. When prompted for a template, choose **Node.js** (Node 20+).
3. In the Replit Shell:
   ```bash
   npm install
   npm run dev
   ```
4. Replit will expose port `8080` on its built-in webview. Vite is configured
   to bind to `0.0.0.0` with `strictPort`, which Replit needs.
5. Open the webview — you'll be redirected to `/login`. Use the demo
   credentials above.

A `.replit` file is included at the repo root:

```toml
run = "npm run dev"
entrypoint = "src/routes/index.tsx"
modules = ["nodejs-20"]

[[ports]]
localPort = 8080
externalPort = 80
```

---

## 🔑 Environment variables

The prototype runs with **zero environment variables**. When you start wiring a
real backend in Replit, copy `.env.example` to `.env.local` and fill in:

```bash
VITE_API_URL=https://api.example.com
VITE_AUTH_DOMAIN=auth.example.com
```

Only variables prefixed with `VITE_` are exposed to the client. Store secrets
(API keys, OAuth client secrets) in **Replit Secrets**, never commit them.

---

## 📂 Folder structure

```
.
├── README.md
├── package.json
├── vite.config.ts
├── tsconfig.json
├── components.json              # shadcn/ui config
├── .env.example
├── .replit
└── src/
    ├── components/
    │   ├── app/                 # AppShell, PageHeader, StatCard, FilterBar
    │   └── ui/                  # shadcn/ui primitives
    ├── hooks/
    │   └── use-mobile.tsx
    ├── lib/
    │   ├── auth.tsx             # 🔌 mock auth — replace with real provider
    │   ├── mock-data.ts         # 🔌 all demo data — replace with API hooks
    │   └── utils.ts
    ├── routes/                  # file-based routes (TanStack Router)
    │   ├── __root.tsx           # root shell + AuthProvider + route guard
    │   ├── index.tsx            # Executive Dashboard
    │   ├── login.tsx
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
    ├── routeTree.gen.ts         # ⚠️ auto-generated — do NOT edit
    └── styles.css               # design tokens + Tailwind v4 theme
```

---

## 🗺️ Routes

| Route                          | Module                          |
| ------------------------------ | ------------------------------- |
| `/login`                       | Login (mock auth)               |
| `/`                            | Executive Dashboard             |
| `/crm/customers`               | Customers                       |
| `/crm/contacts`                | Contacts                        |
| `/crm/leads`                   | Lead scoring                    |
| `/estimating/estimates`        | Estimate Builder                |
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
| `/reporting`                   | Report builder                  |
| `/integrations`                | QuickBooks, DocuSign, etc.      |
| `/admin`                       | Roles & users                   |

Every main module includes the reusable **FilterBar** (`src/components/app/filter-bar.tsx`)
with Client / Status / Category / Date range / Saved Views controls.

---

## 🔌 Where to connect a backend (next step in Replit)

The codebase is intentionally structured so backend wiring touches **only two
files**:

1. **`src/lib/auth.tsx`** — replace the `DEMO_USER` flow with real auth
   (Auth.js, Supabase, Clerk, or your own `/api/auth` endpoint). Keep the
   `AuthProvider` / `useAuth` shape so the route guard in `__root.tsx` keeps
   working.

2. **`src/lib/mock-data.ts`** — replace each exported array/object with a
   TanStack Query hook (`useQuery({ queryKey, queryFn })`). `QueryClient` is
   already configured by TanStack Start.

For server endpoints, you can either:

- Add **server functions** under `src/routes/api/*.ts` using TanStack Start's
  `createServerFn`, or
- Run a separate Node API in the same Repl and call it via `VITE_API_URL`.

Move all secrets into Replit's **Secrets** panel — never commit `.env*` files.

---

## 📝 Notes & limitations

- **Mock data only.** Filters, saved views, and search operate on in-memory
  arrays. Refreshing the page resets any local edits.
- **Mock auth.** Any non-empty email/password combination is accepted at the
  demo credentials only; tokens are stored in `localStorage` / `sessionStorage`.
- **Charts** use Recharts and degrade gracefully — KPIs and surrounding UI
  always render even if a chart fails to mount.
- **Responsive** down to ~640px; the sidebar collapses on smaller viewports.
- **404** unknown URLs render the not-found page defined in `src/routes/__root.tsx`.

---

## 📦 GitHub export → Replit import checklist

- [x] Type check passes (`bunx tsc --noEmit`)
- [x] All sidebar links resolve to existing routes
- [x] Login flow works with demo credentials
- [x] Mock data centralized in `src/lib/mock-data.ts`
- [x] Reusable components in `src/components/app/`
- [x] `.env.example` documents future backend variables
- [x] `.replit` configured for Node 20 + port 8080
- [x] `npm install && npm run dev` boots the app cleanly
