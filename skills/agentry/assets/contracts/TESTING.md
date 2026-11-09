# Testing

> Owns: what "done" means, what to test, how a test is written and the command that verifies · Not here: code style (ENGINEERING.md), run, build or deploy procedures (OPERATIONS.md)

## Verify

- Narrowest, one test file: `<fill: command>`
- Full suite: `<fill: command>`
- Types and lint, if the stack has them: `<fill: command>`

## What counts as done

A task is done when its check passes and you ran it. A bug fix ships with a test that fails before the fix and passes after. Never weaken, skip or delete a test to make a change pass.

## Branch coverage over line count (No vanity tests)

Line coverage is deceptive; test suites must prove branch coverage. Every `if`, `else`, `switch` case and `catch` block must be evaluated. Coverage is the floor, not the proof: a test earns its place only if breaking the behavior would make it fail (where the stack has a mutation tool, such as Stryker, mutmut or PIT, use it on changed code to check that).
- **Forbidden:** writing multiple tests for the same nominal branch with trivial input variations (e.g. testing two valid names). One nominal test is enough.
- **Forbidden:** assertions that cannot fail, or asserting that a mock returned what the test itself staged.

## The 4 mandatory partitions

For each unit you add or change, cover every partition that applies (a unit with no external call has no partition 4; a Level 0 change needs only the partitions it touches). Name the ones skipped and why:
1. **Nominal (Happy path):** exactly one canonical valid case proving intended behavior.
2. **Boundaries and edge cases:** empty inputs (`[]`, `""`, `{}`), whitespace-only, `null`/`undefined`, zeros, negative values, and boundary extremes (min, max, ±1).
3. **Sad path (Domain branches):** unauthorized, expired, insufficient balance, duplicate identifier, or invalid state. Assert that the domain rejects or throws the expected error.
4. **Fault propagation (System failures):** when an external vendor, disk, or network call fails (e.g. simulated timeout, 500 error), verify the unit fails fast, rolls back, or reports cleanly without leaving corrupt state.

## Test placement and organization

Do not scatter loose test files directly in the module root alongside implementation files (`src/<module>/foo.test.ts`, `src/<module>/bar.test.ts`).
- Place module tests in a dedicated `test/` (or `__tests__/`) subdirectory inside the module: `src/<module>/test/foo.test.ts`. Where the stack or the existing layout has another convention, follow it (Go `_test.go` beside the package, Rust `#[cfg(test)]` modules, tests already colocated).
- For integration, cross-module or contract tests, use the root `tests/` directory.
- This keeps source folders focused on production code.

## How a test reads

- **Arrange, act, assert.** The test name states the condition and expected outcome (e.g. `when_balance_is_insufficient_throws_domain_error`).
- **Use parameterized tables** (`test.each`, `parametrize`, table-driven tests). Avoid 10 separate boilerplate test functions. Group the 4 partitions into a compact data matrix with a descriptive label per row.
- **No logic in tests.** No `if`, ternary, or hand-written loop inside a test body (the framework's own table loop is not logic).
- **Never mock the unit under test.** Mock only the network, disk, non-deterministic clocks and third-party SDKs, the latter through the project-owned adapter (ENGINEERING.md §4), never the SDK itself.
- **A mock proves nothing about the integration.** Cover each adapter and each boundary crossing with at least one integration test against the real dependency or a faithful fake.

## This project

<fill: framework, folders, fixtures, a coverage floor or mutation gate if there is one, and the testing decisions of this project, each with Why and Revisit if>
