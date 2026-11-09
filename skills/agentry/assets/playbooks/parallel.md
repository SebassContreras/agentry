# Playbook: parallel

> Owns: running several reviewed specs at the same time, each in its own git worktree, and merging them back · Not here: writing or reviewing a spec (plan.md, review.md) or how a spec is implemented (ENGINEERING.md, TESTING.md)

Run this from the main checkout, as the orchestrator. Each spec is implemented in isolation; only you touch the tracker and merge. The default branch is `main` or `master`.

## Steps

1. **Pick the specs.** Take specs that are reviewed and ready to code. Two specs run together only if neither is in the other's `Depends on` and their `Touches:` lines share no file or module. Shared files (lockfile, route index, schema) mean running them one after the other. Start with 2–3 at once.
2. **Prepare the repository.**
   - With the `spec-runner` subagent: add the folder where the host creates its worktrees to `.gitignore`, and carry the gitignored files a fresh checkout needs (`.env`) into each worktree with the host's own mechanism (look it up in its documentation).
   - Without it: the worktrees live next to the repository (`../<repo>-NNN`), so nothing needs ignoring; copy by hand the gitignored files a fresh checkout needs, and run the Setup command from `OPERATIONS.md` in each worktree before its first task.
3. **Commit first.** A worktree starts from committed code, and a `spec-runner` worktree usually starts from the default branch, not from your current branch (check the host's worktree setting for its base). Put on the default branch what the runners need: step 2's changes, any contract change and:
   <fill:
   - repo: the reviewed specs, with each chosen roadmap row set to `in progress`.
   - github: nothing for the specs (they are already issues); assign each chosen one to yourself with `gh issue edit N --add-assignee @me`.>
   Solo: commit them there. Team: open a pull request for those commits and merge it before going on.
4. **Launch one runner per spec.**
   - With the `spec-runner` subagent: start every runner in one message and let them run in the background, passing each its spec location. Permission prompts surface in the main session. A runner runs the Setup command itself.
   - Without it: one worktree and one session per spec, from the main checkout: `git worktree add ../<repo>-NNN -b spec/NNN-feature`, then ask the agent there to run the `[agent]` tasks of spec NNN.
5. **Review the next specs meanwhile.** Save the specs still waiting (`plan.md` step 6), then run `spec-review` on them. It edits only the spec and needs no worktree; it cannot commit, so persist its fixes the way `plan.md` step 6 saves a spec before the next review.
6. **Gate each finished branch.** Run `review.md` (or the `diff-review` subagent) in a clean context on the branch the runner reports, stating the range `<default branch>...<runner branch>` explicitly. Fix blockers on that branch before merging.
7. **Merge one at a time**, lowest ID first, per the Collaboration setting in `AGENTS.md`. The runner's report gives its worktree path and branch:

   | Collaboration | Do |
   |---|---|
   | solo | In the worktree: `git -C <worktree> rebase <default branch>`, then run the Verify command from `TESTING.md` there. From the main checkout: `git merge --ff-only <branch>`. |
   | team | Push the branch and open a pull request. Merge them in order, rebasing each (`git -C <worktree> rebase <default branch>`) after the previous one lands. |

8. **Close the spec** per `plan.md` (Finished spec) once its branch has merged (team: once its pull request has), then remove the worktree and its branch: `git worktree remove <path>` and `git branch -d <branch>` (`-D` if the pull request was squash-merged).

## Rules

- Runners never touch the tracker, push or merge. If one stops, read its report and finish the remaining tasks by hand on its branch. A new runner would branch from the default branch and not see the finished commits.
- A merge conflict between two specs means they were not independent. Resolve it on the later branch, and note the shared file in the later spec's `Touches:`.
