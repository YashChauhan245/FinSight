# FinSight — AI-Powered Financial Intelligence Platform

FinSight is a production-grade personal finance web application built with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS**, **Prisma**, **PostgreSQL**, and **Google Gemini AI**. 

It provides real-time cashflow analytics, automated budget burn-rate tracking, OCR receipt scanning, anomaly detection, and context-aware financial Q&A powered by generative AI. Designed with a clean, responsive fintech interface, FinSight delivers intuitive financial management for individuals, freelancers, and professionals.

---

## 🔗 Links

- **Live Application**: [https://your-finsight-app.vercel.app](https://your-finsight-app.vercel.app)
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
- **Database**: PostgreSQL (Hosted on Neon Database)
- **ORM**: Prisma ORM (v6)
- **Authentication**: Clerk Auth (OAuth 2.0, Session Tokens, Protected Middleware)

### AI & Integrations
- **AI Analytics**: Google Gemini API (`@google/genai`)
- **Email Delivery**: Resend API (`resend`, `@react-email/components`)
- **Background Jobs & Triggers**: Inngest (`inngest`)
- **Security & Bot Protection**: Arcjet (`@arcjet/next`)

---

## ✨ Key Features & Capability Overview

### 1. Multi-Account Cashflow Analytics
- Aggregates Checking, Savings, Credit, and Wallet balances into a single dashboard.
- Real-time balance updates with single-click default account designation.
- Recharts distribution of expense categories over flexible time horizons (7 Days, 1 Month, 3 Months, 6 Months, All Time).

### 2. Context-Aware AI Financial Assistant
- Leverages Google Gemini AI to analyze 90 days of actual user transaction records.
- Returns actionable insights on spending trends, savings opportunities, and budget health.
- Pre-built quick query prompts for instant financial advice.

### 3. Monthly Budget & Burn-Rate Management
- Custom monthly spending limits with real-time percentage consumption tracking.
- Instant visual warnings for budgets exceeding 80% and 100% thresholds.
- On-demand automated email alert dispatching via Resend.

### 4. Smart Alerts & Anomaly Detection
- **Month-over-Month Anomaly Engine**: Detects category spend spikes greater than 30% relative to previous month benchmarks.
- **Recurring Commitment Reminders**: Automatically tracks daily, weekly, monthly, and yearly recurring bills with due-date countdowns.

### 5. Receipts & Transaction Management
- Comprehensive transaction ledger supporting filtering by account, category, type (Income/Expense), and recurring status.
- Receipt OCR scanning integration for automated form pre-filling.

---

## 📐 Database Schema & Entities

FinSight uses Prisma ORM connected to PostgreSQL with relational data models:

- **User**: Stores authenticated user profile and Clerk identity mapping.
- **Account**: Manages bank/wallet accounts (`CURRENT`, `SAVINGS`), initial and current balance, and default status.
- **Transaction**: Tracks individual income and expense items linked to accounts, with category tagging, recurring frequency, and date stamps.
- **Budget**: Maintains monthly spending limits per user with email notification state tracking.

---

## 🏗️ Architecture & Engineering Highlights

- **Server Actions First**: All data mutations (account creation, transaction logging, budget updates, AI querying) utilize Next.js 15 Server Actions with Zod validation.
- **Pure Utility Styling**: Zero custom CSS rules or external styling frameworks — 100% styled using atomic Tailwind CSS utilities.
- **Optimized Performance**: Standardized on Google `Inter` font via `next/font/google` for minimal FOIT/FOUT and zero extra network requests.
- **Secure Middleware Execution**: Clerk middleware enforces route protection across `/dashboard`, `/account`, and `/transaction` paths before render.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: `v18.x` or `v20.x`
- **npm**: `v9.x` or higher
- **PostgreSQL Database**: Connection string from Neon, Supabase, or local instance

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
# Database
DATABASE_URL="postgresql://user:password@ep-example.neon.tech/finsight?sslmode=require"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

# Google Gemini AI
GEMINI_API_KEY="AIzaSy..."

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

---
