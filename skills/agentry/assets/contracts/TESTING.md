# Testing

> Owns: what "done" means, what to test, how a test is written and the command that verifies · Not here: code style (ENGINEERING.md), run, build or deploy procedures (OPERATIONS.md)

## Verify

- Narrowest, one test file: `<fill: command>`
- Full suite: `<fill: command>`
- Types and lint, if the stack has them: `<fill: command>`

## What counts as done

A task is done when its check passes and you ran it. A bug fix ships with a test that fails before the fix and passes after. Never weaken, skip or delete a test to make a change pass.

## Branch coverage over line count (No vanity tests)

Line coverage is deceptive; test suites must prove branch coverage. Every `if`, `else`, `switch` case and `catch` block must be evaluated.
- **Forbidden:** writing multiple tests for the same nominal branch with trivial input variations (e.g. testing two valid names). One nominal test is enough.
- **Forbidden:** assertions that cannot fail, or asserting that a mock returned what the test itself staged.

## The 4 mandatory partitions

For each unit under test, cover all 4 partitions:
1. **Nominal (Happy path):** exactly one canonical valid case proving intended behavior.
2. **Boundaries and edge cases:** empty inputs (`[]`, `""`, `{}`), whitespace-only, `null`/`undefined`, zeros, negative values, and boundary extremes (min, max, ±1).
3. **Sad path (Domain branches):** unauthorized, expired, insufficient balance, duplicate identifier, or invalid state. Assert that the domain rejects or throws the expected error.
4. **Fault propagation (System failures):** when an external vendor, disk, or network call fails (e.g. simulated timeout, 500 error), verify the unit fails fast, rolls back, or reports cleanly without leaving corrupt state.

## Test placement and organization

Do not scatter loose test files directly in the module root alongside implementation files (`src/<module>/foo.test.ts`, `src/<module>/bar.test.ts`).
- Place module tests in a dedicated `test/` (or `__tests__/`) subdirectory inside the module: `src/<module>/test/foo.test.ts`.
- For integration, cross-module or contract tests, use the root `tests/` directory.
- Keeps source folders clean and focused on production code.

## How a test reads

- **Arrange, act, assert.** The test name states the condition and expected outcome (e.g. `when_balance_is_insufficient_throws_domain_error`).
- **Use parameterized tables (`test.each`).** Avoid 10 separate boilerplate test functions. Group the 4 partitions into a compact data matrix with a descriptive label per row.
- **No logic in tests.** No `if`, ternary, or loop inside a test body.
- **Never mock the unit under test.** Mock only the network, disk, third-party SDKs, and non-deterministic clocks.

## This project

<fill: framework, folders, fixtures, and a coverage floor or mutation gate if there is one>
