#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# Static export build for GitHub Pages.
#
# Supports BOTH project sites (owner.github.io/repo-name) and
# user/org sites (owner.github.io) with automatic basePath
# detection.
#
# Repository identity resolution order:
#   1. Explicit REPO_OWNER + REPO_NAME env vars (preferred, set
#      by the GitHub Actions workflow).
#   2. GITHUB_REPOSITORY env var (auto-provided by GitHub Actions
#      in the format "<owner>/<repo>") — used as a fallback.
#
# For a user/org site (repo name matches "<owner>.github.io",
# case-insensitive) the production base path MUST be empty so
# assets resolve at the domain root:
#     https://<owner>.github.io/_next/static/...
#
# For an ordinary project repo the base path is "/<repo-name>":
#     https://<owner>.github.io/<repo-name>/_next/static/...
#
# The script fails with a clear error if it cannot determine the
# repository owner and name.
# ============================================================

# ---- 1. Resolve REPO_OWNER and REPO_NAME ----
REPO_OWNER="${REPO_OWNER:-}"
REPO_NAME="${REPO_NAME:-}"

if [ -z "$REPO_OWNER" ] || [ -z "$REPO_NAME" ]; then
  # Fall back to GITHUB_REPOSITORY ("<owner>/<repo>"), which GitHub
  # Actions automatically sets for every run.
  if [ -n "${GITHUB_REPOSITORY:-}" ]; then
    GR_OWNER="${GITHUB_REPOSITORY%%/*}"
    GR_REPO="${GITHUB_REPOSITORY#*/}"
    [ -z "$REPO_OWNER" ] && REPO_OWNER="$GR_OWNER"
    [ -z "$REPO_NAME" ] && REPO_NAME="$GR_REPO"
  fi
fi

# ---- 2. Fail clearly if we still cannot determine the repo identity ----
if [ -z "$REPO_OWNER" ] || [ -z "$REPO_NAME" ]; then
  echo "❌ ERROR: cannot determine repository owner and/or name." >&2
  echo "   Set REPO_OWNER and REPO_NAME env vars, or run inside GitHub" >&2
  echo "   Actions where GITHUB_REPOSITORY is automatically provided." >&2
  echo "   Resolved: REPO_OWNER='${REPO_OWNER}', REPO_NAME='${REPO_NAME}'" >&2
  exit 1
fi

# ---- 3. Normalise for case-insensitive comparison ----
# GitHub usernames and repository names are case-insensitive. A user
# site named "VincentRitchie.github.io" must match owner "vincentritchie".
OWNER_LC="$(echo "$REPO_OWNER" | tr '[:upper:]' '[:lower:]')"
NAME_LC="$(echo "$REPO_NAME" | tr '[:upper:]' '[:lower:]')"
USER_SITE_REPO="${OWNER_LC}.github.io"

# ---- 4. Determine deployment type and base path ----
DEPLOYMENT_TYPE="project-site"
BASE_PATH="/${NAME_LC}"
if [ "$NAME_LC" = "$USER_SITE_REPO" ]; then
  # User/org site — served from the domain root.
  DEPLOYMENT_TYPE="user-site"
  BASE_PATH=""
fi

# Do NOT hardcode any owner-specific path anywhere. The value below
# is derived purely from the resolved repo identity.
echo "=== Static export build ==="
echo "REPO_OWNER: ${REPO_OWNER}"
echo "REPO_NAME: ${REPO_NAME}"
echo "USER_SITE_REPO (normalised): ${USER_SITE_REPO}"
echo "DEPLOYMENT_TYPE: ${DEPLOYMENT_TYPE}"
if [ -z "$BASE_PATH" ]; then
  echo "BASE_PATH: (empty, root deployment)"
else
  echo "BASE_PATH: ${BASE_PATH}"
fi

# Safety net: refuse to ever emit a base path that duplicates the user
# site repo name (e.g. "/vincentritchie.github.io") — that is exactly
# the defect this script is designed to prevent.
if [ -n "$BASE_PATH" ] && [ "$BASE_PATH" = "/${USER_SITE_REPO}" ]; then
  echo "❌ ERROR: resolved BASE_PATH '${BASE_PATH}' would duplicate the user-site repo name." >&2
  echo "   This is the known broken configuration. Refusing to build." >&2
  exit 1
fi

# ---- 4b. Punctuation audit: website-authored text must contain no em
# dashes (U+2014) or encoded equivalents. Runs BEFORE any files are moved
# so the full source tree is audited in its committed state. ----
echo "=== Punctuation audit (source): no em dashes in authored text ==="
python3 scripts/check-punctuation.py --src

# ---- 5. Temporarily move server-only routes so next build can export ----
TMP_DIR=$(mktemp -d)

restore_files() {
  echo "=== Restoring server-only routes ==="
  [ -d "$TMP_DIR/api" ] && mv "$TMP_DIR/api" src/app/api 2>/dev/null && echo "  restored src/app/api"
  [ -d "$TMP_DIR/admin" ] && mv "$TMP_DIR/admin" src/app/admin 2>/dev/null && echo "  restored src/app/admin"
  [ -f "$TMP_DIR/middleware.ts" ] && mv "$TMP_DIR/middleware.ts" src/middleware.ts 2>/dev/null && echo "  restored src/middleware.ts"
  [ -f "$TMP_DIR/page.tsx.bak" ] && mv "$TMP_DIR/page.tsx.bak" src/app/page.tsx 2>/dev/null && echo "  restored src/app/page.tsx"
  rm -rf "$TMP_DIR"
}
trap 'restore_files' EXIT ERR INT TERM

echo "=== Temporarily moving server-only routes ==="
[ -d src/app/api ] && mv src/app/api "$TMP_DIR/api" && echo "  moved src/app/api"
[ -d src/app/admin ] && mv src/app/admin "$TMP_DIR/admin" && echo "  moved src/app/admin"
[ -f src/middleware.ts ] && mv src/middleware.ts "$TMP_DIR/middleware.ts" && echo "  moved src/middleware.ts"

if [ -f src/app/page.tsx ]; then
  cp src/app/page.tsx "$TMP_DIR/page.tsx.bak"
  sed -i 's/export const dynamic = "force-dynamic"/export const dynamic = "force-static"/' src/app/page.tsx
  echo "  patched src/app/page.tsx (force-static for export)"
fi

# ---- 6. Run the static export build ----
export STATIC_EXPORT=true
export NEXT_PUBLIC_STATIC_EXPORT=true
export NEXT_PUBLIC_BASE_PATH="$BASE_PATH"

echo "=== Building static site (next build) ==="
npx next build

touch out/.nojekyll

# ---- 7. Punctuation audit on the exported site (rendered verification).
# Scans out/**/*.html and out/**/*.json so the published pages, not just
# the source, are guaranteed free of em dashes. ----
echo "=== Punctuation audit (exported site) ==="
python3 scripts/check-punctuation.py --out

# Privacy: never ship the CV PDF inside the public static output.
if [ -d out/uploads/cv ]; then
  rm -rf out/uploads/cv
  echo "  removed out/uploads/cv (privacy: Request CV flow stays server-side)"
fi

echo "=== Verify out/index.html exists ==="
ls -la out/index.html

echo "=== Static export complete ==="
