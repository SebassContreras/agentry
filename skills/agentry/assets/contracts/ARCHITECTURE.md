# Architecture

> Owns: the layers, the allowed direction of dependencies and the boundaries · Not here: how code is written (ENGINEERING.md), procedures (OPERATIONS.md); no file listings, they go stale

## Layers

<fill: one line per layer: its name, its responsibility and what it may depend on>

## Boundaries

<fill: what talks to what, what crosses a process or network edge, and the external systems involved>

## Dependencies

<fill: core frameworks, libraries and primitives allowed across layers, and the rule for proposing new ones>

## Invariants

<fill: rules that hold across layers, for example "domain code never imports an adapter or a transport". End each with how it is checked (a command or test, e.g. dependency-cruiser, import-linter, ArchUnit) or the word "unchecked"; the checks run in the Verify command of TESTING.md>

## Decisions

<fill: recorded architecture decisions. Every decision must state:
- Decision: what was decided
- Why: the concrete reason
- Revisit if: the observable condition that invalidates it
- Trade-off (only if hard to reverse): the rejected alternative, the cost of this choice and its mitigation>
