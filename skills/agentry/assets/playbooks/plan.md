# Playbook: plan

> Owns: turning an idea into specs, and shaping the contracts to fit the project · Not here: standards (ENGINEERING.md, TESTING.md), the tracker itself, where each planning thing lives (the Planning table in AGENTS.md)

Rows named below (Spec, ID, Order and next task, Status, Dependencies, Evidence, Ideas, Claim, Close) are the rows of the Planning table in `AGENTS.md`.

## Steps

1. Read `AGENTS.md`, every contract, and check open work where the Order and next task row says. Read the code you will touch.
2. Ask only what blocks the plan: open stack choices, credentials. Decide the rest and record the decision in the spec's Design.
3. Cut the plan into thin slices that each end in something running.
4. Create the next spec in the format below (under 80 lines), where the Spec row says, with its ID, its place in the order and its dependencies recorded where the ID, Order and next task and Dependencies rows say.
5. List the contract changes the plan implies: a layer or dependency in ARCHITECTURE.md, a command in OPERATIONS.md. Show them as a diff, apply them once approved, and record any lasting decision in the contract that owns it with `Why:` and `Revisit if:` (and `Trade-off:` if it is hard to reverse); `change.md` says where each kind goes. The spec is deleted when it closes, so a decision left only in its Design is lost.
6. Save the spec where the review can see it (a spec that is a file is committed; one that lives in the tracker is already saved), then review it before any code: run the `spec-review` subagent, or the "Reviewing a spec" section of `review.md` in a clean context. A reviewer that cannot read the tracker is given the spec pasted, and its corrected spec is applied back where the spec lives. Fix blockers in the spec.
7. Report, and stop: planning does not start executing.

## Spec format

```markdown
# 003 — login
Touches: the files or modules it changes (parallel.md compares them)

## Goal
What works when this is done and how to check it, in 2–3 lines.

## Requirements
- R1: A checkable outcome.

## Design
- D1 (R1): A decision, with its Why and Revisit if, and its Trade-off if it is hard to reverse. This section is optional.

## Tasks
- [ ] 003/T001 [agent] Do one thing — covers D1
- [ ] 003/T002 [agent][test] Test R1 — covers R1 — needs 003/T001
- [ ] 003/T003 [human] Create the account — covers R1
      blocked: waiting for approval
```

- Every requirement is covered by a task, and by a `[test]` task.
- Tasks run in order. `needs <ID>` marks a task that cannot start before another one; without it a task does not depend on a skipped `[human]` or `blocked:` task.
- `[x]` needs the evidence of its check, recorded where the Evidence row says.
- When a decision changes, rewrite the spec directly; previous versions are in the tracker's history.
- **Finished spec:** review it first (`review.md`), because closing deletes it. Then do what the Close row says. What lasts lives in the contracts and git log.
