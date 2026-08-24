# FinSight — AI-Powered Financial Intelligence Platform

FinSight is a production-grade personal finance web application built with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS**, **Prisma**, **PostgreSQL**, **NextAuth (Auth.js v5)**, and **Google Gemini AI**.

It provides real-time cashflow analytics, automated budget burn-rate tracking, OCR receipt scanning, anomaly detection, and context-aware financial Q&A powered by generative AI.

---

## 🔗 Links

- **Live Application**: [https://finsight-finance-ai.vercel.app](https://finsight-finance-ai.vercel.app)
- **Source Code**: [https://github.com/YashChauhan245/FinSight](https://github.com/YashChauhan245/FinSight)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, RSC) |
| UI Library | React 19 |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React, Radix UI |
| Charts | Recharts |
| ORM | Prisma v6 |
| Database | PostgreSQL (Supabase / Neon) |
| Auth | NextAuth v5 — Google, GitHub, Credentials |
| AI | Google Gemini API |
| Email | Resend + React Email |
| Background Jobs | Inngest |
| Security | Arcjet |
| Notifications | Sonner |

---

## ✨ Key Features

1. **Multi-Provider Auth** — Google OAuth, GitHub OAuth, Email/Password (bcryptjs)
2. **Cashflow Dashboard** — Real-time balance tracking across multiple accounts with Recharts visualisation
3. **AI Financial Assistant** — Gemini-powered Q&A grounded in 90 days of real transaction data
4. **Budget & Burn-Rate** — Monthly limits with visual warnings at 80% and 100% thresholds
5. **Anomaly Detection** — Month-over-month spike detection + recurring commitment reminders
6. **Receipt OCR** — Automated form pre-fill from receipt photos
7. **Smart Email Alerts** — Budget alert emails dispatched via Resend + Inngest background jobs

---

## 📁 Project Structure

```
FinSight/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Auth pages (sign-in, sign-up)
│   ├── (main)/                 # Protected app routes
│   │   ├── dashboard/          # Main dashboard + account cards
│   │   ├── account/[id]/       # Individual account detail view
│   │   └── transaction/        # Transaction create/edit form
│   ├── api/                    # API route handlers (Inngest webhook)
│   ├── globals.css             # Global styles + Tailwind directives
│   ├── layout.js               # Root layout (Header, Footer, Providers)
│   ├── page.js                 # Public landing page
│   ├── error.jsx               # Global error boundary
│   └── not-found.jsx           # 404 page
│
├── components/                 # Shared UI components
│   ├── ui/                     # shadcn/ui primitives (Button, Dialog, etc.)
│   ├── hero.jsx                # Landing page hero section
│   ├── ai-simulator.jsx        # Interactive AI chat demo widget
│   ├── create-account-drawer.jsx # Slide-in drawer to add bank accounts
│   ├── header.jsx              # Top-level header wrapper (server component)
│   ├── navbar-client.jsx       # Responsive navbar with auth state
│   ├── footer.jsx              # Site footer
│   └── providers.jsx           # SessionProvider wrapper
│
├── actions/                    # Next.js Server Actions
│   ├── account.js              # Account CRUD operations
│   ├── transaction.js          # Transaction CRUD + filtering
│   ├── budget.js               # Budget get/upsert logic
│   ├── budget-email.js         # Budget alert email dispatch
│   ├── dashboard.js            # Dashboard aggregation queries
│   ├── ai.js                   # Gemini AI integration
│   ├── send-email.js           # Resend email wrapper
│   ├── signup.js               # User registration action
│   └── seed.js                 # Dev: seed transactions for testing
│
├── lib/                        # Core utilities & config
│   ├── inngest/
│   │   ├── client.js           # Inngest client instance
│   │   └── function.js         # Background job definitions
│   ├── arcjet.js               # Arcjet security config
│   ├── checkUser.js            # Server-side user verification
│   ├── prisma.js               # Prisma client singleton
│   ├── schema.js               # Zod validation schemas
│   └── utils.js                # Shared utility helpers (cn, formatCurrency)
│
├── hooks/
│   └── use-fetch.js            # Custom hook for server action invocation
│
├── data/
│   └── categories.js           # Transaction category definitions
│
├── emails/
│   └── template.jsx            # React Email budget alert template
│
├── prisma/                     # Database schema & migrations
│   └── schema.prisma
│
├── public/                     # Static assets
│   ├── logoo.png               # FinSight logo
│   └── icon.png                # Favicon
│
├── auth.js                     # NextAuth main config (adapters, providers)
├── auth.config.js              # Edge-safe auth config for middleware
├── middleware.js               # Route protection middleware
├── tailwind.config.js
├── next.config.mjs
└── .env                        # Environment variables (not committed)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** `v18+`
- **PostgreSQL** — Supabase, Neon, or local instance

### Installation

```bash
git clone https://github.com/YashChauhan245/FinSight.git
cd FinSight
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
# NextAuth
AUTH_SECRET="your-auth-secret"
NEXTAUTH_URL="http://localhost:3000"

# OAuth
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# AI & Services
GEMINI_API_KEY="..."
RESEND_API_KEY="re_..."
ARCJET_KEY="ajkey_..."
```

### Database Setup

```bash
npx prisma generate
npx prisma db push
```

### Development

```bash
npm run dev         # Start dev server → http://localhost:3000
npm run email       # Start React Email preview server
npm run lint        # Run ESLint checks
npm run build       # Production build
```

---

## 📐 Architecture Notes

- **Server Actions First** — All mutations use Next.js 15 Server Actions with Zod validation, no REST endpoints for data
- **Edge-Compatible Auth** — `auth.config.js` is separated for middleware compatibility
- **Prisma Singleton** — `lib/prisma.js` ensures a single client instance in dev to prevent connection exhaustion
- **Background Jobs** — Inngest handles scheduled budget alerts and recurring transaction checks asynchronously
