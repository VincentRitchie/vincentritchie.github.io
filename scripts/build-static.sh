#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# Static export build for GitHub Pages.
# Supports BOTH project sites (username.github.io/repo-name) and
# user/org sites (username.github.io) with automatic basePath detection.
# ============================================================

REPO_NAME="${REPO_NAME:-}"
REPO_OWNER="${REPO_OWNER:-}"

# Determine if this is a user/org site (username.github.io).
# If so, BASE_PATH must be empty (served from root).
USER_SITE_REPO=""
if [ -n "$REPO_OWNER" ]; then
  USER_SITE_REPO="$(echo "$REPO_OWNER" | tr '[:upper:]' '[:lower:]').github.io"
fi

BASE_PATH=""
if [ -n "$REPO_NAME" ] && [ "$REPO_NAME" != "$USER_SITE_REPO" ]; then
  # Ordinary project repo — use /repo-name as basePath.
  BASE_PATH="/$REPO_NAME"
fi
# If REPO_NAME == USER_SITE_REPO (e.g. "vincentritchie.github.io"), BASE_PATH stays "".

echo "=== Static export build ==="
echo "REPO_NAME: ${REPO_NAME:-(none)}"
echo "REPO_OWNER: ${REPO_OWNER:-(none)}"
echo "USER_SITE_REPO: ${USER_SITE_REPO:-(none)}"
echo "BASE_PATH: ${BASE_PATH:-(empty — root deployment)}"

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
  echo "  patched src/app/page.tsx"
fi

export STATIC_EXPORT=true
export NEXT_PUBLIC_STATIC_EXPORT=true
export NEXT_PUBLIC_BASE_PATH="$BASE_PATH"

echo "=== Building static site ==="
npx next build

touch out/.nojekyll

if [ -d out/uploads/cv ]; then
  rm -rf out/uploads/cv
  echo "  removed CV from static output (privacy)"
fi

echo "=== Verify out/index.html exists ==="
ls -la out/index.html

echo "=== Static export complete ==="
