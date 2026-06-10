# ADR-0002: shared-types-package

## Status

Accepted

## Context

The project has two runtime packages (`apps/client` and `apps/api`) that operate
on the same data shapes — champion stats, build contracts, and recommendation
output. Without a shared source of truth for types, the same interfaces would need
to be duplicated across both packages, creating drift risk when the data model
evolves.

The stat computation and dummy recommendation logic must be typed consistently
across the API boundary. If computation moves server-side later, the code moves
but the types should not need to change.

## Decision

We will maintain a dedicated `packages/shared` package containing all TypeScript
interfaces and types shared across `apps/client` and `apps/api`. Neither app
package defines its own types for cross-boundary data shapes.

## Consequences

- Type definitions have a single source of truth — changes propagate to both
  packages automatically.
- `packages/shared` must be built before `apps/client` or `apps/api` — this
  dependency is declared in Turborepo and handled automatically.
- A server-side migration of business logic requires moving code only —
  shared types survive intact.
- `packages/shared` must remain free of runtime dependencies — it is a types-only
  package.
