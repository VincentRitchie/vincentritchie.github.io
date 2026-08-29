# Architecture — Obasiochie Vincent Chimaobi Portfolio

This document explains the project structure, design decisions, and how the
codebase is engineered for long-term maintainability, scalability, and future
extension.

---

## 1. Design Principles

The project follows these software engineering principles:

- **Separation of concerns**: frontend presentation is separated from business
  logic; business logic is isolated from UI components.
- **Modular architecture**: backend services are modular and replaceable;
  reusable UI components are organized consistently.
- **Configuration centralization**: all sensitive configuration lives in
  environment variables; content defaults live in a single data file.
- **Dual-mode deployment**: the same codebase supports both static export
  (GitHub Pages) and full-stack mode (Namecheap/VPS) without a rewrite.
- **Honest technology choices**: only technologies actually used are documented;
  future-compatible options are clearly labeled as such.
- **Fallback-first content layer**: the public site always renders from
  `portfolio-data.ts` fallback even if the database is unavailable.

---

## 2. Project Structure

```
obasiochie-portfolio/
├── prisma/
│   ├── schema.prisma          # Database models (13 models)
│   └── seed.ts                # Idempotent seed from portfolio-data.ts
├── public/
│   ├── images/                # Profile, gallery, logos, WhatsApp QR
│   ├── uploads/cv/            # CV PDF (admin-replaceable)
│   ├── faqs.json              # Static FAQ data for GitHub Pages chatbot
│   ├── favicon.svg            # Personal brand monogram (NOT Afrik-Vine)
│   └── robots.txt
├── scripts/
│   ├── hash-password.ts       # Generate bcrypt hash for admin login
│   └── build-static.sh        # Static export build for GitHub Pages
├── src/
│   ├── app/
│   │   ├── page.tsx           # Public homepage (server component, dual-mode)
│   │   ├── layout.tsx         # Root layout (fonts, metadata, Toaster)
│   │   ├── globals.css        # Premium dark neon-tech design system
│   │   ├── admin/             # Admin dashboard (full-stack mode only)
│   │   │   ├── layout.tsx     # Protected admin shell with sidebar nav
│   │   │   ├── login/         # Admin login page
│   │   │   ├── messages/      # Contact message inbox
│   │   │   ├── support/       # Support inquiry inbox
│   │   │   ├── assistants/    # Assistant management
│   │   │   ├── chatbot/       # Chatbot FAQ CRUD
│   │   │   ├── site-settings/ # Site-wide content settings
│   │   │   ├── profile-media/ # Profile image, gallery, CV, logo uploads
│   │   │   ├── company/       # Afrik-Vine company info
│   │   │   ├── projects/      # Project CRUD
│   │   │   ├── articles/      # Article CRUD
│   │   │   ├── skills/        # Skill CRUD
│   │   │   ├── certifications/# Certification CRUD
│   │   │   ├── testimonials/  # Testimonial CRUD
│   │   │   └── achievements/  # Achievement CRUD
│   │   └── api/
│   │       ├── contact/       # Contact form (POST public, GET/PATCH/DELETE admin)
│   │       ├── support/       # Support inquiry (POST public, GET/PATCH/DELETE admin)
│   │       ├── chatbot/       # FAQ + ask endpoints (public)
│   │       ├── content/       # Merged content API (public)
│   │       ├── auth/          # NextAuth authentication
│   │       └── admin/         # Admin CRUD APIs (protected)
│   ├── components/
│   │   ├── portfolio/         # Public site components
│   │   │   ├── portfolio-site.tsx  # Client wrapper (receives content props)
│   │   │   ├── nav.tsx, hero.tsx, about.tsx, ...
│   │   │   ├── chatbot-widget.tsx  # FAQ chatbot + human escalation
│   │   │   ├── hero-slider.tsx     # 5-image showcase slider
│   │   │   └── site-protection.tsx # Copy/screenshot discouragement
│   │   ├── admin/             # Admin UI components
│   │   └── ui/                # shadcn/ui component library
│   ├── lib/
│   │   ├── portfolio-data.ts  # SEED + FALLBACK content (single source of truth)
│   │   ├── web-dev-content.ts # Strengthened web development section content
│   │   ├── faq-seed.ts        # 15 FAQ entries from approved content
│   │   ├── content.ts         # Content layer (DB-over-fallback, static-mode aware)
│   │   ├── db.ts              # Prisma client singleton
│   │   ├── auth.ts            # NextAuth options
│   │   ├── spam.ts            # Honeypot + rate limit + Turnstile
│   │   ├── email.ts           # Contact email notification (Resend/SMTP)
│   │   ├── support.ts         # Support routing + escalation logic
│   │   ├── support-email.ts   # Support email notification
│   │   ├── faq.ts             # Server-side FAQ matching
│   │   └── upload.ts          # File upload validation + save
│   ├── hooks/                 # React hooks
│   └── middleware.ts          # Protects /admin/* and /api/admin/*
├── .github/workflows/deploy.yml  # GitHub Actions → GitHub Pages
├── next.config.ts             # Dual-mode config (standalone | export)
├── prisma/schema.prisma       # 13 Prisma models
├── .env / .env.example        # Environment variables
├── DEPLOYMENT.md              # GitHub Pages + Namecheap migration guide
├── README-ADMIN.md            # Admin/backend setup documentation
└── ARCHITECTURE.md            # This file
```

