# Engineering

> Owns: how code is written here, the principles and the stack conventions · Not here: commands (OPERATIONS.md), what to test and how (TESTING.md), the layer map (ARCHITECTURE.md)

## Principles

1. **KISS / YAGNI.** Build for today's need. Add an interface, adapter or abstraction only with 2+ concrete uses, 2+ implementations or a real test seam. Simple beats clever.
2. **One responsibility.** A file, module or function does one thing. If it does two unrelated things, split it.
3. **Compose, don't inherit.** Share logic through small functions and injected dependencies, not class hierarchies. A rule applied in two places lives in one function both call.
4. **Isolate vendors.** Business logic does not call a third-party SDK or API directly: it calls a project-owned interface that one adapter implements, so the vendor is swappable. Exception: a stable, single-use helper (a date or string library) may be called directly; say so in a comment.
5. **When in doubt.** Small interface, pure function, injected dependency.
6. **Follow the stack.** Use the language and framework's idiomatic conventions and match the existing code before adding a new style. Casing: `kebab-case` files (contract names such as `AGENTS.md` excepted), `PascalCase` types, `camelCase` functions and variables, `UPPER_SNAKE_CASE` constants.
7. **Write down trade-offs.** A significant choice records its pros, cons and mitigation where the decision lives: the spec's Design, the contract's Decisions section, or a code comment.
8. **Confirm with a source.** Before committing to an approach that rests on a fact outside the repo (an API's behavior, a version, a platform rule), look it up, prefer the official specification or docs, and cite `Source: <url> (accessed YYYY-MM-DD)`. Skip it for what a contract already says or what running it settles.
9. **Docs travel with behavior.** A change of behavior updates the contract or doc that describes it in the same task.

## Event-driven code hygiene

Do not run dead-code linters on routine forward additions or new features. Run an orphan check **only** when triggered by:
1. **Dependency changes:** adding, updating, or replacing packages in package manifests or lockfiles.
2. **Export replacements:** rewriting or replacing an existing exported function, type, or module.
3. **Test removals:** deleting test files or test assertions (confirm the underlying code is still used).
4. **Explicit pivots:** prompts or tasks specifying replacement, migration, deprecation, or a change of direction.

When a trigger fires, verify and remove orphaned symbols before completing the task.

## This project

<fill: only what differs from the principles: dependency and licence rules, linter and formatter choices, naming exceptions>
