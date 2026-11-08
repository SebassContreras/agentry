# Playbook: plan

> Owns: turning an idea into specs, and shaping the contracts to fit the project · Not here: standards (ENGINEERING.md, TESTING.md), the tracker itself

## Steps

1. Read `AGENTS.md`, every contract, and check open work in the active planning tracker. Read the code you will touch.
2. Ask only what blocks the plan: open stack choices, credentials. Decide the rest and record the decision in the spec's Design.
3. Cut the plan into thin slices that each end in something running.
4. Create the next spec in the format below (under 80 lines):
   <fill:
   - repo: write planning/specs/NNN-feature.md and add one row to planning/roadmap.md.
   - github: run gh issue create --title "NNN — feature" --body "..." with the spec content.>
5. List the contract changes the plan implies: a layer or dependency in ARCHITECTURE.md, a command in OPERATIONS.md. Show them as a diff, apply them once approved, and record any lasting decision in the affected contract with `Why:` and `Revisit if:` (and `Trade-off:` if it is hard to reverse).
6. Review the spec before any code: run the `spec-review` subagent, or the "Reviewing a spec" section of `review.md` in a clean context. Fix blockers in the spec.
7. Report, and stop: planning does not start executing.

## Spec format

```markdown
# 003 — login

## Goal
What works when this is done and how to check it, in 2–3 lines.

## Requirements
- R1: A checkable outcome.

## Design
- D1 (R1): A decision, with its Why and Revisit if, and its Trade-off if it is hard to reverse. This section is optional.

## Tasks
- [ ] 003/T001 [agent] Do one thing — covers D1
- [ ] 003/T002 [agent][test] Test R1 — covers R1
- [ ] 003/T003 [human] Create the account — covers R1
      blocked: waiting for approval
```

- Every requirement is covered by a task, and by a `[test]` task.
- `[x]` needs a `verified:` line under it with the evidence.
- When a decision changes, rewrite the spec directly; previous versions are in git or issue history.
- **Finished spec:** <fill:
  - repo: mark the roadmap row done and delete the spec file.
  - github: close the issue with Closes #N in the commit message or gh issue close N.>
  What lasts lives in the contracts and git log.