---

## 3. Content Architecture

### Content layer (`src/lib/content.ts`)
The `getMergedContent()` function is the single entry point for all public
content. It operates in two modes:

- **Full-stack mode**: reads from the database (Prisma), merging DB records
  over the `portfolio-data.ts` fallback. If a DB call fails, it falls back to
  the static content so the site never crashes.
- **Static export mode** (`NEXT_PUBLIC_STATIC_EXPORT=true`): returns pure
  `portfolio-data.ts` content with no database dependency. This allows GitHub
  Pages deployment.

### Content source (`src/lib/portfolio-data.ts`)
This file is the **seed** and **fallback** for all public content. It contains:
- Profile info (name, role, contact, social links, WhatsApp, CV path)
- Afrik-Vine company info (mission, vision, services, values, roadmap)
- All section copy (hero, about, expertise, AI evaluation, prompt engineering,
  web development, security, experience, projects, articles, contact)
- Image paths (profile, gallery, Afrik-Vine logo, WhatsApp QR)

The admin CMS can override any of these fields via the database. When the
database is empty or unavailable, the site uses this file directly.

### Strengthened Web Development (`src/lib/web-dev-content.ts`)
A dedicated file for the expanded web development section content, including:
methodology, engineering workflow, analytical approach, design philosophy,
UI/UX thinking, architecture mindset, development lifecycle, QA, performance
strategy, security mindset, maintainability, scalability, client consultation,
requirement analysis, solution recommendation, web development solutions, and
an honest technology stack audit.

---

## 4. Dual-Mode Deployment Architecture

### Mode 1 — Static Export (GitHub Pages)
- `next.config.ts` sets `output: "export"` when `STATIC_EXPORT=true`.
- `scripts/build-static.sh` temporarily moves server-only routes (API, admin,
  middleware) out of the source tree, builds, then restores them.
- Public pages use `portfolio-data.ts` (no DB).
- Chatbot loads FAQs from `/faqs.json` (client-side matching).
- Contact form uses `mailto:` fallback.
- Result: static HTML/CSS/JS in `./out/`.

### Mode 2 — Full-Stack (Namecheap/VPS)
- `next.config.ts` uses `output: "standalone"` (default).
- API routes, admin dashboard, middleware, Prisma all active.
- `getMergedContent()` reads from the database.
- Chatbot uses API routes for FAQ matching.
- Contact form saves to database + sends email notifications.
- Result: standalone Node.js server.

### Why this works without a rewrite
- `page.tsx` uses conditional `dynamic` (force-static vs force-dynamic).
- `content.ts` checks `NEXT_PUBLIC_STATIC_EXPORT` and returns fallback.
- `chatbot-widget.tsx` checks `IS_STATIC` and uses `/faqs.json` vs API.
- `contact.tsx` checks `NEXT_PUBLIC_STATIC_EXPORT` and uses `mailto:` vs API.
- The admin/API/middleware files are simply excluded from the static build.

---

## 5. Technology Stack (Honest Audit)

