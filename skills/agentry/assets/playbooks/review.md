# Playbook: review

> Owns: auditing a spec before code, a diff or a finished spec against the contracts · Not here: changing code; a diff review only reports, a spec review may fix the spec itself

## Reviewing a spec (before code)

Review a spec in a clean context once it is saved (`plan.md` step 6), so every fix shows up as a diff or an edit. Read the spec and every contract that exists, and cite file and line for every finding, in this order:

1. **Contradictions** with `AGENTS.md`, `PRODUCT.md`, `ARCHITECTURE.md`, `ENGINEERING.md`, `TESTING.md`, `OPERATIONS.md`, `DESIGN.md` or a recorded decision.
2. **Unverifiable requirements:** no `[test]` task, no acceptance criterion, no partitions.
3. **Dependencies** that are not done, or work that falls outside the repository.
4. **Unsourced claims** about external behavior: "the API does X" with no link.
5. **Speculative work:** an abstraction with a single consumer (KISS/YAGNI in `ENGINEERING.md`).
6. **Unweighed choices:** a non-obvious or hard-to-reverse decision with no rejected alternative, cost and mitigation (`ENGINEERING.md` §12).
7. **What is missing:** uncovered edge cases, migration, docs to update.

Fix in the spec what the contracts settle on their own and list each fix (with no edit tool, list the exact changes instead). Leave anything that needs a product or design decision unfixed and mark it blocking. Edit only the spec; if the fixes would push it past 80 lines, mark blocking that it must be split. Verdict: `ready to code`, or `needs another pass, because …`.

## Reviewing a diff or a finished spec

### Steps

1. Read the diff and the active spec. The caller states the range (`<default branch>...<branch>`); with none, take the staged and unstaged changes. An empty diff is a finding: report it, never `ready to merge`.
2. Check it against each contract and cite file and line for every finding:
   - **Workarounds & Anti-patterns:** shims/wrappers introduced to bypass a rule; duplicate code; special-case conditional patches; silenced exceptions.
   - **ENGINEERING.md:** an abstraction with one user; type evasion (`any`); swallowing errors; reinventing the wheel instead of proposing an ecosystem primitive under ARCHITECTURE.md; unhandled orphan check after a replacement; missing source citation for external APIs; a non-obvious choice with no rationale and mitigation in a code comment (§10) or no trade-off recorded (§12).
   - **ARCHITECTURE.md:** a dependency added without recording it in `## Dependencies`; a dependency that crosses a layer boundary or violates invariants.
   - **TESTING.md:** missing any of the 4 partitions; vanity tests duplicating nominal paths; tests placed directly in module root instead of a dedicated `test/` folder (unless the stack dictates it); skipped or weakened tests; mock of the unit under test.
   - **DESIGN.md:** for a UI, hardcoded colors/spacings instead of the tokens it points to, and unhandled interaction states (empty, loading, disabled); for an interface, a surface, output or error shape that breaks its rules; for content, voice, structure or terminology that breaks them.
   - **Docs & Decisions:** behavior changed but the contract that describes it did not; decisions recorded without `Why:` and `Revisit if:`, or a hard-to-reverse one without `Trade-off:`.
3. Report findings by severity, with file and line: **Blocking** (breaks a contract or a requirement), **Important** (wrong or ambiguous result), **Minor** (friction, docs). Change nothing; the user decides.
