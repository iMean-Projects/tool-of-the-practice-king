# ADR-0005: express-over-nestjs

## Status

Accepted

## Context

The project requires an HTTP server to handle build persistence (read, write,
list builds per champion) and to serve as the future public API surface if the
tool is ever exposed to other users.

The alternatives considered were:

- **NestJS** — opinionated framework with decorators, a DI container, and a
  module system. Provides structure at scale but introduces significant overhead
  for a minimal API surface.
- **Express** — minimal, unopinionated HTTP framework. Requires explicit structure
  but imposes no conventions beyond what the project defines.

The current API surface is small and may remain so. NestJS overhead is not
justified at this stage. If the API grows significantly in complexity, migration
from Express to NestJS is straightforward.

## Decision

We will use Express 5.x with TypeScript as the HTTP server. Structure is enforced
via project conventions, not framework conventions.

## Consequences

- No DI container, no decorator system — application structure is explicit and
  owned by the project.
- Middleware, error handling, and request validation must be set up manually —
  no framework defaults.
- Migration to NestJS is possible if complexity grows, but is not a trivial
  refactor — it requires adopting the module and DI patterns.
