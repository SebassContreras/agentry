# {{PROJECT_NAME}}

> Owns: the router to every other contract, the hard rules and the working flow · Not here: standards, commands, vision or history → see the contract the router names

{{GOAL}}

## Hard rules (always)

1. Never add Claude or AI attribution ("Generated with...", co-author trailers) to commits or pull requests. Commits are Conventional Commits with no trailers.
2. Never bypass git hooks (`--no-verify`), force-push `main`, or stage `.env` files or secrets.
3. Write code, comments, docs and commits in <fill: the project language, English unless the project says otherwise>. Talk to the user in <fill: the language the user speaks>. The language of the product's own text (interface, messages) is set in DESIGN.md, not here.
4. If an instruction or decision forces a workaround or bad design, stop and report the conflict before writing code (per ENGINEERING.md).

## Before you act, open the contract

| You are about to… | Read first |
|---|---|
| write or change code | ENGINEERING.md |
| add or move a module, layer or dependency | ARCHITECTURE.md |
| write or change a test, make a failing check pass, or decide what "done" means | TESTING.md |
| touch UI, copy, tone or an interface shape | DESIGN.md |
| accept or propose a feature, or change scope | PRODUCT.md |
| run, build, configure or release the project | OPERATIONS.md |
| plan a feature or a project | .agents/playbooks/plan.md |
| fix a bug, change direction or record a decision | .agents/playbooks/change.md |
| review a diff or close a spec | .agents/playbooks/review.md |
| run several reviewed specs at once | .agents/playbooks/parallel.md |

When you decide something, name the contract and section you used ("per ENGINEERING.md §2"). If none applied, say so.

## Working flow

- **Collaboration:** <fill: solo (commit to main) | team (feature branches and pull requests)>
- **Planning:** <fill: the active planning mode: repo (planning/roadmap.md and planning/specs/) | github (GitHub Issues)>

How to pick the next task:
<fill:
- repo: read planning/roadmap.md and take the first open [agent] task of the first spec that is not done.
- github: run gh issue list and take the first open issue.>

Work scales with risk:

- **Level 0 (Small):** Fits in one sentence and touches no recorded decision. Implement directly, run the affected test, and commit per the Collaboration mode. No spec needed.
- **Level 1 (Feature):** Several tasks or multiple sessions. Short spec in the configured Planning location, executed task by task, closed when done.
- **Level 2 (Change of direction / Decision conflict):** Contradicts an earlier decision or requires a pivot. Follow `.agents/playbooks/change.md`: delete first, discard and redo on a disposable branch, and run an orphan sweep.
