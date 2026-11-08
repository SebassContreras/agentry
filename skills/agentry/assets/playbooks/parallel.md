# Playbook: parallel

> Owns: running several reviewed specs at the same time, each in its own git worktree, and merging them back · Not here: writing or reviewing a spec (plan.md, review.md) or how a spec is implemented (ENGINEERING.md, TESTING.md)

Run this from the main checkout, as the orchestrator. Each spec is implemented in isolation; only you touch the roadmap and merge.

## Steps

1. **Pick the specs.** Take specs that are reviewed and ready to code. Two specs run together only if neither is in the other's `Depends on` and they do not name the same files or modules. Shared files (lockfile, route index, schema) mean running them one after the other. Start with 2–3 at once.
2. **Commit first.** A worktree starts from committed code. Commit the reviewed specs (and any contract change) on the branch the worktrees will branch from.
3. **Mark them.** <fill:
   - repo: set each chosen row in planning/roadmap.md to `in progress` and commit it.
   - github: assign each chosen issue to yourself with `gh issue edit N --add-assignee @me`.>
4. **Prepare worktrees.** Each worktree runs the Setup command from `OPERATIONS.md` before its first task.
   - With the `spec-runner` subagent: add `.claude/worktrees/` to `.gitignore`, and list the gitignored files a fresh checkout needs (`.env`) in `.worktreeinclude`.
   - Without it: the worktrees live next to the repository (`../<repo>-NNN`), so nothing needs ignoring; copy by hand the gitignored files a fresh checkout needs.
5. **Launch one runner per spec.**
   - With the `spec-runner` subagent: start every runner in one message and let them run in the background, passing each its spec location. Permission prompts surface in the main session.
   - Without it: one worktree and one session per spec, from the main checkout: `git worktree add ../<repo>-NNN -b spec/NNN-feature`, then ask the agent there to run the `[agent]` tasks of spec NNN.
6. **Review the next specs meanwhile.** Run `spec-review` on specs still waiting. It is read-only and needs no worktree.
7. **Gate each finished branch.** Run `review.md` (or the `diff-review` subagent) on the branch the runner reports, in a clean context. Fix blockers on that branch before merging.
8. **Merge one at a time**, lowest ID first, per the Collaboration setting in `AGENTS.md`:

   | Collaboration | Do |
   |---|---|
   | solo | Rebase the branch onto the main branch, run the Verify command from `TESTING.md`, then `git merge --ff-only`. |
   | team | Push the branch and open a pull request. Merge them in order, rebasing each after the previous one lands. |

9. **Close the spec** per `plan.md` (Finished spec), then remove the worktree and its branch: `git worktree remove <path>` and `git branch -d <branch>`.

## Rules

- Runners never touch the roadmap, push or merge. If one stops, read its report and finish the remaining tasks by hand on its branch. A new runner would branch from the main branch and not see the finished commits.
- A merge conflict between two specs means they were not independent. Resolve it on the later branch, and note the shared file in the later spec's Design.
