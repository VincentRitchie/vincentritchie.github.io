# Deployment Guide — Obasiochie Vincent Chimaobi Portfolio

This project supports **two deployment modes**. The initial deployment target is
**free GitHub Pages** (static). The architecture is ready to migrate to
**Namecheap** (or any full-stack host) when backend features are needed.

---

## Mode 1 — Free Public Static Portfolio (GitHub Pages)

### What works on GitHub Pages
- All public portfolio pages (hero, about, expertise, AI evaluation, prompt
  engineering, **strengthened web development section**, security, experience,
  projects, Afrik-Vine, articles, contact)
- Premium animations, image slider, and responsive design
- Profile photo, gallery images, Afrik-Vine logo, WhatsApp QR
- **CV download** (static PDF file)
- **WhatsApp button + QR code** → opens `https://wa.me/message/BS2I4XH5NM3CH1`
- **FAQ chatbot** (loads from static `/faqs.json`, client-side matching)
- **Contact fallback** (mailto: link opens the visitor's email client with a
  pre-filled message to `vincentchimaobi.ai@gmail.com`)

### What does NOT work on GitHub Pages
GitHub Pages is static hosting — it cannot run a server. These features require
full-stack hosting (Mode 2):
- Admin dashboard (`/admin/*`)
- Admin login / authentication
- Contact/support form saving to database
- Support inbox, assistant management, chatbot FAQ CRUD
- API routes (`/api/*`)
- Email notifications
- File uploads at runtime
- Prisma database

These features are **not removed** — they are simply not included in the static
build. The full codebase remains intact for future full-stack deployment.

### How to deploy to GitHub Pages

#### Prerequisites
- A GitHub account
- The project pushed to a GitHub repository
- `bun` installed locally (for building) OR use GitHub Actions (recommended)

#### Option A — GitHub Actions (recommended, fully automated)

1. Push the project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. Go to your repository on GitHub → **Settings** → **Pages**.

3. Under **Build and deployment**, set **Source** to **GitHub Actions**.

4. The included workflow (`.github/workflows/deploy.yml`) will automatically:
   - Build the static site on every push to `main`
   - Deploy it to GitHub Pages
   - Set the correct `basePath` based on your repository name

5. Wait ~2 minutes for the action to complete, then visit:
   - `https://YOUR_USERNAME.github.io/YOUR_REPO/` (project site)
   - Or `https://YOUR_USERNAME.github.io/` (if using `username.github.io` repo)

#### Option B — Manual local build

1. Build the static site:
   ```bash
   # For a project site (username.github.io/repo-name):
   REPO_NAME=your-repo-name bash scripts/build-static.sh

   # For a user/org site (username.github.io):
   bash scripts/build-static.sh
   ```

2. The static output is in `./out/`.

3. Deploy using `gh-pages` or by pushing `out/` to a `gh-pages` branch:
   ```bash
   npx gh-pages -d out
   ```

### How the static build works

The `scripts/build-static.sh` script:
1. Temporarily moves `src/app/api/`, `src/app/admin/`, and `src/middleware.ts`
   out of the source tree (these require a server).
2. Sets `STATIC_EXPORT=true` and `NEXT_PUBLIC_BASE_PATH=/your-repo-name`.
3. Runs `bun run build` with `output: "export"` in `next.config.ts`.
4. The public pages use `portfolio-data.ts` as the content source (no DB).
5. The chatbot loads FAQs from `/faqs.json` and does client-side matching.
6. The contact form uses a `mailto:` fallback instead of the API.
7. Restores the moved files so the full-stack codebase is intact.

### How to update content in the static version

Edit `src/lib/portfolio-data.ts` (the content source for static mode), then
rebuild and redeploy:
```bash
git add src/lib/portfolio-data.ts
git commit -m "Update content"
git push  # GitHub Actions will rebuild automatically
```

### How to replace the CV in the static version

1. Place your CV PDF in `public/uploads/cv/`.
2. Update the path in `src/lib/portfolio-data.ts`:
   ```ts
   profile: {
     // ...
     cvPath: "/uploads/cv/Obasiochie_Vincent_Chimaobi_Resume.pdf",
   }
   ```
3. Commit and push — GitHub Actions rebuilds automatically.

### basePath handling

If your site is at `username.github.io/repo-name`, the build script
automatically sets `NEXT_PUBLIC_BASE_PATH=/repo-name` so all links, images,
and assets resolve correctly under the repository subpath.

If your site is at `username.github.io` (user/org site), leave `REPO_NAME`
empty — no basePath is needed.

---

## Mode 2 — Future Full-Stack Professional (Namecheap)

### When to migrate
Migrate to Namecheap (or another full-stack host) when you need:
- Admin dashboard with login
- Contact form saving to a database
- Support inbox, assistant management, chatbot FAQ CRUD
- Email notifications
- Runtime file uploads (CV, images)
- A custom domain (e.g., `obasiochie.dev`)

### Why Namecheap
Namecheap offers the best balance of affordability, reliability, long-term
value, and ease of management for this project. It provides:
- Affordable shared hosting or VPS plans
- Free SSL certificates
- Node.js support (on VPS plans)
- Domain registration + hosting in one place
- cPanel/terminal access for easy management

### How to migrate

1. **Choose a Namecheap plan:**
   - Shared hosting (easiest, most affordable — supports Node.js via Passenger)
   - VPS (more control, supports any Node.js setup)

2. **Switch the database to PostgreSQL:**
   - In `prisma/schema.prisma`, change `provider = "sqlite"` to
     `provider = "postgresql"`.
   - Set `DATABASE_URL` to your Postgres connection string.
   - Run `bun run db:migrate` + `bun prisma db seed`.

3. **Configure environment variables** (in Namecheap's control panel or `.env`):
   ```
   DATABASE_URL=postgresql://...
   NEXTAUTH_SECRET=<your secret>
   NEXTAUTH_URL=https://yourdomain.com
   ADMIN_EMAIL=you@yourdomain.com
   ADMIN_PASSWORD_HASH=<bcrypt hash>
   CONTACT_NOTIFICATION_EMAIL=you@yourdomain.com
   RESEND_API_KEY=... (or SMTP_*)
   ```

4. **Build and deploy:**
   - Do NOT set `STATIC_EXPORT=true` — the default mode is full-stack.
   - `bun run build` produces a standalone server in `.next/standalone/`.
   - Run the server: `bun .next/standalone/server.js` (or use PM2/systemd).

5. **For file uploads:** Local `public/uploads/` works on a VPS. For shared
   hosting, consider Vercel Blob or Cloudinary (documented in README-ADMIN.md).

### What activates in full-stack mode
- Admin dashboard at `/admin` (login, site settings, projects, articles, etc.)
- Contact form saves to database + sends email notifications
- Support inbox, assistant management, chatbot FAQ CRUD
- API routes for all content management
- Middleware-protected admin routes
- NextAuth authentication

---

## Free-first deployment recommendation

**Start with GitHub Pages (Mode 1).** It is free, reliable, and showcases the
full public portfolio with the FAQ chatbot, CV download, and WhatsApp contact.
When the business needs backend features (admin management, database-driven
content, email notifications), migrate to Namecheap (Mode 2) — the architecture
is already ready for it.

No content, design, or code is lost in the migration. The same codebase simply
switches from static export mode to full-stack mode.
