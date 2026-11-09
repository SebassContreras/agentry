# agentry

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Tests: node:test](https://img.shields.io/badge/tests-node%3Atest-green.svg)](tests/)
[![Standard: agentskills.io](https://img.shields.io/badge/agent-skills-purple.svg)](skills/agentry/)

> **Pragmatic agent contracts and playbooks for high-speed coding with zero friction.**  
> Keep AI coding agents (Claude Code, Antigravity, Cursor) disciplined without slowing you down.

---

## The Problem with Agent Governance Today

Most spec-driven frameworks and agent guardrails fail in real-world software development because of **over-ceremony and wrong assumptions**:

1. **The Over-Ceremony Trap**: Forcing multi-file specs, branches, and approvals for trivial 1-line changes multiplies development time tenfold. Developers end up bypassing or disabling the tool.
2. **The Sycophancy Problem**: LLMs are structurally biased to please. When a rule or instruction forces a poor architectural choice, the agent doesn't object—it dutifully builds convoluted workarounds and shims.
3. **Dead-Code Drift after Pivots**: Agents constantly add code and rarely delete. When an approach changes mid-feature, dead functions, orphaned exports, and obsolete dependencies pile up silently.
4. **The Per-Turn Linter Tax**: Running heavy dead-code detectors or end-to-end suites on every single prompt or tool call burns tokens, introduces latency, and breaks developer flow.

---

## The Agentry Solution: 5 Core Pillars

`agentry` replaces heavy runtime daemons and speculative prompts with **lightweight, deterministic governance**:

### 1. Event-Driven Code Hygiene (No Per-Turn Linter Lag)
Linters and dead-code checks do not run on every keystroke. Routine forward additions run at **100% unconstrained speed**. The agent awakens orphan checks **only** when triggered by actions that actually produce dead code:
- Dependency additions, removals, or replacements in manifests.
- Replacing or modifying exported functions/modules with existing consumers.
- Deleting or disabling existing tests.
- Explicit pivot or migration prompts.

### 2. Ceremony Scaled by Risk
Not all tasks carry equal risk. Ceremony scales strictly by the blast radius:
- **Level 0 (Small):** Fits in one sentence and touches no recorded decision. Implement directly, run the affected test, and commit per collaboration mode. Zero spec overhead.
- **Level 1 (Feature):** Multi-task or multi-session feature. Thin spec (<80 lines), executed task by task, and **deleted upon completion** so specs never accumulate as debt.
- **Level 2 (Change of Direction):** Contradicts an earlier decision or requires an architectural pivot. Applies **"Delete first"**, discard-and-redo on a disposable branch, and a clean-context review.

### 3. Workaround Signals as Binary Stop Conditions
To eliminate sycophantic obedience, `agentry` defines **objective, observable code anti-patterns**. If fulfilling an instruction forces the agent to introduce:
- Artificial shims or wrappers to bypass constraints.
- Duplicated code to avoid touching an existing module.
- Ad-hoc special-case conditional branches (`if (id === 'special')`).
- Silenced exceptions (`catch (e) {}` with no handling).
- Suppressed linters or skipped tests.

The agent is contractually bound to **STOP immediately and report the design conflict** before writing code.

### 4. Single-Lane Scaffolding (Zero Context Pollution)
Agentry understands multiple workflows (offline local markdown vs. GitHub Issues), but **your target repository receives only the single lane you choose**:
- **Repo Mode:** Creates `planning/roadmap.md` and `planning/specs/`. Contracts and playbooks contain zero mention of GitHub.
- **GitHub Mode:** Creates **no `planning/` directory**. Contracts instruct the agent directly with `gh issue list`, `gh issue create`, and `Closes #N`.
- The agent never gets confused by hypothetical `if/else` options in its instructions: the contracts and playbooks carry only the lane you chose (the optional subagents understand both).

### 5. Production-Ready Engineering & Testing Standards
- **No Type Evasion:** Explicitly forbids `any` or unchecked type casts (`as unknown as T`) to silence compiler warnings.
- **Fail Fast & Loud:** No swallowing errors or returning ambiguous fallbacks (`null`, `[]`) that hide broken invariants.
- **Prefer Proven Primitives:** Forbids hand-rolling 400-line custom widgets or utilities when standard ecosystem primitives (Radix, TanStack) exist.
- **Branch Coverage over Vanity Tests:** Forbids duplicate happy-path tests; mandates covering all 4 partitions (Nominal, Boundaries, Sad Path, Fault Propagation) via compact parameterized tables (`test.each`).
- **Clean Module Layout:** Enforces placing test files in dedicated `src/<module>/test/` subdirectories rather than cluttering module roots.

---

## What it Scaffolds

```text
├── AGENTS.md                  # Traffic router, hard safety rules, and workflow configuration
├── (CLAUDE.md, GEMINI.md…)    # Only if your agent does not load AGENTS.md by itself: one line pointing to it
├── PRODUCT.md                 # Vision, users, capabilities (present tense), and decisions (Why/Revisit if)
├── ARCHITECTURE.md            # Layers, boundaries, invariants, and allowed ## Dependencies
├── ENGINEERING.md             # 12 core principles, workaround stop signals, and event-driven hygiene
├── DESIGN.md                  # By project kind: UI tokens, states and accessibility | CLI/API surface and errors | content voice and structure
├── TESTING.md                 # Fast verify commands, branch coverage, 4 partitions, and test placement
├── OPERATIONS.md              # Setup, run, build, environment variables, and on-demand hygiene recipes
├── .agents/playbooks/
│   ├── plan.md                # Thin-slice feature planning (<80 lines per spec, deleted on completion)
│   ├── change.md              # Discard-and-redo, delete-first on pivots, and orphan sweeps
│   ├── review.md              # Clean-context checklists: spec review (may fix the spec) and diff review (reports only)
│   └── parallel.md            # Run several reviewed specs at once, one git worktree each, merged one at a time
└── planning/                  # (Only in 'repo' mode)
    └── roadmap.md             # Living queue of active work; `done` rows stay only as the ID register
```

Optional subagents, offered as a question and never installed by default. The skill ships one host-neutral definition per agent in `skills/agentry/assets/agents/`, and **the agent running the skill adapts each one to its own host** (its subagent folder and frontmatter format): `capabilities` become the host's tools, `tier` one of its models, `isolation: worktree` its worktree isolation.

```text
agents/
├── research.md            # fast: external facts as a fact sheet with sources
├── spec-review.md         # standard: audits a spec against the contracts and fixes the spec itself (lists the fixes if it cannot edit)
├── diff-review.md         # standard: audits a diff (read-only git)
├── dead-code-check.md     # fast: runs the OPERATIONS.md hygiene command
├── contract-sync.md       # standard: finds contradictions and drift between the contracts, playbooks and the files they name, and realigns them
└── spec-runner.md         # standard: implements every [agent] task of one reviewed spec in an isolated worktree
```

A host with no worktree isolation skips `spec-runner` and uses the manual worktree path in `parallel.md`; a host with its own research subagent skips `research`.

### Several specs at once

Review a spec, commit it, and repeat for the next ones. Then ask the agent to run them in parallel: `parallel.md` launches one `spec-runner` per independent spec (each in its own worktree and branch), reviews the waiting specs meanwhile, gates every branch with `diff-review`, and merges them one at a time. Runners never touch the roadmap, push or merge.

---

## Installation & Usage

### 1. Install the Skill

Add `agentry` directly using the standard Agent Skills CLI (`skills.sh` / `agentskills.io`):

```bash
# Add to current project
pnpm dlx skills add SebassContreras/agentry

# Install globally (available across all your projects)
pnpm dlx skills add -g SebassContreras/agentry
```

<details>
<summary>Manual installation (git clone)</summary>

```bash
# The skill is the skills/agentry folder, not the repository root:
# clone anywhere, then copy that folder so SKILL.md sits at <skills dir>/agentry/SKILL.md
git clone https://github.com/SebassContreras/agentry agentry-src

# Claude Code (global)
cp -r agentry-src/skills/agentry ~/.claude/skills/agentry

# Antigravity (global)
cp -r agentry-src/skills/agentry ~/.gemini/antigravity-cli/skills/agentry
```
</details>

---

### 2. Scaffold a Project

Open a terminal or chat session inside your target repository and tell the agent:

```text
init agentry
```

The skill will ask 5 simple questions:
1. **Project name & goal** (in 1–2 sentences).
2. **Languages**: The language you speak vs. the language of the product's UI/messages.
3. **Project kind**: Software with UI, headless (CLI/API/library), or content/research.
4. **Collaboration mode**: Solo (direct commits to `main`) or Team (branches and pull requests).
5. **Planning location**: `repo` (local `planning/` folder) or `github` (GitHub Issues).

`agentry` inspects your existing codebase (package manifests, scripts, README) and tailors the contracts cleanly with zero filler.

---

### Host notes

The skill is host-neutral: it asks the agent running it to use that agent's own conventions (skill directory, instruction file, subagent folder, settings). For reference, in Claude Code: `${CLAUDE_SKILL_DIR}` is the skill folder; `CLAUDE.md` containing `@AGENTS.md` makes it load the router; subagents go in `.claude/agents/` with `tools`, `model` (`haiku` for `fast`, `sonnet` for `standard`), `maxTurns` and `isolation` in the frontmatter; `parallel.md` runners start from the default branch unless `worktree.baseRef` is `head` in `.claude/settings.json`, and `.worktreeinclude` lists the gitignored files a worktree needs; `permissions.deny` in `.claude/settings.json` keeps secrets unread; per-model effort lives under `modelSettings`. In Antigravity: subagents go in `.agents/agents/` with `tools: [view_file, run_command]` (no edit tool, so `spec-review` lists its fixes), `subagent: true`, `mainAgent: false`, `model: flash` or `pro`, and `commandExecutionPolicy: sandbox` for the ones that run commands; it ships its own `research` subagent and has no worktree isolation for `spec-runner`.

---

### 3. Switching Planning Lanes

If a solo project outgrows local files and transitions to a team using GitHub Issues:

```text
update agentry
```

The skill proposes the switch and waits for your approval before touching anything. It then converts open specs and ideas from `planning/roadmap.md` into GitHub Issues (`gh issue create`), checks them, removes the local `planning/` directory, and re-fills the lane text in `AGENTS.md`, `plan.md`, `change.md` and `parallel.md` to use GitHub commands natively.

---

## Verification & Tests

`agentry` is backed by an automated test suite enforcing contract invariants, single-responsibility separation, and template synchronization:

```bash
npm test
```

The tests run natively using Node's built-in test runner (`node:test`, Node 22+) with zero dependencies.

---

## License

[MIT](LICENSE) © 2026 Sebastian Contreras
