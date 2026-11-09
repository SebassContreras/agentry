---
name: agentry
description: >-
  Scaffolds agent contracts and playbooks for high-speed coding with zero friction: an AGENTS.md
  router, single-responsibility contracts (PRODUCT, ARCHITECTURE, ENGINEERING, DESIGN, TESTING,
  OPERATIONS), playbooks (plan, change, review, parallel) and a roadmap.
  Use when: "init agentry", "set up the agent contracts", "scaffold this project",
  "start a new project with agentry", "update agentry", "upgrade agentry".
---

# agentry

Run **inside the target repository**. This skill copies and fits the scaffold; apart from distributing an existing plan (below) it does not plan, change or review. Once it has run, the repository carries everything: `AGENTS.md` routes the agent to the contract or playbook that applies.

## Step 0 — Pick the mode

- No `AGENTS.md` and no `planning/` → **init**.
- An `AGENTS.md` whose first lines hold `> Owns:` is agentry's own → **update**.
- Any other `AGENTS.md`, or a `planning/` folder without agentry's `AGENTS.md`, belongs to the user → **adopt**: ask before touching anything, run init for every shipped file that is missing, and for the existing `AGENTS.md` propose only the hard rules and router rows it lacks, as a diff. Never replace its text.

Never overwrite silently.

## Init

1. **Ask once** (skip what the user already said):
   - Project name and goal in 1–2 sentences.
   - Language the user speaks, and the language of the product's own text if it has a UI or messages (it may differ from the language the user speaks).
   - Project kind: *software with a UI*, *software without a UI* (CLI, API, library), or *content* (docs, video, research).
   - Collaboration mode: *solo* (commit directly to the default branch) or *team* (branches and pull requests).
   - Planning lane: *repo* (local `planning/` folder, the default) or *tracker* (any external tool the user chooses: ask which one). For a tracker, ask where each row of the Planning table lives in that tool (spec, ID, order and next task, status, dependencies, evidence, ideas, claim, close) and how an agent reads and changes it. If the user does not know, propose a mapping for their tool and confirm it.
2. **Copy and adapt** from the `assets/` folder next to this `SKILL.md` (resolve it from the path this file was loaded from, however your host exposes it) with a file copy, not by retyping:

   | From `assets/` | To the repository |
   |---|---|
   | `contracts/AGENTS.md`, `PRODUCT.md`, `ARCHITECTURE.md`, `ENGINEERING.md`, `TESTING.md`, `OPERATIONS.md` | the root, same names |
   | `contracts/design-ui.md` or `design-interface.md` or `design-content.md` (by kind) | `DESIGN.md` |
   | `playbooks/*.md` | `.agents/playbooks/` |
   | `planning/roadmap.md` (**only if planning is `repo`**) | `planning/roadmap.md`, and create `planning/specs/` with an empty `.gitkeep` |

   > **Single-lane rule:** If the user selects `tracker`, **do not create the `planning/` directory**. The target repository must carry zero noise from the lane it did not choose.

   The router is `AGENTS.md`, but hosts differ in which instruction file they load on their own. Check how the agent running you loads project instructions (its documentation or settings). If it does not load `AGENTS.md` by itself, create the file it does load (for example `CLAUDE.md` or `GEMINI.md`) holding a single line that imports or points to `AGENTS.md` in the host's own syntax, or append that line to the file if it exists. Create nothing for hosts the user does not use.

