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
- **Level 0 (Small / 60% of work):** Fits in one sentence and touches no recorded decision. Implement directly, run the affected test, and commit per collaboration mode. Zero spec overhead.
- **Level 1 (Feature / 35% of work):** Multi-task or multi-session feature. Thin spec (<80 lines), executed task by task, and **deleted upon completion** so specs never accumulate as debt.
- **Level 2 (Change of Direction / 5% of work):** Contradicts an earlier decision or requires an architectural pivot. Applies **"Delete first"**, discard-and-redo on a disposable branch, and a clean-context review.

### 3. Workaround Signals as Binary Stop Conditions
To eliminate sycophantic obedience, `agentry` defines **objective, observable code anti-patterns**. If fulfilling an instruction forces the agent to introduce:
- Artificial shims or wrappers to bypass constraints.
- Duplicated code to avoid touching an existing module.
- Ad-hoc special-case conditional branches (`if (id === 'special')`).
- Silenced exceptions (`catch (e) {}` with no handling).
- Suppressed linters or skipped tests.

The agent is contractually bound to **STOP immediately and report the design conflict** before writing code.

### 4. Single-Lane Scaffolding (Zero Context Pollution)
Agentry understands multiple workflows (offline local markdown vs. GitHub Issues vs. cloud trackers), but **your target repository receives only the single lane you choose**:
- **Repo Mode:** Creates `planning/roadmap.md` and `planning/specs/`. Contracts contain zero mention of GitHub.
- **GitHub Mode:** Creates **no `planning/` directory**. Contracts instruct the agent directly with `gh issue list`, `gh issue create`, and `Closes #N`.
- The agent never gets confused by hypothetical `if/else` options in its instructions.

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
├── PRODUCT.md                 # Vision, users, capabilities (present tense), and decisions (Why/Revisit if)
├── ARCHITECTURE.md            # Layers, boundaries, invariants, and allowed ## Dependencies
├── ENGINEERING.md             # 11 core principles, workaround stop signals, and event-driven hygiene
├── DESIGN.md                  # Tokens (pointing to globals.css), UI interaction states, and accessibility
├── TESTING.md                 # Fast verify commands, branch coverage, 4 partitions, and test placement
├── OPERATIONS.md              # Setup, run, build, environment variables, and on-demand hygiene recipes
├── .agents/playbooks/
│   ├── plan.md                # Thin-slice feature planning (<80 lines per spec, deleted on completion)
│   ├── change.md              # Discard-and-redo, delete-first on pivots, and orphan sweeps
│   └── review.md              # Clean-context reviewer checklist (audits diffs without modifying code)
└── planning/                  # (Only in 'repo' mode)
    └── roadmap.md             # Living queue of active work only (no archived clutter)
```

---

## Installation & Usage

### 1. Install the Skill

Add `agentry` directly using the standard Agent Skills CLI (`skills.sh` / `agentskills.io`):

```bash
# Add to current project
npx skills add SebassContreras/agentry
# or with pnpm
pnpm dlx skills add SebassContreras/agentry

# Install globally (available across all your projects)
npx skills add -g SebassContreras/agentry
```

<details>
<summary>Manual installation (git clone)</summary>

```bash
# Claude Code (global)
git clone https://github.com/SebassContreras/agentry ~/.claude/skills/agentry

# Antigravity (global)
git clone https://github.com/SebassContreras/agentry ~/.gemini/antigravity-cli/skills/agentry
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

### 3. Switching Planning Lanes

If a solo project outgrows local files and transitions to a team using GitHub Issues:

```text
update agentry
```

The skill automatically converts open specs from `planning/roadmap.md` into GitHub Issues (`gh issue create`), removes the local `planning/` directory, and updates `AGENTS.md` and `plan.md` to use GitHub commands natively.

---

## Verification & Tests

`agentry` is backed by an automated test suite enforcing contract invariants, single-responsibility separation, and template synchronization:

```bash
npm test
```

72 tests run natively using Node's built-in test runner (`node:test`) with zero dependencies.

---

## License

[MIT](LICENSE) © 2026 Sebastian Contreras
