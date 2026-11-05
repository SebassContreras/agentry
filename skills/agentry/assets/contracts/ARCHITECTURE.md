# Architecture

> Owns: the layers, the allowed direction of dependencies and the boundaries · Not here: how code is written (ENGINEERING.md), procedures (OPERATIONS.md); no file listings, they go stale

## Layers

<fill: one line per layer: its name, its responsibility and what it may depend on>

## Boundaries

<fill: what talks to what, what crosses a process or network edge, and the external systems involved>

## Invariants

<fill: rules that hold across layers, for example "domain code never imports an adapter or a transport">

## Decisions

<fill: recorded architecture decisions. Every decision must state:
- Decision: what was decided
- Why: the concrete reason
- Revisit if: the observable condition that invalidates it>
