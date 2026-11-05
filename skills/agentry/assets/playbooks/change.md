# Playbook: change

> Owns: routing a bug, a fix, a new requirement or a change of direction to the right place · Not here: how to write the code (ENGINEERING.md) or the tests (TESTING.md)

## Classify first

| It is… | Do |
|---|---|
| A small fix: a typo, a stale doc, a defect that breaks no recorded decision (Level 0) | Commit directly as `fix:` or `docs:`, with a regression test if behavior changes. No spec. Not now? One line under `## Ideas` in the roadmap. |
| A bug against a requirement (Level 1) | In the spec that owns it, add a `[test]` regression task and a fix task. If that spec was `done`, set its roadmap row back to `in progress`. |
| A new feature (Level 1) | Follow `plan.md`. |
| A change of direction or decision conflict (Level 2) | The steps below. |

## Change of direction (Level 2)

1. **Delete first.** The first commit removes what no longer applies (code, tests, docs). Run the orphan check to clean up unused exports and dependencies before building.
2. **Discard and redo.** If an approach fails validation, do not accumulate workarounds. Discard the branch or revert, note the 3-line learning in the spec or contract, and reimplement cleanly.
3. **Update contracts in place.** Update the relevant contract's Decisions section with the new decision, its `Why:` and `Revisit if:`. Do not strike-out old text (`~~D1~~ → D2`); git keeps the history.
4. **Clean-context review.** For major pivots, run `review.md` with a clean session to ensure no dead code or workarounds remain wired in.
