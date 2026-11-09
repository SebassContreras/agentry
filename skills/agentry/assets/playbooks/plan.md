# Playbook: plan

> Owns: turning an idea into specs, and shaping the contracts to fit the project · Not here: standards (ENGINEERING.md, TESTING.md), the tracker itself

## Steps

1. Read `AGENTS.md`, every contract, and check open work in the active planning tracker. Read the code you will touch.
2. Ask only what blocks the plan: open stack choices, credentials. Decide the rest and record the decision in the spec's Design.
3. Cut the plan into thin slices that each end in something running.
4. Create the next spec in the format below (under 80 lines):
   <fill:
   - repo: write planning/specs/NNN-feature.md (NNN is the highest ID in planning/roadmap.md plus one) and add one row to planning/roadmap.md, with its `Depends on`.
   - github: run gh issue create --title "feature" --body "..." with the spec content, and add a `Depends on: #N` line to the body if it has dependencies. The issue number is the spec ID: its tasks read `N/T001`.>
5. List the contract changes the plan implies: a layer or dependency in ARCHITECTURE.md, a command in OPERATIONS.md. Show them as a diff, apply them once approved, and record any lasting decision in the contract that owns it with `Why:` and `Revisit if:` (and `Trade-off:` if it is hard to reverse); `change.md` says where each kind goes. The spec is deleted when it closes, so a decision left only in its Design is lost.
6. Save the spec where the review can see it, then review it before any code:
   <fill:
   - repo: commit it.
   - github: nothing to commit, the issue is the spec. `spec-review` cannot read issues: paste the issue body to it and apply its `## Corrected spec` with `gh issue edit N --body-file`.>
   Review with the `spec-review` subagent, or the "Reviewing a spec" section of `review.md` in a clean context. Fix blockers in the spec.
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
- `[x]` needs the evidence of its check:
  <fill:
  - repo: a `verified:` line under the task with the command and its outcome.
  - github: a comment on the issue with the task ID and the evidence; the caller ticks the box when it reviews.>
- When a decision changes, rewrite the spec directly; previous versions are in the tracker's history.
- **Finished spec:** review it first (`review.md`), because closing deletes it. Then:
  <fill:
  - repo: mark the roadmap row `done` and delete the spec file.
  - github: close it with gh issue close N. If a commit closes it, put Closes #N only in the final commit or the pull request, never in a task commit.>
  What lasts lives in the contracts and git log.
