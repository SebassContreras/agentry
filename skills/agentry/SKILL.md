---
name: agentry
description: >-
  Scaffolds agent contracts and playbooks for high-speed coding with zero friction: an AGENTS.md
  router, single-responsibility contracts (PRODUCT, ARCHITECTURE, ENGINEERING, DESIGN, TESTING,
  OPERATIONS), playbooks (plan, change, review) and a roadmap.
  Use when: "init agentry", "set up the agent contracts", "scaffold this project",
  "start a new project with agentry", "update agentry", "upgrade agentry".
---

# agentry

Run **inside the target repository**. This skill copies and fits the scaffold; it does not plan, change or review. Once it has run, the repository carries everything: `AGENTS.md` routes the agent to the contract or playbook that applies.

## Step 0 — Pick the mode

- No `AGENTS.md` and no `planning/` → **init**.
- Either one exists → **update**. Never overwrite silently.

## Init

1. **Ask once** (skip what the user already said):
   - Project name and goal in 1–2 sentences.
   - Language the user speaks, and the language of the product's own text if it has a UI or messages (not the same as the language the user speaks).
   - Project kind: *software with a UI*, *software without a UI* (CLI, API, library), or *content* (docs, video, research).
   - Collaboration mode: *solo* (commit directly to main) or *team* (branches and pull requests).
   - Planning location: *repo* (local `planning/` folder) or *github* (GitHub Issues).
2. **Copy** from `${CLAUDE_SKILL_DIR}/assets/` with a file copy, not by retyping:

   | From `assets/` | To the repository |
   |---|---|
   | `contracts/AGENTS.md`, `PRODUCT.md`, `ARCHITECTURE.md`, `ENGINEERING.md`, `TESTING.md`, `OPERATIONS.md` | the root, same names |
   | `contracts/design-ui.md` or `design-interface.md` or `design-content.md` (by kind) | `DESIGN.md` |
   | `playbooks/*.md` | `.agents/playbooks/` |
   | `planning/roadmap.md` (only if planning is `repo`) | `planning/roadmap.md`, and create `planning/specs/` with an empty `.gitkeep` |

3. **Fill the contracts.** Replace `{{PROJECT_NAME}}` and `{{GOAL}}`. Set `Collaboration` and `Planning` in `AGENTS.md`. For each `<fill: …>` marker, read the repository first (manifests and scripts, lockfiles, CI, folders, the README, existing docs) and write only what the repository cannot show on its own. Keep `AGENTS.md` under 100 lines. Put the user's language in `AGENTS.md` (hard rule 3) and the product's language in `DESIGN.md`. Each fact lives in one contract only.

   For a project that is not software (video, writing, research), keep the same files and change what they hold: `ENGINEERING.md` holds production standards and drops code principles; `TESTING.md` holds the review checklist; `DESIGN.md` is the content variant.
4. **Report** the files created and the unfilled markers, and suggest the first commit as `chore: add agent contracts` (no trailers). Tell the user the next step is to ask the agent to plan the project; `AGENTS.md` routes that to `.agents/playbooks/plan.md`. Then offer the optional extras below as a question, not as something already installed. Stop there.

## Update

For each shipped file (contracts, playbooks) compare it with the repository's copy and show a diff per file; apply only what the user approves.

- A contract the repository has edited: propose only sections or rules it lacks. Never replace its text.
- The playbooks: replace only when the user approves the diff.

## Optional extras (suggest, never install by default)

Agentry ships no mandatory hooks or blocking linters. After scaffolding, ask the user which of these they want, if any:

- **Dead-code hygiene tool:** configure an on-demand command in `OPERATIONS.md` matching the stack (`knip` for TS/JS, `vulture` + `ruff` for Python, `cargo machete` for Rust).
- **Block risky git commands** (`--no-verify`, force-push `main`, `git add .env`, AI attribution in commits): a light pre-commit or `PreToolUse` hook.
- **Keep secrets unread:** `permissions.deny` in `.claude/settings.json` for `.env`, `secrets/` and key files.
- **CI:** run the verify command from `TESTING.md` on every push.
