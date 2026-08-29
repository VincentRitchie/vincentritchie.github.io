# Obasiochie Vincent Chimaobi — Personal Portfolio

A premium, futuristic, dark-mode personal portfolio for **OBASIOCHIE VINCENT
CHIMAOBI** — AI Evaluation & Data Annotation Specialist based in Abuja, Nigeria.

Afrik-Vine Tech LTD is a supporting professional venture featured in its own
dedicated section, **not** the global website brand.

---

## Quick Start

```bash
bun install
cp .env.example .env        # Configure auth + email vars
bun run db:push             # Create the database (SQLite dev)
bun prisma db seed          # Seed content from portfolio-data.ts
bun run dev                 # → http://localhost:3000
```

Admin dashboard: `http://localhost:3000/admin/login`
Dev credentials: `admin@obasiochie.dev` / `changeme123` (see `.env`)

---

## Deployment

### Initial deployment — Free GitHub Pages (static)

The initial deployment target is **free GitHub Pages**. See
[`DEPLOYMENT.md`](./DEPLOYMENT.md) for the complete guide.

Quick version:
1. Push to GitHub.
2. Settings → Pages → Source: GitHub Actions.
3. The included workflow (`.github/workflows/deploy.yml`) builds and deploys
   automatically.

What works on GitHub Pages: all public pages, CV download, WhatsApp button,
FAQ chatbot (static), contact (mailto fallback).

What requires full-stack hosting: admin dashboard, database, email
notifications, file uploads, API routes.

### Future deployment — Namecheap (full-stack)

When backend features are needed, migrate to Namecheap (or any VPS). The
architecture is already ready — see `DEPLOYMENT.md` § "Mode 2".

---

## Documentation

| File | Purpose |
|---|---|
| [`DEPLOYMENT.md`](./DEPLOYMENT.md) | GitHub Pages + Namecheap migration guide |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | Project structure, tech stack, future extension |
| [`README-ADMIN.md`](./README-ADMIN.md) | Admin dashboard, auth, CMS, contact, support, chatbot setup |

---

## Technology Stack

**Currently used:** HTML5, CSS3/Tailwind CSS 4, TypeScript, React 19, Next.js 16
(App Router), Prisma ORM, NextAuth.js, Framer Motion, shadcn/ui, Git/GitHub,
GitHub Actions.

**Architecture supports for future:** PostgreSQL, Vercel Blob/Cloudinary/S3,
PWA, Resend/SMTP email, Cloudflare Turnstile.

**Not used (honestly documented):** MongoDB, Express.js, paid cloud storage
(not needed for GitHub Pages), WordPress (recommended as a client option only).

See `ARCHITECTURE.md` §5 for the full honest technology audit.

---

## Key Features

### Public site
- Premium dark neon-tech design (purple/violet/magenta/blue/silver)
- Animated hero name ("VINCENT CHIMAOBI") with gradient + glow effects
- 5-image showcase slider with lightbox
- Full portfolio sections: About, Expertise, AI Evaluation, Prompt Engineering,
  **Strengthened Web Development**, Security Research, Experience, Projects,
  Afrik-Vine Tech LTD, Articles, Contact
- FAQ chatbot with human support escalation (Assistant → Mr. Vincent CEO)
- WhatsApp QR code + button → `https://wa.me/message/BS2I4XH5NM3CH1`
- CV download (real PDF, admin-replaceable)
- Copy/screenshot discouragement (right-click block, image drag block, watermark)

### Admin dashboard (full-stack mode only)
- Protected `/admin` with NextAuth authentication
- Site settings, profile/media management, CV upload
- Afrik-Vine company info editing
- Projects, articles, skills, certifications, testimonials, achievements CRUD
- Contact message inbox (read/reply/delete)
- Support inquiry inbox (routing, escalation, assignment, status)
- Assistant management (add/edit/activate/deactivate, available/unavailable)
- Chatbot FAQ CRUD + unanswered question log
- Email notifications (Resend/SMTP, best-effort, non-blocking)

---

## Project Structure

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the full folder structure and
design rationale.

---

## Branding Rules

- **Primary brand:** OBASIOCHIE VINCENT CHIMAOBI (personal professional).
- **Primary visual identity:** professional profile photograph.
- **Supporting venture:** Afrik-Vine Tech LTD (in its own section only).
- **Afrik-Vine logo:** appears ONLY in the `#afrik-vine` section — never as
  the global header logo, favicon, or site brand.
- **Design inspiration:** premium futuristic dark interface with purple, violet,
  magenta, blue, silver, and white accents.

---

## License & Ownership

© OBASIOCHIE VINCENT CHIMAOBI. All rights reserved.
