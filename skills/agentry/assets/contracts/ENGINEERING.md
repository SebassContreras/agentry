# Engineering

> Owns: how code is written here, the principles and the stack conventions · Not here: commands (OPERATIONS.md), what to test and how (TESTING.md), the layer map (ARCHITECTURE.md)

## Principles

1. **KISS / YAGNI.** Build for today's need. Add an interface, adapter or abstraction only with 2+ concrete uses, 2+ implementations or a real test seam (the vendor seam of principle 4 is one). Simple beats clever.
2. **One responsibility.** A file, module or function does one thing. If it does two unrelated things, split it.
3. **Compose, don't inherit.** Share logic through small functions and injected dependencies, not class hierarchies. A business rule applied in two places lives in one function both call; code that merely looks alike stays duplicated until the shared rule is clear (a wrong abstraction costs more than duplication).
4. **Isolate vendors.** Business logic does not call the SDK or API of an external service (payments, storage, email, an LLM) directly: it calls a project-owned interface that one adapter implements, so the vendor is swappable. Exception: the framework itself and stable, single-use helpers (a date or string library) may be called directly; say so in a comment.
5. **Prefer proven primitives (Don't reinvent the wheel).** Do not hand-roll complex utilities, algorithms or UI widgets from scratch if an established ecosystem primitive exists (e.g. Radix, TanStack). If adopting it requires adding a dependency, propose it under ARCHITECTURE.md instead of writing custom brittle code.
6. **Strict types at boundaries (No type evasion).** Type all inputs, outputs and schemas. Never use the stack's escape hatch (`any` or `as unknown as T` in TypeScript, `Any` or `# type: ignore` in Python, `interface{}` or unsafe casts elsewhere) or untyped dynamic blobs to silence compiler errors where a typed schema or interface is possible.
7. **Fail fast and loud.** Validate preconditions at boundaries. Never swallow errors, return a fallback that hides a failure (`null`, a default, `[]` instead of the error), or mask broken invariants to make a run pass. A valid empty result is not a fallback.
8. **Follow the stack.** Use the language and framework's idiomatic conventions and match the existing code before adding a new style. Casing is the stack's own; where the stack has none: `kebab-case` files (contract names such as `AGENTS.md` excepted), `PascalCase` types, `camelCase` functions and variables, `UPPER_SNAKE_CASE` constants.
9. **Confirm with a source.** Before committing to an approach that rests on an external API, library version, or platform rule, look it up in official docs via search (the `research` subagent if installed; an agent with no web access stops and asks the caller) and cite `Source: <url> (accessed YYYY-MM-DD)` in the spec's Design or a code comment. Never guess an API signature.
10. **Decisions in code.** A non-obvious technical choice in code (an unusual algorithm, a performance trade-off, or an authorized exception) records its rationale and mitigation in a code comment.
11. **Docs travel with behavior.** A change of behavior updates the contract, specification, or doc that describes it in the same task. Changing a contract's rules needs the user's approval (plan.md step 5); recording a command, a path or a decision the task itself established does not.
12. **Weigh trade-offs.** A non-obvious or hard-to-reverse choice in a spec or design names the alternative it rejected, the cost of the one it takes, and a mitigation for that cost, recorded as `Trade-off:` in the spec's Design, and in the owning contract (change.md says where) if it outlives the spec, which is deleted when it closes. A reversible, obvious choice needs none: decide and move on.

## Workaround signals (Stop conditions)

If honoring a decision or instruction requires any of the following, stop and report the conflict before writing code:
1. **Shims or artificial wrappers:** adding a layer only to bypass a constraint.
2. **Duplicated code:** copying logic to avoid touching an existing module.
3. **Special-case conditional patches:** ad-hoc `if` branches for specific cases.
4. **Silenced exceptions:** empty `catch` or `except` blocks that hide underlying errors.
5. **Suppressed linters or weakened tests:** disabling a check, skipping, deleting or loosening a test or assertion instead of solving the cause.

## Event-driven code hygiene

Do not run dead-code linters on routine forward additions or new features. Run an orphan check **only** when triggered by:
1. **Dependency changes:** adding, removing, or replacing packages in package manifests or lockfiles (a version bump alone does not trigger it).
2. **Export replacements:** rewriting or replacing an existing exported function, type, or module.
3. **Test removals:** deleting test files or test assertions (confirm the underlying code is still used).
4. **Explicit pivots:** prompts or tasks specifying replacement, migration, deprecation, or a change of direction.

When a trigger fires, verify and remove orphaned symbols before completing the task, using the command in OPERATIONS.md "Hygiene and maintenance"; if none is configured, check by hand with grep.

## This project

<fill: only what differs from the principles: linter and formatter choices, naming exceptions, licence rules (dependency rules live in ARCHITECTURE.md), and the technical decisions of this project, each with Why and Revisit if>
