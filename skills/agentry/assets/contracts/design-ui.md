# Design

> Owns: how the interface looks and behaves: tokens, components, states, accessibility and copy · Not here: code structure (ARCHITECTURE.md), code rules (ENGINEERING.md)

## Language

<fill: the language of every string the user sees, and whether more languages are planned (i18n); date, number and currency formats. This is the product's language, not the one the agent speaks to the developer (AGENTS.md)>

## Tokens and theme

<fill: pointer to the design system's source of truth (e.g. app/globals.css, tailwind.config.ts, tokens.json).
Rule: never hardcode hex colors, magic pixel margins or ad-hoc shadows inline; always reference defined theme tokens and CSS variables.>

## UI and interaction states

Every interactive component must explicitly provide visual handling for:
- **Default and hover:** standard and pointer feedback.
- **Focus:** visible focus ring meeting WCAG (keyboard navigation).
- **Disabled:** distinct visual cue, exposed to assistive technology (`disabled` or `aria-disabled`), not only by blocking pointer events.
- **Loading:** skeleton loaders or spinners; prevents layout shifts.
- **Empty and error:** clear empty-state visual and accessible error message.

## Accessibility

Meet WCAG 2.2 AA (a superset of 2.1 AA): text contrast of at least 4.5:1 (3:1 for large text and for UI components), visible focus that is not hidden behind other content, everything reachable by keyboard, labelled controls, targets of at least 24×24 CSS px, errors identified in text.

## Copy and tone

<fill: voice, person and how errors read>
