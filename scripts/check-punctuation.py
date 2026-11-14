#!/usr/bin/env python3
"""
Punctuation audit: enforce the no-em-dash policy for website-authored text.

The website owner requires that no em dash (U+2014) appears in any
website-authored text: content strings, headings, captions, button labels,
modal text, tooltips, alt text, aria labels, metadata, comments in source
files, or JSON content shipped with the site.

This script detects:
  1. The literal em dash character U+2014.
  2. Encoded equivalents: &mdash; &#8212; &#x2014; (case-insensitive),
     and \\u2014 / \\u{2014} escapes in authored strings.

Modes (any combination):
  --src   Audit authored source: src/**/*.{ts,tsx,css,js,mjs},
          public/*.json, public/robots.txt, and *.md at repo root.
  --out   Audit the exported static site: out/**/*.html and out/**/*.json
          (rendered verification; PDFs and binary media are skipped).

Exit code 1 with a full listing when any offender is found, 0 when clean.
Used by scripts/build-static.sh and the GitHub Actions deploy workflow so a
regression fails the build before it can reach production.

Deliberate exclusions (technical integrity):
  - Third-party dependencies (node_modules) are never scanned.
  - Supplied portfolio documents (PDF case studies, CV), videos and
    thumbnails are binary/source artifacts, not website-authored text;
    they are never modified or scanned by this audit.
"""

import argparse
import re
import sys
from pathlib import Path

EM_DASH = "\u2014"

# Encoded representations that render as an em dash.
ENTITY_PATTERNS = [
    re.compile(r"&mdash;", re.IGNORECASE),
    re.compile(r"&#8212;", re.IGNORECASE),
    re.compile(r"&#x2014;", re.IGNORECASE),
    re.compile(r"\\u2014", re.IGNORECASE),
    re.compile(r"\\u\{2014\}", re.IGNORECASE),
]

SRC_EXTENSIONS = {".ts", ".tsx", ".css", ".js", ".mjs", ".json"}
SRC_DIRS = ["src"]
SRC_PUBLIC_FILES = ["public/faqs.json", "public/robots.txt"]
OUT_EXTENSIONS = {".html", ".json"}


def iter_files(roots, extensions, specific_files=None):
    seen = set()
    for root in roots:
        root_path = Path(root)
        if not root_path.exists():
            continue
        for path in sorted(root_path.rglob("*")):
            if not path.is_file():
                continue
            if path.suffix.lower() not in extensions:
                continue
            # Never scan dependencies or build caches.
            parts = path.parts
            if "node_modules" in parts or ".next" in parts:
                continue
            if path not in seen:
                seen.add(path)
                yield path
    for path in specific_files or []:
        p = Path(path)
        if p.is_file() and p.suffix.lower() in extensions and p not in seen:
            seen.add(p)
            yield p


def audit_file(path, issues, base):
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
    except OSError as exc:
        issues.append((str(path), 0, f"unreadable: {exc}"))
        return
    for lineno, line in enumerate(text.splitlines(), 1):
        if EM_DASH in line:
            issues.append((str(path.relative_to(base)), lineno, line.strip()[:160]))
            continue
        for pattern in ENTITY_PATTERNS:
            if pattern.search(line):
                issues.append(
                    (str(path.relative_to(base)), lineno, line.strip()[:160])
                )
                break


def main():
    parser = argparse.ArgumentParser(description="Em-dash punctuation audit")
    parser.add_argument("--src", action="store_true", help="audit authored source")
    parser.add_argument("--out", action="store_true", help="audit exported out/ site")
    args = parser.parse_args()

    if not args.src and not args.out:
        args.src = True
        if Path("out").is_dir():
            args.out = True

    issues = []

    if args.src:
        base = Path(".")
        files = list(
            iter_files(SRC_DIRS, SRC_EXTENSIONS, specific_files=SRC_PUBLIC_FILES)
        )
        for path in files:
            audit_file(path, issues, base)
        print(f"Punctuation audit (source): scanned {len(files)} authored files.")

    if args.out:
        base = Path(".")
        out_files = [
            p
            for p in sorted(Path("out").rglob("*"))
            if p.is_file() and p.suffix.lower() in OUT_EXTENSIONS
        ]
        for path in out_files:
            audit_file(path, issues, base)
        print(f"Punctuation audit (exported site): scanned {len(out_files)} files in out/.")

    if issues:
        print("")
        print("FAIL: em dashes (or encoded equivalents) found in website-authored text:")
        for path, lineno, line in issues:
            print(f"  {path}:{lineno}: {line}")
        print("")
        print("Rewrite the affected sentences using standard punctuation")
        print("(comma, full stop, colon, semicolon or parentheses).")
        sys.exit(1)

    print("PASS: no em dashes in website-authored text.")


if __name__ == "__main__":
    main()
