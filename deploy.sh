#!/usr/bin/env bash
# Deploy the Dolomites map to GitHub Pages.
# Run this from the folder containing index.html and README.md.
set -euo pipefail

REPO="boys-expedition-2026"
USER="lukexyz"

gh repo create "$USER/$REPO" --public \
  --description "Interactive master map — Dolomites, 18–23 Aug 2026" || true

git init -q
git add index.html README.md
git commit -qm "Dolomites 2026 master map"
git branch -M main
git remote add origin "https://github.com/$USER/$REPO.git" 2>/dev/null || \
  git remote set-url origin "https://github.com/$USER/$REPO.git"
git push -u origin main

# Turn on Pages from main / root
gh api -X POST "repos/$USER/$REPO/pages" \
  -f "source[branch]=main" -f "source[path]=/" 2>/dev/null || \
gh api -X PUT "repos/$USER/$REPO/pages" \
  -f "source[branch]=main" -f "source[path]=/"

echo
echo "Done. Live in ~1 min at: https://$USER.github.io/$REPO/"