### Currently used in this portfolio project
| Technology | Role |
|---|---|
| HTML5 | Semantic page structure and accessibility foundation |
| CSS3 / Tailwind CSS 4 | Responsive styling, design system, premium visual presentation |
| JavaScript ES6+ / TypeScript | Type-safe client and server logic |
| React 19 | Component-based UI architecture |
| Next.js 16 (App Router) | Full-stack framework (static + server rendering) |
| Prisma ORM | Type-safe database access (SQLite dev) |
| NextAuth.js v4 | Admin authentication (full-stack mode) |
| bcryptjs | Password hashing |
| Framer Motion | Premium entrance animations and scroll reveals |
| shadcn/ui (New York) | Accessible component library |
| Sonner | Toast notifications |
| Git / GitHub | Version control and free static hosting (GitHub Pages) |
| GitHub Actions | Automated CI/CD for static deployment |

### Architecture supports for future expansion (not currently used)
| Technology | Role |
|---|---|
| PostgreSQL | Production database for full-stack deployment (Prisma schema ready) |
| Vercel Blob / Cloudinary / S3 | Durable file storage for production uploads |
| PWA (Service Worker / Manifest) | Progressive Web App capabilities |
| Resend / SMTP (Nodemailer) | Email notifications (configured, not required for GitHub Pages) |
| Cloudflare Turnstile | Optional CAPTCHA (configured, activates when env var set) |

### Intentionally excluded / not claimed
- **MongoDB** — not used. The project uses Prisma with SQLite/PostgreSQL.
- **Express.js** — not used. The project uses Next.js App Router API routes.
- **Paid cloud storage** — not required for GitHub Pages. Documented as a
  future option for production full-stack mode.
- **WordPress** — not used in this portfolio. Recommended as a client option
  for affordable self-managed business websites.

---

## 6. Future Extension Points

The architecture is designed to evolve without a rewrite:

### PWA (Progressive Web App)
- Add a `public/manifest.json` + service worker.
- Next.js 16 supports PWA out of the box with `next-pwa` or manual setup.
- The component architecture already separates concerns cleanly.

### Client Portal
- The admin auth system (NextAuth) can be extended with role-based access.
- Add an `/portal` route for client login + project tracking.
- The Prisma schema can be extended with `Client` and `ProjectAccess` models.

### Business Management Platform
- The admin dashboard structure (`/admin/*`) already has the CRUD patterns.
- Add new models (Invoices, Tasks, Appointments) following the existing pattern.
- The API route structure (`/api/admin/*`) is consistent and extensible.

### Mobile Applications
- The API routes are REST-style and can serve a React Native / Flutter app.
- The content layer (`/api/content`) already returns JSON.
- Authentication via NextAuth JWT tokens works with mobile clients.

### Adding Third-Party Integrations
- Email: `src/lib/email.ts` already supports Resend + SMTP.
- Storage: `src/lib/upload.ts` is isolated — swap the save function for any provider.
- Rate limiting: `src/lib/spam.ts` — swap in-memory for Upstash Redis when needed.
- Analytics: add Vercel Analytics or Google Analytics in `layout.tsx`.

---

## 7. Installation & Local Development

```bash
# Install dependencies
bun install

# Configure environment
cp .env.example .env
# Edit .env: set NEXTAUTH_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD_HASH

# Push database schema (SQLite dev)
bun run db:push

# Seed content (idempotent)
bun prisma db seed

# Start dev server
bun run dev  # → http://localhost:3000
```

---

## 8. Maintenance Recommendations

- **Content updates**: use the admin dashboard (`/admin`) in full-stack mode,
  or edit `portfolio-data.ts` for static mode.
- **CV replacement**: upload from `/admin/profile-media` (full-stack) or replace
  the file in `public/uploads/cv/` (static).
- **Dependency updates**: run `bun update` periodically; check for breaking
  changes in Next.js / Prisma / NextAuth.
- **Database backups**: if using SQLite, back up `db/custom.db`. If using
  PostgreSQL, use `pg_dump` or your provider's backup tool.
- **Security**: rotate `NEXTAUTH_SECRET` periodically; update admin password;
  keep dependencies patched.
- **Documentation**: keep `README-ADMIN.md`, `DEPLOYMENT.md`, and this file
  updated when the architecture changes.

---

## 9. Version Control Practices

- Commit messages: use clear, descriptive messages.
- Branch strategy: `main` for production; feature branches for development.
- Never commit `.env`, `db/*.db`, `node_modules/`, `.next/`, or `out/`.
- Use GitHub Actions for automated deployment (`.github/workflows/deploy.yml`).
- Tag releases for major milestones (e.g., `v1.0.0`).
