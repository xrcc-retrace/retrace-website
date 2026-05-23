# Retrace — investor landing site

Public single-page marketing site for [Retrace](https://retracelab.com) — an AI coaching system for industrial field technicians.

Built for the XRCC Berlin 2026 hackathon. **Production:** https://retracelab.com.

For project context (stack, design tokens, anti-deck design principles, positioning rules) see [`CLAUDE.md`](./CLAUDE.md).

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Requires Node ≥ 20.

---

## How we ship

**Rule:** the `main` branch is production. Nobody pushes to it directly. Every change reaches `main` through a PR from `develop`.

```
feature-branch ──PR──> develop ──PR(CI-gated)──> main
                          │                         │
                          ▼                         ▼
                  preview *.vercel.app        retracelab.com
```

### Day-to-day workflow

1. **Branch off `develop`** for any change:
   ```bash
   git checkout develop && git pull
   git checkout -b feat/whatever
   ```
2. **Open a PR into `develop`**. CI runs `next build`. Vercel posts a preview URL to the PR.
3. **Merge into `develop`** when CI is green. Preview at `develop-…vercel.app` updates automatically.
4. **When `develop` is shippable**, open a PR from `develop` → `main`. Two status checks run: `build` and `enforce-main-source`.
5. **Merge to main** → Vercel auto-deploys to `https://retracelab.com` within ~60s.

### What you cannot do

- ❌ Push directly to `main` (blocked by branch protection — even for admins).
- ❌ Open a PR to `main` from a feature branch (the `enforce-main-source` check rejects it).
- ❌ Force-push or delete `main`.

If you need to bypass — don't. Open a PR through `develop`.

### Automatic: develop re-syncs to main after every release

Every time `main` updates, a GitHub Action (`.github/workflows/sync-develop.yml`) force-resets `develop` to match. You'll see `develop` jump backward to main's SHA within ~30s of any merge to main.

**Practical effect:** after a release, `git pull` on develop will say "diverged" — that's expected. Run:

```bash
git fetch origin
git checkout develop
git reset --hard origin/develop    # accept the auto-sync
```

(Or just throw away your local develop and re-branch off `origin/develop` for your next feature — easier.)

Feature branches you'd already pushed are untouched. The auto-sync only rewrites the develop branch ref, never your branch.

---

## Deployments

- **Production** (`main`) → https://retracelab.com (Vercel-hosted, custom domain on GoDaddy DNS).
- **Preview** (every branch + PR) → unique `*.vercel.app` URL posted to each PR.
- **Local dev** → `npm run dev` on http://localhost:3000.

---

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · Framer Motion 12 · Inter + Geist Mono. See [`CLAUDE.md`](./CLAUDE.md) for the full layout and design-system reference.
