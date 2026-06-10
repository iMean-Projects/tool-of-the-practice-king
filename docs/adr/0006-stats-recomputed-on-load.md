# ADR-0006: stats-recomputed-on-load

## Status

Accepted

## Context

League of Legends champion base stats, item stats, and rune shard values change
with each game patch via the Data Dragon CDN. If stat values were stored alongside
builds, they would become stale whenever a new patch is released, requiring either
a migration job or manual invalidation.

Builds contain only item IDs and rune shard IDs — not the stat values those IDs
resolve to. Stat values are always fetched from Data Dragon at load time and
recomputed client-side.

## Decision

Stat values are never persisted. Builds store item IDs and rune shard IDs only.
Stats are recomputed on every load against the latest Data Dragon patch.

## Consequences

- Build stat blocks are always current with the latest patch — no stale data.
- A patch that changes item or rune stats is reflected automatically on next load
  with no migration needed.
- If Data Dragon is unavailable, builds cannot be loaded — there is no offline
  fallback.
- Recomputation on load adds a Data Dragon fetch on every route load — acceptable
  given the CDN availability and response size.