3. **Fill the contracts for the chosen lane.** Replace `{{PROJECT_NAME}}` (in `AGENTS.md`) and `{{GOAL}}` (in `PRODUCT.md`).
   - Set `Collaboration` in `AGENTS.md`.
   - The lane lives in exactly one place: the `Planning lane` line and the **Planning table** in `AGENTS.md` (the playbooks only refer to its rows by name). Fill each cell with the single chosen lane and remove the marker syntax.
     - **If `repo`:** keep each cell's `repo:` text and drop its `tracker:` text.
     - **If `tracker`:** write each cell as the user said it lives in their tool, with the commands, tools or steps an agent needs, and drop the `repo:` text. Name the tool in the `Planning lane` line. Omit any mention of `planning/` or `roadmap.md`.
   - Every other placeholder that reads `<fill: …>`: answer it from the repository and the user's answers, including the Verify, Setup and Run commands in `TESTING.md` and `OPERATIONS.md` when a manifest or script shows them. Do not restate what a file listing would show. If the fact does not exist yet (an empty new repository), leave the placeholder untouched and report it: `AGENTS.md` tells the agent that first needs it to establish it. Keep `AGENTS.md` under 100 lines. Put the user's language in `AGENTS.md` (hard rule 3) and the product's language in `DESIGN.md`. Each fact lives in one contract only.

   For a project that is not software (video, writing, research), keep the same files and change what they hold: `ENGINEERING.md` holds production standards and drops code principles; `TESTING.md` holds the review checklist; `DESIGN.md` is the content variant.
4. **Report** the files created and the unfilled placeholders, and suggest the first commit as `chore: add agent contracts` (no trailers). Tell the user the next step is to ask the agent to plan the project; `AGENTS.md` routes that to `.agents/playbooks/plan.md`. Then offer the optional extras below as a question, not as something already installed. Stop there.

### Init with a plan that already exists

If the user already has a plan (in the conversation, a document or an issue), run init as above and ask only what the plan does not answer. Then **distribute the plan; never paste it into one contract**. Each fact goes to the one place that owns it:

| The plan says… | It goes to |
|---|---|
| why the project exists, who it serves, what it does now, product decisions | `PRODUCT.md` (present tense, no sequencing) |
| layers, boundaries, allowed dependencies, technical decisions | `ARCHITECTURE.md` |
| commands, environment, release and recovery steps | `OPERATIONS.md` |
| tools, naming, test framework, coverage rules | the "This project" section of `ENGINEERING.md` or `TESTING.md` |
| interface, tokens, copy or content rules | `DESIGN.md` |
| order, phases, dates, later ideas | the planning tracker, in the places the Planning table names (order, dependencies, ideas) |
| the first thin slice | one spec in the `plan.md` format; later specs only as entries in the order |

Write each decision with `Why:` and `Revisit if:` (and `Trade-off:` if it is hard to reverse). A sentence about order or a build detail inside `PRODUCT.md` is a misplaced fact: move it. After writing, commit the scaffold first, then the spec, and run `spec-review` on it; the plan is input, not the spec. Without the subagent, follow "Reviewing a spec" in `.agents/playbooks/review.md` in a clean context.

## Update

For each shipped file (contracts, playbooks, and any subagent copied to the host's subagent folder) compare it with the repository's copy and show a diff per file; apply only what the user approves. Compare after applying the repository's own answers: its chosen lane, filled placeholders and project text are never differences.

- A contract the repository has edited: propose only sections or rules it lacks. Never replace its text.
- The playbooks and subagents: replace only when the user approves the diff, then re-apply the chosen lane to the new text.
- A shipped file that is missing, or that the router in `AGENTS.md` sends to another place, was removed or moved on purpose (a project may drop the playbooks or keep its procedures elsewhere): never recreate it. Skip it and say so.

### Switching planning lanes, or tracker (`repo` ↔ `tracker`, or one tracker for another)

The lane lives only in the Planning table of `AGENTS.md`, so a switch is two jobs: rewrite that table for the new lane (ask where each row lives, as in Init step 1), and move the content to the places it names. Show the plan first and get the user's approval before deleting or closing anything.

- **From `repo` to a tracker:** create each open row's spec in the tracker (the spec file as the body, or the row's title as the goal if it has none), carry over its dependencies and order, and each `## Ideas` entry as an idea. Check what was created. Only then delete the `planning/` folder.
- **From a tracker to `repo`:** read the open work, scaffold `planning/roadmap.md` and `planning/specs/`; write a `todo` row (and a spec file for the next one) for each open spec, and a `## Ideas` line for each idea. Ask whether to close the items in the tracker.
- **From one tracker to another:** read the open work from the old one, recreate it in the new one as its table rows say, and ask what to do with the old items.

