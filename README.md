# FinSight — AI-Powered Financial Intelligence Platform

FinSight is a production-grade personal finance web application built with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS**, **Prisma**, **PostgreSQL**, **NextAuth (Auth.js v5)**, and **Google Gemini AI**. 

It provides real-time cashflow analytics, automated budget burn-rate tracking, OCR receipt scanning, anomaly detection, and context-aware financial Q&A powered by generative AI. Designed with a clean, responsive fintech interface, FinSight delivers intuitive financial management for individuals, freelancers, and professionals.

---

## 🔗 Links

- **Live Application**: [https://finsight-finance-ai.vercel.app](https://finsight-finance-ai.vercel.app)
- **Source Code**: [https://github.com/YashChauhan245/FinSight](https://github.com/YashChauhan245/FinSight)

---

## 🛠️ Tech Stack

### Frontend & UI
- **Framework**: Next.js 15 (App Router, React Server Components)
- **Library**: React 19
- **Styling**: Tailwind CSS 3 (Pure utility-first design system)
- **Icons & UI Primitives**: Lucide React, Radix UI (Dialog, Select, Popover, Switch, Drawer)
- **Charts & Visualization**: Recharts
- **Notifications**: Sonner

### Backend & Database
- **Server Architecture**: Next.js 15 Server Actions & API Route Handlers
- **Database**: PostgreSQL (Hosted on Supabase / Neon)
- **ORM**: Prisma ORM (v6)
- **Authentication**: NextAuth (Auth.js v5) — Google OAuth 2.0, GitHub OAuth 2.0 & Email/Password Credentials (bcryptjs hashing, JWT Session Tokens)

### AI & Integrations
- **AI Analytics**: Google Gemini API (`@google/generative-ai`)
- **Email Delivery**: Resend API (`resend`, `@react-email/components`)
- **Background Jobs & Triggers**: Inngest (`inngest`)
- **Security & Bot Protection**: Arcjet (`@arcjet/next`)

---

## ✨ Key Features & Capability Overview

### 1. Flexible Multi-Provider Authentication
- Seamless sign-in via **Google** and **GitHub** OAuth.
- Standard **Email & Password** registration with secure `bcryptjs` password hashing and automatic account initialization.

### 2. Multi-Account Cashflow Analytics
- Aggregates Checking, Savings, Credit, and Wallet balances into a single dashboard.
- Real-time balance updates with single-click default account designation.
- Recharts distribution of expense categories over flexible time horizons.

### 3. Context-Aware AI Financial Assistant
- Leverages Google Gemini AI to analyze 90 days of actual user transaction records.
- Returns actionable insights on spending trends, savings opportunities, and budget health.
- Pre-built quick query prompts for instant financial advice.

### 4. Monthly Budget & Burn-Rate Management
- Custom monthly spending limits with real-time percentage consumption tracking.
- Instant visual warnings for budgets exceeding 80% and 100% thresholds.
- On-demand automated email alert dispatching via Resend.

### 5. Smart Alerts & Anomaly Detection
- **Month-over-Month Anomaly Engine**: Detects category spend spikes relative to previous month benchmarks.
- **Recurring Commitment Reminders**: Automatically tracks daily, weekly, monthly, and yearly recurring bills.

### 6. Receipts & Transaction Management
- Comprehensive transaction ledger supporting filtering by account, category, type (Income/Expense), and recurring status.
- Receipt OCR scanning integration for automated form pre-filling.

---

## 📐 Database Schema & Entities

FinSight uses Prisma ORM connected to PostgreSQL with relational data models:

- **User**: Stores user profile, unique email, optional hashed password, and avatar image.
- **Account**: Manages bank/wallet accounts (`CURRENT`, `SAVINGS`), initial and current balance, and default status.
- **Transaction**: Tracks individual income and expense items linked to accounts, with category tagging, recurring frequency, and date stamps.
- **Budget**: Maintains monthly spending limits per user with email notification state tracking.

---

## 🏗️ Architecture & Engineering Highlights

- **Server Actions First**: All data mutations (account creation, transaction logging, budget updates, AI querying) utilize Next.js 15 Server Actions with Zod validation.
- **Pure Utility Styling**: Zero custom CSS rules or external styling frameworks — 100% styled using atomic Tailwind CSS utilities.
- **Edge-Compatible Auth**: NextAuth v5 configuration separated into edge-safe `auth.config.js` for middleware route protection.
- **Secure Middleware Execution**: Auth middleware enforces route protection across `/dashboard`, `/account`, and `/transaction` paths before render.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: `v18.x` or `v20.x`
- **npm**: `v9.x` or higher
- **PostgreSQL Database**: Connection string from Supabase, Neon, or local instance

### 2. Installation
```bash
# Clone repository
git clone https://github.com/YashChauhan245/FinSight.git
cd FinSight

# Install dependencies
npm install
```

### 3. Environment Variables Setup
Create a `.env` file in the root directory:

```env
# NextAuth / Auth.js Configuration
AUTH_SECRET="your-generated-auth-secret"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Credentials (GitHub)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# OAuth Credentials (Google)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Database Connection
DATABASE_URL="postgresql://user:password@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://user:password@aws-1-ap-south-1.pooler.supabase.com:5432/postgres"

# Google Gemini AI
GEMINI_API_KEY="AQ.Ab8..."

# Resend Email Service
RESEND_API_KEY="re_..."

# Arcjet Security
ARCJET_KEY="ajkey_..."
```

### 4. Database Setup
```bash
# Generate Prisma Client & push schema to database
npx prisma generate
npx prisma db push
```

### 5. Development Server
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📋 Code Quality

To verify ESLint compliance across all pages and actions:
```bash
npm run lint
```
