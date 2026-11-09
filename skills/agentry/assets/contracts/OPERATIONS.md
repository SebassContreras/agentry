# Operations

> Owns: exact, repeatable procedures and environment facts to set up, run, build, release and recover the project · Not here: standards (ENGINEERING.md), structure (ARCHITECTURE.md)

## Setup

<fill: prerequisites and the commands that give a working checkout>

## Run

<fill: how to start the project locally>

## Build and release

<fill: how to build, version and publish or deploy>

## Environment

<fill: the variables and config the project reads and where secrets live; never the values. State which environments an agent may touch (local and test only unless the user says otherwise) and that production credentials are never in the repository or in a place the agent can read>

## Hygiene and maintenance

<fill: on-demand command for dead code and dependency hygiene, for example:
- TS/JS: `npx knip`
- Python: `vulture . && deptry .`
- Rust: `cargo machete`>

## Enforcement

<fill: how the hard rules of AGENTS.md are enforced beyond the text, because tools can inject trailers or skip hooks on their own. For example a `commit-msg` hook or a CI check that rejects AI-attribution trailers and secrets, branch protection on the default branch, and permissions or tokens that make destructive operations impossible for the agent, not just forbidden in text>

## Recover

<fill: what to do when it breaks: restart, the common failures and their fix, and the rollback with its exact commands and the check that proves it worked. Say where backups live (outside what the agent can modify) and when a restore was last tried>
