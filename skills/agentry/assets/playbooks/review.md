# Playbook: review

> Owns: auditing a diff or a finished spec against the contracts · Not here: changing code; a review only reports

## Steps

1. Read the diff (`git diff main...HEAD`, or the staged and unstaged changes) and the active spec (in repo, GitHub issue or tracker).
2. Check it against each contract and cite file and line for every finding:
   - **Workarounds & Anti-patterns:** shims/wrappers introduced to bypass a rule; duplicate code; special-case conditional patches; silenced exceptions.
   - **ENGINEERING.md:** an abstraction with one user; type evasion (`any`); swallowing errors; reinventing the wheel instead of proposing an ecosystem primitive under ARCHITECTURE.md; unhandled orphan check after a replacement; missing source citation for external APIs.
   - **ARCHITECTURE.md:** a dependency added without recording it in `## Dependencies`; a dependency that crosses a layer boundary or violates invariants.
   - **TESTING.md:** missing any of the 4 partitions; vanity tests duplicating nominal paths; tests placed directly in module root instead of a dedicated `test/` folder; skipped or weakened tests; mock of the unit under test.
   - **DESIGN.md:** hardcoded colors/spacings instead of referencing tokens/globals.css; unhandled visual interaction states (empty, loading, disabled).
   - **Docs & Decisions:** behavior changed but the contract that describes it did not; decisions recorded without `Why:` and `Revisit if:`.
3. Report findings by severity, with file and line. Change nothing; the user decides.
