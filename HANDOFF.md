# HANDOFF — AshLane-prototype

**Last updated: 2026-11-22 (America/New_York).**
**Repo:** `mhvnsnt/AshLane-prototype` (PUBLIC), default branch `main`.
**Purpose of this file:** any agent that picks up work here reads this FIRST, then the linked docs. It states what we've done, where we're at, and what we're working toward — so the owner can say "go to this repo, pick up the work" and you just know. Update this file in the same PR whenever the state changes (add, don't delete).

## 1. What this repo is

**RETIRED — reference only. Do not build on it.** README: "RETIRED PROTOTYPE — active development moved to mhvnsnt/AshLanev2. This repo is kept for reference only. Do not build on it." Repo description: "RETIRED prototype — active development moved to mhvnsnt/AshLanev2. Kept for reference only."

This was the original AshLane prototype. It was renamed to AshLane-prototype to avoid confusion with the active game. Reference material worth keeping was pulled into AshLanev2 (see `docs/prototype-imports/` there). Nothing was deleted from this repo.

What is in here: the original prototype (`src/`, `server/`, `public/`, `assets/`, `attachments/`, `artifacts/`, `screenshots/`, `shots/`, `tools/`, `migrations/`), `WHERE.md`, `README.md`, and the agent working docs (`AGENTS.md`, `WORKING-METHOD.md`). ~103 MB on disk. Created 2026-10-04. **Zero open PRs — the only repo in this batch with none.**

## 2. Where we're at

### DONE
- **Prototype built and retired (created 2026-10-04).** The original AshLane prototype, ~103 MB.
- **Retirement recorded.** README + description both state the retirement and point at AshLanev2. The rename (to avoid confusion with the active game) is done.
- **Reference material imported to AshLanev2.** Worth-keeping material was pulled into AshLanev2 (`docs/prototype-imports/` there). Nothing was deleted from this repo.
- **Anti-clobber laws merged (2026-10-17, PR #6).** The owner laws from the DXMMII 54k-file wipe, merged to main.
- **Working method statement (2026-10-27).** "Add working method statement" — the last commit on main.

### IN PROGRESS
- **Nothing.** Zero open PRs, zero open work. This repo is done in the sense that matters: retired, preserved, pointed at its successor.

### BLOCKED
- **Nothing is blocked — the repo is retired.** The only thing that could go wrong here is someone building on it by mistake. This HANDOFF.md exists so that doesn't happen.

## 3. What we're working toward

**The goal: keep AshLane-prototype exactly as it is — a preserved reference for the original AshLane prototype.** It is not a live line, not a backup to restore from, not a place to land new work. Its successor is `mhvnsnt/AshLanev2` (~2 GB, active), and the owner record notes that Realist's model comes from Ash Lane — so this prototype's contents may still be referenced, but they are referenced, not built on.

**The bar for done here:** this HANDOFF.md landed, the README's retirement notice still true, and nothing deleted, overwritten, or added. If anyone ever needs something from the prototype, it gets pulled into AshLanev2 the way the earlier imports were — not built here.

## 4. Standing rules that apply here

- **Branch → PR → merge, always.** Never push to main directly. Add-only, zero-conflict PRs, no force pushes. (This applies even to a retired repo — especially to a retired repo.)
- **Do not build on this repo.** The README says so. New work goes to `mhvnsnt/AshLanev2`.
- **Checkpoint-and-save law:** CHECKPOINT.md first, update after every step; the repo is the save; resume, never restart.
- **No-temp-storage law:** nothing in /tmp or any wipeable location, ever. Everything goes straight into the repo or a durable folder the second it exists.
- **Real-source-only:** every part comes from the actual source code and files, wired up fully. No hand-tooled lookalikes, no fake panels.
- **Never delete game files.** Game files (ISOs, ROMs, game archives, teardown source) are never auto-deleted. They come off local disk only after 100% hash/size-verified storage on GitHub OR TeraBox, retrievability proven, and the deletion logged. Nothing was deleted from this repo during retirement, and nothing gets deleted now.
- **No-gaps / solve-it law:** a gap or block is never the end of the work — route-switch until it's done or every reasonable route is exhausted with exact errors recorded.
- **Never kill in-progress work.** Never delete another lane's work without the standing verification rules.
- **Anti-clobber laws apply here** (merged PR #6, 2026-10-17) — they exist because a 54k-file wipe happened once. Read them in `docs/` before touching anything bulk.

## 5. Key files and paths

| What | Where |
|---|---|
| README (retirement notice) | `README.md` |
| Where things are | `WHERE.md` |
| Prototype source | `src/` |
| Server | `server/` |
| Assets / shots | `assets/`, `attachments/`, `artifacts/`, `screenshots/`, `shots/` |
| Agent working docs | `AGENTS.md`, `WORKING-METHOD.md` |
| Docs (incl. owner laws) | `docs/` |
| App config | `package.json`, `vite.config.ts`, `tsconfig.json`, `vercel.json` |
| The active game | `mhvnsnt/AshLanev2` (reference imports in `docs/prototype-imports/` there) |
| Open work | None — zero open PRs |

## 6. Open decisions needing the owner

- **None.** The retirement is decided, recorded, and complete. The only question that could ever arise is whether something else from the prototype needs importing into AshLanev2 — and that is a question for the AshLanev2 lane, not this repo.

## 7. How to pick up

1. Read this HANDOFF.md first, then `README.md` — it tells you this repo is retired.
2. Do not build here. If you need something from the prototype, go to `mhvnsnt/AshLanev2` and check `docs/prototype-imports/` — if it isn't there, the import happens on the AshLanev2 side.
3. There are no open PRs. There is no next step except keeping this file current.
4. Land work branch → PR → merge, add-only — if any work ever lands here, it is docs-only.
5. Update this HANDOFF.md in the same PR when the state changes. Verify with your own eyes before claiming anything done.
