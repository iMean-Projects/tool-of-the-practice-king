# ADR-0008 — Runtime Validation Strategy with Zod

**Status:** Accepted  
**Date:** 2026-06-12

---

## Context

The application consumes data from three external boundaries, each of which is untrusted at runtime:

| Boundary                                        | Source                | Risk                                                           |
| ----------------------------------------------- | --------------------- | -------------------------------------------------------------- |
| Data Dragon CDN responses                       | External API          | Shape can change silently on a new patch                       |
| URL parameters (`:championId`, `:buildId`)      | User-controlled       | Used to construct file paths — injection vector if unvalidated |
| JSON file reads (`apps/api/data/builds/*.json`) | Runtime-written files | Corrupted or schema-drifted files cause silent failures        |

`STANDARDS.md` already mandates that all external input is validated before use, and that Data Dragon responses are typed and validated before being passed to state. However, no enforcing mechanism existed — this policy was a convention without a runtime guarantee.

TypeScript types are compile-time constructs. They are erased at runtime and provide no protection against malformed payloads, unexpected API shapes, or corrupted storage. A separate runtime validation layer is required to enforce the contract at each boundary.

Additionally, `packages/shared` currently holds TypeScript `type` and `interface` definitions. As validation is introduced, a decision is needed on where the source of truth lives: in TypeScript types (compile-time only) or in runtime schemas from which types are derived.

---

## Decision

### 1. Zod is adopted as the runtime validation library

Zod is added as a dependency of `packages/shared`. It provides schema definition, runtime parsing, and TypeScript type inference from a single source — eliminating the need to maintain parallel type declarations alongside validation logic.

### 2. Schemas are the source of truth — types are derived, not declared separately

All shared data shapes are defined as Zod schemas. TypeScript types are inferred from those schemas using `z.infer<>` and exported alongside the schema from the same file. No standalone `type` or `interface` declarations are maintained for shapes that cross a validation boundary.

```
packages/shared/
  src/
    schemas/
      champion.schema.ts       ← ZodSchema + inferred type, colocated
      build.schema.ts
      recommendation.schema.ts
      params.schema.ts
```

Each schema file follows this structure:

```ts
import { z } from 'zod'

export const ChampionSchema = z.object({ ... })

/** Derived from ChampionSchema — do not declare separately. */
export type Champion = z.infer<typeof ChampionSchema>
```

Consumers import both from the same location:

```ts
import { ChampionSchema, type Champion } from "@repo/shared/schemas/champion";
```

A separate `types/` folder is only appropriate for internal shapes that never cross a validation boundary (e.g. local UI state, generic utility types). Any shape that is serialized, fetched, or read from storage must have a Zod schema.

### 3. Validation is fail-fast — `parse()` over `safeParse()` at boundaries

At all external data boundaries, `Schema.parse()` is used. If the input does not conform to the schema, Zod throws a `ZodError` immediately. No silent fallback, no partial data, no swallowed errors.

`safeParse()` is reserved for cases where the call site explicitly needs to branch on success or failure without throwing — for example, conditional UI logic. It is never used at loader boundaries as a substitute for error handling.

### 4. Loaders are the single enforcement point on the client

In `apps/client`, all validation runs inside React Router loaders. Loaders execute before render; a thrown `ZodError` is caught by React Router and passed to the nearest `ErrorBoundary` in the route tree. No validation runs inside components.

```ts
// Example: apps/client/app/routes/champion.$championId.tsx
export async function loader({ params }: Route.LoaderArgs) {
  const { championId } = ParamsSchema.parse(params);
  const raw = await fetchChampionFromDragon(championId);
  const champion = ChampionSchema.parse(raw);
  return { champion };
}
```

### 5. Validation runs independently in each process

`packages/shared` exports schemas. Both `apps/client` and `apps/api` import and execute those schemas independently within their own process. The client does not trust the API; the API does not trust the client. Shared schemas ensure consistency of the contract — not shared execution.

### 6. Error surfaces via layered React Router ErrorBoundaries

Each route file exports an `ErrorBoundary` component scoped to what that route semantically owns. Errors bubble up the route tree and are caught by the nearest boundary — matching the same escalation model as exception handling.

```
root.tsx                                          ← last-resort catch-all
  └── champion.$championId.tsx                    ← champion / Data Dragon failures
        └── champion.$championId.build.$buildId   ← build load / JSON read failures
```

Given this is a personal tool, `ErrorBoundary` components render Zod error details (failed path, received value) directly — optimising for debugging speed over end-user polish. This decision is revisited if the tool is ever made public (see ADR future milestone reference in `PROJECT_SUMMARY.md`).

---

## Consequences

### Positive

- Runtime contract enforcement at every external boundary — policy is now mechanically guaranteed, not convention-dependent
- Single source of truth: schemas own both the runtime shape and the TypeScript type — no drift between validation logic and type declarations
- Fail-fast behaviour makes data contract violations immediately visible — no silent corruption propagates into state or storage
- Layered error boundaries contain failures at the appropriate route level — a build load failure does not degrade the champion page

### Negative

- Zod becomes a runtime dependency of `packages/shared`, which means both `apps/client` and `apps/api` carry it in their bundle/process — acceptable at this scale
- Schema definitions require more upfront effort than plain `type` declarations — justified by the elimination of an entire class of runtime bugs
- `safeParse()` / `parse()` discipline must be maintained actively — documented in `STANDARDS.md`

### Neutral

- Existing plain `type` declarations in `packages/shared` are migrated to Zod schemas incrementally as each boundary is implemented — no big-bang rewrite required

---

## Alternatives Considered

**Plain TypeScript types with manual assertion functions**  
Would require hand-written type guards for every schema — more code, more maintenance, same runtime guarantees Zod provides out of the box. Rejected.

**Valibot**  
Smaller bundle footprint than Zod. Rejected at this stage — Zod has broader ecosystem integration (React Hook Form, tRPC, Drizzle) that may be relevant in future milestones. Decision can be revisited if bundle size becomes a concern.

**Validation only in `apps/api`, client trusts API responses**  
Violates the independent process validation principle. The client fetches directly from Data Dragon — there is no API mediation for that boundary. Rejected.

---

## References

- `STANDARDS.md` — Security Notes, TypeScript strict mode
- `ARCHITECTURE.md` — Data Flow, Storage, Key Architectural Decisions
- `PROJECT_SUMMARY.md` — Future Milestones (public exposure)
- ADR-0007 — JSON file storage strategy (boundary this ADR protects)
