# Playbook: change

> Owns: routing a bug, a fix, a new requirement or a change of direction to the right place · Not here: how to write the code (ENGINEERING.md) or the tests (TESTING.md)

## Classify first

| It is… | Do |
|---|---|
| A small fix: a typo, a stale doc, or a defect fixable in one sentence that breaks no recorded decision (Level 0) | Commit directly as `fix:` or `docs:` per the Collaboration setting in `AGENTS.md`; a bug fix still ships with its test (`TESTING.md`). No spec. |
| A bug that needs several tasks, or a bug against a requirement (Level 1) | If its spec is still open, add a `[test]` regression task and a fix task to it. If it is closed (specs are deleted when they close), write a minimal new spec with `plan.md`: one requirement for the bug, a `[test]` task and a fix task. |
| A new feature (Level 1) | Follow `plan.md`. |
| A decision with no conflict (for example choosing a test framework) | Record it as step 3 says. Nothing else. |
| A change of direction or decision conflict (Level 2) | The steps below. |

Not now? Record it as an idea:
<fill:
- repo: under `## Ideas` in planning/roadmap.md.
- github: run gh issue create --label idea --title "..." with a one-line body.>

## Change of direction (Level 2)

1. **Delete first.** The first commit removes what no longer applies (code, tests, docs). Run the orphan check to clean up unused exports and dependencies before building.
2. **Discard and redo.** If an approach fails validation, do not accumulate workarounds. Work on a disposable branch (in solo mode too: branch for the pivot, merge it back once it works). Discard the branch or revert, note the 3-line learning in the spec or contract, and reimplement cleanly.
3. **Update contracts in place.** Record the new decision with its `Why:` and `Revisit if:` (and `Trade-off:` if it is hard to reverse) in the contract that owns its subject: product → `PRODUCT.md`; architecture and dependencies → `ARCHITECTURE.md`; code, test or tooling conventions → the "This project" section of `ENGINEERING.md` or `TESTING.md`; interface, UI or content → `DESIGN.md`; setup and release → `OPERATIONS.md`, under the section it affects. Do not strike-out old text (`~~D1~~ → D2`); git keeps the history.
4. **Clean-context review.** For major pivots, run `review.md` with a clean session to ensure no dead code or workarounds remain wired in. Then realign the contracts: run the `contract-sync` subagent, or re-read every contract against the others and against the files they name.
