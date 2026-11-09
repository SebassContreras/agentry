# {{PROJECT_NAME}}

> Owns: the router to every other contract, the hard rules and the working flow · Not here: standards, commands, vision or history → see the contract the router names

Vision, users and capabilities: PRODUCT.md.

## Hard rules (always)

1. Never add Claude or AI attribution ("Generated with...", co-author trailers) to commits or pull requests. Commits are Conventional Commits with no trailers.
2. Never bypass git hooks (`--no-verify`), force-push the default branch, or stage `.env` files or secrets.
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
| plan a feature or a project, or close a finished spec | .agents/playbooks/plan.md |
| fix a bug, change direction or record a decision | .agents/playbooks/change.md |
| review a spec before coding, or review a diff | .agents/playbooks/review.md |
| run several reviewed specs at once | .agents/playbooks/parallel.md |

When you decide something, name the contract and section you used ("per ENGINEERING.md §2"). If none applied, say so.

## Working flow

- **Collaboration:** <fill: solo (commit to the default branch) | team (feature branches and pull requests; never commit to the default branch)>
- **Planning lane:** <fill: repo (files under planning/, the default) | tracker (an external tool: name it)>
- **Unfilled placeholders:** a placeholder that still reads "fill: …" in any contract means the fact does not exist yet (a command, a layer, a place in the tracker). Never guess it: the first task that needs it establishes it, writes it into the contract and says so.

### Planning table

Where each planning thing lives, and how an agent reads or changes it. The playbooks refer to these rows by name and say nothing else about the lane, so changing tracker means rewriting only this table (and moving the content).

| Thing | Where it lives, and how to read or change it |
|---|---|
| Spec | <fill: repo: planning/specs/NNN-feature.md, one file per spec · tracker: where a spec lives and how to open and edit it> |
| ID | <fill: repo: the highest ID in planning/roadmap.md plus one; tasks read ID/T001 · tracker: how a spec gets its ID, which its tasks reuse> |
| Order and next task | <fill: repo: planning/roadmap.md lists specs in execution order; take the first `todo` row whose Depends on rows are `done`, then its first open [agent] task; a row with no spec file is planned first · tracker: how to list work in order and take the next open [agent] task> |
| Status | <fill: repo: the Status column of planning/roadmap.md (todo, in progress, done), set when work starts and when the spec closes · tracker: where the status lives and how to set it> |
| Dependencies | <fill: repo: the Depends on column of planning/roadmap.md · tracker: where a spec says what it depends on> |
| Evidence | <fill: repo: a `verified:` line under the ticked task, with the command and its outcome · tracker: where the evidence of a finished task is recorded> |
| Ideas | <fill: repo: the `## Ideas` section of planning/roadmap.md · tracker: where later ideas and deferred fixes go> |
| Claim | <fill: repo: set the row to `in progress` and commit it · tracker: how to mark a spec as taken before a runner starts on it> |
| Close | <fill: repo: mark the row `done` and delete the spec file · tracker: what closing a finished spec does there> |

Closing happens in the final commit or pull request of a spec, never in a task commit.

Work scales with risk:

- **Level 0 (Small):** Fits in one sentence and touches no recorded decision. Implement directly, run the affected test, and commit per the Collaboration mode. No spec needed.
- **Level 1 (Feature):** Several tasks or multiple sessions. Short spec where the Planning table says, executed task by task, closed when done.
- **Level 2 (Change of direction / Decision conflict):** Contradicts an earlier decision or requires a pivot. Follow `.agents/playbooks/change.md`: delete first, discard and redo on a disposable branch (in solo mode too), and run an orphan sweep.