## Optional extras (suggest, never install by default)

Agentry ships no mandatory hooks or blocking linters. These instructions are host-neutral: wherever an extra needs a host-specific fact (where it keeps settings, subagents or hooks), use the convention of the agent running you and look it up in its documentation; never guess a key or a path. After scaffolding, ask the user which of these they want, if any:

- **Dead-code hygiene tool:** configure an on-demand command in `OPERATIONS.md` matching the stack (`knip` for TS/JS, `vulture` + `ruff` for Python, `cargo machete` for Rust).
- **Block risky git commands** (`--no-verify`, force-push the default branch, `git add .env`, AI attribution in commits): a light pre-commit hook, or the host's own pre-tool hook if it has one.
- **Keep secrets unread:** in the host's permission or deny settings (merge into the existing configuration, never overwrite it), deny reading `.env`, `.env.*`, `secrets/`, `*.pem`, `*.key` and `~/.ssh`. File-read rules usually do not cover the shell, so deny shell reads of the same files too (for example `cat .env`) or use the host's sandbox.
- **Subagents:** `agents/*.md` holds one host-neutral definition per agent. They are written once and **you adapt them to the host you are running in**: copy each one the user wants to the place where your host keeps subagents, and edit the copy into the format your host expects (look it up in its documentation; never guess a field). Keep the body as it is and map the frontmatter:
  - `capabilities` → the host's tools, granting exactly those and nothing more: `read` (read and search files), `edit-files` (change existing files), `write-files` (create files), `shell` (run commands; the body says which), `web` (search and fetch). If the host has no equivalent of a capability, keep the agent and follow its fallback line (without an edit tool, `spec-review` lists its fixes instead of applying them).
  - `tier` → one of the host's models: `fast` is its cheapest quick model, `standard` a mid-size one. `max-turns` → its turn or step limit, if it has one.
  - `isolation: worktree` → the host's own worktree isolation. If the host has none, do not install `spec-runner`: `parallel.md` has a manual path.
  - Where the host can enforce the shell limits the body states (a command allowlist or a sandbox), configure it; otherwise the body instruction is the only guard.

  The agents find a playbook through the router in `AGENTS.md`, never through a fixed path, because a project may keep its procedures elsewhere or have none.

  What each does:
  - `research` returns a fact sheet with sources, keeping web searches out of the main context. Skip it if the host ships its own research subagent.
  - `spec-review` and `diff-review` audit a spec or a diff against the contracts in a clean context. `diff-review` only reports. `spec-review` also fixes the spec file itself (and only that).
  - `contract-sync` audits the contracts and playbooks against each other and against the files they name (manifests, scripts, CI, docs), fixes mechanical drift in them only, and lists the decisions it cannot make. Run it after a pivot, a release or a long stretch of work.
  - `dead-code-check` runs the on-demand hygiene command from `OPERATIONS.md` only after dependency changes, replaced exports, deleted tests or pivots.
  - `diff-review`, `dead-code-check` and `research` are told never to write files; that is an instruction, not something their tools enforce.
  - `spec-runner` is the only agent that writes code: it implements every `[agent]` task of one reviewed spec in its own git worktree, commits per task and reports its branch and worktree path; it never pushes or merges. It needs `.agents/playbooks/parallel.md` to run several specs at once.
- **Model and effort defaults:** if the host lets a project pin a default model and a reasoning effort per model, offer a mid-size model with high effort for the main work and lower effort for the cheap models, using the host's documented settings keys. Never switch model or effort mid-session where the host caches the prompt: it breaks the cache. Leave paid fast modes off unless the user asks.
- **CI:** run the verify command from `TESTING.md` on every push.
