# agentry

> Pragmatic agent contracts and playbooks for high-speed coding with zero friction.

`agentry` scaffolds a minimal set of single-responsibility contracts and playbooks that keep coding agents (Claude Code, Antigravity, Cursor) disciplined without slowing you down.

---

## Why agentry?

Most spec-driven or agent-governance frameworks fail in daily use because of **over-ceremony**:
- Forcing specs, branches, and multi-step approvals for trivial 1-line changes.
- Running heavy linters on every single prompt or turn, causing high latency and context friction.
- Piling up dead code after pivots because agents only add and rarely delete.
- Agents obediently building workarounds around flawed rules instead of speaking up.

**agentry solves this with 4 core principles:**

1. **Event-driven code hygiene:** Linters and dead-code checks run **only** when triggered by replacements, dependency changes, test deletions, or pivots. Routine forward additions run with zero linter latency.
2. **Ceremony scaled by risk:**
   - **Level 0 (Small):** Direct to `main`, fast check, no spec.
   - **Level 1 (Feature):** Short spec (<80 lines), deleted when completed.
   - **Level 2 (Pivots & Direction Changes):** "Delete first", discard-and-redo on a disposable branch, and an orphan sweep.
3. **Workaround signals as stop conditions:** The agent stops and objects before writing code if a task requires artificial wrappers, duplicate code, special-case conditional patches, or silenced exceptions.
4. **Decisions carry "Why" and "Revisit if":** No blind obedience. Every recorded decision has a rationale and an observable condition that invalidates it.

---

## What it scaffolds

```text
├── AGENTS.md                  # Router, hard rules, and workaround stop signals
├── PRODUCT.md                 # Vision, users, capabilities, and decisions (Why/Revisit if)
├── ARCHITECTURE.md            # Layers, boundaries, and invariants
├── ENGINEERING.md             # Core principles and event-driven hygiene triggers
├── DESIGN.md                  # Tokens, UI/CLI surface, and product language
├── TESTING.md                 # Definition of done, verify commands, test philosophy
├── OPERATIONS.md              # Setup, run, build, and on-demand hygiene recipes
├── .agents/playbooks/
│   ├── plan.md                # Thin-slice planning (<80 lines per spec)
│   ├── change.md              # Discard-and-redo, delete-first on pivots
│   └── review.md              # Clean-context reviewer checklist
└── planning/
    └── roadmap.md             # Active roadmap of open work (no bloat)
```

---

## Installation & Usage

### Claude Code

Clone or link `agentry` into your skills directory:

```bash
# Add as a personal/global skill
git clone https://github.com/SebassContreras/agentry ~/.claude/skills/agentry
```

Or copy `skills/agentry` into your project's `.claude/skills/agentry`.

Then inside any project repository, run:

```text
init agentry
```

The agent will ask a few quick questions (name, goal, languages, project kind) and scaffold the contracts directly into your repo.

---

## Running Tests

To verify that the asset templates preserve single-responsibility invariants:

```bash
npm test
```

---

## License

[MIT](LICENSE)
