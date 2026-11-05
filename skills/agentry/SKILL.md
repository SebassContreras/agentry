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

1. **Ask once** (skip what the user already said): project name; the goal in one or two sentences; the language the user speaks; the language of the product's own text if it has a UI or messages (not the same as the language the user speaks); which agents they use (default Claude Code and Antigravity); and the kind of project: *software with a UI*, *software without a UI* (CLI, API, library), or *content* (docs, video, writing, research). Do not guess the kind: `DESIGN.md` depends on it.
2. **Copy** from `${CLAUDE_SKILL_DIR}/assets/` with a file copy, not by retyping:

   | From `assets/` | To the repository |
   |---|---|
   | `contracts/AGENTS.md`, `PRODUCT.md`, `ARCHITECTURE.md`, `ENGINEERING.md`, `TESTING.md`, `OPERATIONS.md` | the root, same names |
   | `contracts/design-ui.md` or `design-interface.md` or `design-content.md` (by kind) | `DESIGN.md` |
   | `planning/roadmap.md` | `planning/roadmap.md`, and create `planning/specs/` with an empty `.gitkeep` so git keeps the folder |
   | `playbooks/*.md` | `.agents/playbooks/` |

3. **Fill the contracts.** Replace `{{PROJECT_NAME}}` and `{{GOAL}}`. For each `<fill: …>` marker, read the repository first (manifests and scripts, lockfiles, CI, folders, the README, existing docs) and write only what the repository cannot show on its own. If you cannot know it yet, leave the marker: the plan playbook fills it. Do not invent. Keep `AGENTS.md` under 100 lines and put the user's language in its language rule (hard rule 3) and the product's language in `DESIGN.md`. Each fact lives in one contract only: if another contract already owns it (see the `Owns` line), link to it instead of repeating it.

   For a project that is not software (video, writing, research), keep the same files and change what they hold: `ENGINEERING.md` holds the production standards (tools, file naming, review steps) and drops the code principles that do not apply; `TESTING.md` holds the review checklist that says when a piece is done; `DESIGN.md` is the content variant.
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
