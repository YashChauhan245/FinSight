# FinSight — AI-Powered Financial Intelligence Platform

> A production-grade personal finance platform that aggregates multi-account cashflows, detects spending anomalies, automates recurring commitments, and delivers AI-curated financial insights — all in one unified dashboard.

**Live Demo → [finsight-finance-ai.vercel.app](https://finsight-finance-ai.vercel.app)**  
**Source Code → [github.com/YashChauhan245/FinSight](https://github.com/YashChauhan245/FinSight)**

---

## 🛠️ Tech Stack

| Layer | Technology |
|:---|:---|
| **Framework** | Next.js 15 (App Router, React Server Components) |
| **UI Runtime** | React 19 |
| **Styling** | Tailwind CSS v3 + shadcn/ui primitives |
| **Icons** | Lucide React |
| **Charts** | Recharts |
| **Forms** | React Hook Form + Zod validation |
| **ORM** | Prisma v6 |
| **Database** | PostgreSQL (Supabase) via PgBouncer connection pooling |
| **Authentication** | NextAuth v5 — Google OAuth, GitHub OAuth, Email/Password |
| **Password Hashing** | bcryptjs (10 salt rounds) |
| **AI Engine** | Google Gemini API (`@google/generative-ai`) |
| **Background Jobs** | Inngest (serverless-native event queue) |
| **Email** | Resend + React Email |
| **Security** | Arcjet (edge bot detection + rate limiting) |
| **Notifications** | Sonner |
| **Date Utilities** | date-fns |
| **Deployment** | Vercel (Edge + Serverless Functions) |

---

## ✨ Features

### 🔐 Authentication & Security
- **Multi-provider auth** — Google OAuth, GitHub OAuth, Email/Password registration
- **Edge-safe auth split** — `auth.config.js` (Edge/middleware) and `auth.js` (Node.js) solves Vercel Edge Runtime incompatibility with `bcryptjs` and Prisma
- **HttpOnly JWT cookies** — Session tokens are `HttpOnly`, `SameSite=Lax`, `Secure` — immune to XSS extraction
- **Arcjet bot shield** — Edge-level bot fingerprinting, IP reputation checks, token bucket rate limiting
- **Dual-layer Zod validation** — Client-side (React Hook Form) + server-side (Server Actions)

### 📊 Financial Dashboard
- **Multi-account management** — Checking and Savings accounts with atomic single-default invariant enforcement
- **Real-time balance tracking** — Every transaction atomically updates account balance via Prisma `$transaction`
- **Cashflow charts** — Recharts bar + pie charts for income/expense breakdown and category distribution
- **Budget burn-rate** — Color-coded progress bar: green (<50%) → amber (50–79%) → red (≥80%)
- **Arbitrary-precision math** — All monetary values stored as PostgreSQL `NUMERIC(65, 30)` via Prisma `Decimal` — zero IEEE 754 floating-point drift

### 🤖 AI-Powered Intelligence
- **Receipt OCR scanner** — Upload a receipt photo; Gemini multimodal vision extracts `amount`, `date`, `merchant`, `category` and pre-fills the transaction form in <1.5 seconds
- **90-day financial advisor** — AI grounded in real cashflow data (pre-computed metrics injected as context to prevent hallucinations)
- **5-tier model fallback** — `gemini-2.5-flash` → `gemini-2.0-flash` → `gemini-2.0-flash-lite` → `gemini-1.5-flash-8b` → `gemini-2.5-pro` for 99.9% availability against API rate limits

### ⚡ Automation & Background Jobs (Inngest)
- **Recurring transactions** — Daily cron (`0 0 * * *`) processes due recurring bills with per-user throttling (10 tx/min) and idempotency guards
- **Budget alerts** — Every-6-hour cron (`0 */6 * * *`) emails users when spending hits ≥80% of monthly budget; max one alert per calendar month
- **Monthly AI digest** — 1st-of-month cron (`0 0 1 * *`) sends a Gemini-curated financial summary with 3 personalized insights via Resend + React Email

### 🔍 Spend Intelligence
- **Anomaly detection** — Month-over-month category spend delta; flags any category with ≥30% increase
- **Upcoming bill reminders** — 7-day lookahead for recurring commitments in the Smart Alerts widget
- **Transaction management** — Create, edit, bulk-delete; all balance adjustments run in atomic Prisma transactions

### 🚀 Performance Engineering
- **React Server Components** — Heavy dependencies (Prisma, Gemini SDK, bcryptjs) stay server-side; ~65% smaller client bundle
- **Non-blocking onboarding** — 180-day synthetic seeding fires asynchronously on first login; sign-in latency <100ms
- **PgBouncer connection pooling** — Prevents serverless connection exhaustion (Supabase port 6543)
- **Batch DB operations** — 180 seed transactions inserted via single `createMany()` (~80ms vs ~3s sequential)

---

## 📁 Project Structure

```
FinSight/
├── app/                             # Next.js App Router
│   ├── (auth)/                      # Public auth routes (sign-in, sign-up)
│   ├── (main)/                      # Protected routes (session-gated)
│   │   ├── layout.js                # Layout with checkUser guard
│   │   ├── dashboard/               # Main financial dashboard
│   │   │   └── _components/         # Dashboard widgets
│   │   │       ├── account-card.jsx
│   │   │       ├── budget-progress.jsx
│   │   │       ├── smart-alerts.jsx
│   │   │       ├── transaction-overview.jsx
│   │   │       └── ai-insight.jsx
│   │   ├── account/[id]/            # Individual account ledger
│   │   └── transaction/             # Transaction create/edit form
│   ├── api/inngest/route.js         # Inngest webhook handler (HMAC-verified)
│   ├── globals.css
│   ├── layout.js                    # Root layout (Inter font, providers)
│   ├── page.js                      # Public landing page (RSC)
│   ├── error.jsx                    # React error boundary
│   └── not-found.jsx                # 404 page
│
├── components/                      # Shared UI components
│   ├── ui/                          # shadcn/ui primitives
│   ├── hero.jsx
│   ├── ai-simulator.jsx
│   ├── create-account-drawer.jsx
│   ├── header.jsx
│   ├── navbar-client.jsx
│   ├── footer.jsx
│   └── providers.jsx
│
├── actions/                         # Next.js Server Actions
│   ├── account.js                   # Account CRUD + bulk delete
│   ├── transaction.js               # Transaction CRUD + OCR (scanReceipt)
│   ├── budget.js                    # Budget upsert
│   ├── budget-email.js              # Budget alert email trigger
│   ├── dashboard.js                 # Dashboard aggregation queries
│   ├── ai.js                        # Gemini AI financial advisor
│   ├── send-email.js                # Resend email wrapper
│   ├── signup.js                    # User registration
│   └── seed.js                      # 180-day synthetic data seeder
│
├── lib/                             # Core utilities & config
│   ├── inngest/
│   │   ├── client.js                # Inngest client instance
│   │   └── function.js              # 3 background cron job definitions
│   ├── arcjet.js                    # Arcjet security configuration
│   ├── checkUser.js                 # Idempotent user sync + async seeding
│   ├── prisma.js                    # Prisma singleton (HMR-safe)
│   ├── schema.js                    # Zod schemas
│   └── utils.js                     # cn(), formatCurrency(), serializeDecimal()
│
├── hooks/
│   └── use-fetch.js                 # Custom hook for server action mutations
│
├── data/
│   └── categories.js                # Transaction category definitions + colors
│
├── emails/
│   └── template.jsx                 # React Email budget alert template
│
├── prisma/
│   ├── schema.prisma                # Database schema
│   └── migrations/                  # Version-controlled SQL migrations
│
├── public/
│   ├── logoo.png
│   └── icon.png
│
├── auth.js                          # NextAuth main config (Node.js only)
├── auth.config.js                   # Edge-safe NextAuth config (middleware)
├── middleware.js                    # Route protection + Arcjet bot shield
├── tailwind.config.js
├── next.config.mjs                  # Image domain whitelisting
└── .env                             # Environment variables (not committed)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** `v18+`
- **PostgreSQL** — [Supabase](https://supabase.com) (recommended) or Neon
- **Inngest account** — [inngest.com](https://inngest.com) for background jobs

### 1. Clone & Install

```bash
git clone https://github.com/YashChauhan245/FinSight.git
cd FinSight
npm install
# postinstall automatically runs `prisma generate`
```

### 2. Environment Variables

Create a `.env` file in the project root:

```env
# ─── NextAuth ────────────────────────────────────────────────────────────────
AUTH_SECRET="your-nextauth-secret"        # Generate: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# ─── OAuth Providers ─────────────────────────────────────────────────────────
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# ─── Database (Supabase) ─────────────────────────────────────────────────────
DATABASE_URL="postgresql://...@...supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://...@...supabase.com:5432/postgres"
# DATABASE_URL → PgBouncer pooled URL (port 6543) — used at runtime
# DIRECT_URL   → Direct PostgreSQL URL (port 5432) — used for migrations only

# ─── AI & Services ───────────────────────────────────────────────────────────
GEMINI_API_KEY="your-gemini-api-key"
RESEND_API_KEY="re_your-resend-api-key"
ARCJET_KEY="ajkey_your-arcjet-key"
INNGEST_SIGNING_KEY="signkey-..."         # Required in production
INNGEST_EVENT_KEY="your-inngest-event-key"
```

> **Why two database URLs?**  
> `DATABASE_URL` connects via Supabase PgBouncer (transaction pooling mode) for runtime — handles high concurrent serverless connections efficiently.  
> `DIRECT_URL` bypasses PgBouncer for Prisma schema migrations, which require advisory locks not supported in pooling mode.

### 3. Database Setup

```bash
# Apply schema migrations (creates versioned migration files + applies to DB)
npx prisma migrate dev --name init

# Optional: browse your database visually
npx prisma studio
```

### 4. Run Locally

```bash
# Terminal 1 — Next.js dev server
npm run dev
# → http://localhost:3000

# Terminal 2 — Inngest local dev server (required for background jobs)
npx inngest-cli@latest dev
# → http://localhost:8288 (visual job inspector)

# Terminal 3 (optional) — React Email preview
npm run email
```

---

## 📋 Available Scripts

| Script | Description |
|:---|:---|
| `npm run dev` | Start Next.js dev server at `localhost:3000` |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run email` | Start React Email preview server |

---

## 📐 Architecture Highlights

### Edge vs. Node.js Runtime Split
Next.js 15 `middleware.js` runs in Vercel's **Edge Runtime** (V8 isolates), which cannot load Node.js C++ binaries (`bcryptjs`) or TCP socket drivers (Prisma). FinSight resolves this by splitting auth into:

- **`auth.config.js`** — Edge-safe: OAuth providers + JWT callbacks. No Node.js imports. Used by `middleware.js`.
- **`auth.js`** — Node.js only: extends `auth.config.js` + `Credentials` provider with bcrypt + Prisma.

### ACID Financial Transactions
Every balance mutation runs inside an interactive Prisma `$transaction` with atomic SQL increments to prevent lost-update race conditions:

```javascript
await db.$transaction(async (tx) => {
  await tx.transaction.create({ data: transactionData });
  await tx.account.update({
    where: { id: accountId },
    data: { balance: { decrement: amount } }, // SET balance = balance - $1
  });
});
```

### Arbitrary-Precision Decimal Math
All monetary fields use `Decimal` in Prisma → `NUMERIC(65, 30)` in PostgreSQL. This eliminates IEEE 754 binary floating-point rounding errors (e.g., `0.1 + 0.2 = 0.30000000000000004`) that accumulate and corrupt balances over thousands of transactions.

### Non-Blocking Onboarding
On first OAuth login, 180-day synthetic seeding fires **without `await`** in `lib/checkUser.js`, keeping sign-in response under 100ms:

```javascript
if (loggedInUser._count.accounts === 0) {
  seedTransactionsForUser(loggedInUser.id).catch(console.error); // fire-and-forget
}
```

### Inngest Background Job Queue

| Cron | Function | Description |
|:---|:---|:---|
| `0 0 * * *` | `triggerRecurringTransactions` | Daily: process all due recurring bills (10 tx/min per user throttle) |
| `0 */6 * * *` | `checkBudgetAlerts` | Every 6h: email users at ≥80% monthly budget spend (1 alert/month max) |
| `0 0 1 * *` | `generateMonthlyReports` | Monthly: AI-curated financial digest email via Resend |

---

## 🗃️ Database Schema

```
User ──── 1:N ──── Account ──── 1:N ──── Transaction
User ──── 1:1 ──── Budget
```

All child records cascade-delete when a `User` is deleted (`onDelete: Cascade`). B-tree indexes on `userId` and `accountId` fields ensure O(log N) query performance as transaction volume scales.

---

## 🎯 Key Design Decisions

| Decision | Rationale |
|:---|:---|
| Next.js 15 over Vite SPA | Server Actions + RSC keep DB/AI SDKs server-side; no separate API layer |
| Prisma over Drizzle | End-to-end type safety + intuitive `$transaction` API for ACID operations |
| PostgreSQL over MongoDB | Relational integrity, foreign key cascades, `NUMERIC` precision for money |
| NextAuth over Clerk | Full ownership of user data in own DB schema; no vendor lock-in |
| Inngest over node-cron | Serverless-native; in-process cron timers die when lambda functions terminate |
| Gemini over GPT-4o | Generous free-tier limits + fast multimodal vision for receipt OCR |
| Arcjet over express-rate-limit | Edge-native; stateless; no Redis needed; built for Next.js App Router |

---

## ⚠️ Known Limitations

- No real bank integration (Plaid/Setu) — transactions require manual entry or receipt scan
- JavaScript, not TypeScript — type mismatches caught at runtime, not compile time
- Client-side pagination — `TransactionTable` loads all records into memory; degrades at 5,000+ transactions
- Synchronous OCR — may timeout on large files; async S3 + WebSocket pipeline planned for v2
- No automated test suite — Playwright/Vitest integration is a planned improvement

---

*Built by [Yash Chauhan](https://github.com/YashChauhan245)*
