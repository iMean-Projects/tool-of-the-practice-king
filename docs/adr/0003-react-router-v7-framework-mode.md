# ADR-0003: react-router-v7-framework-mode

## Status

Accepted

## Context

The frontend needs routing, data fetching before render, and URL-based build
identity (`/champion/:championId/build/:buildId`). The framework must support
loaders that run before the component tree renders, so that Data Dragon data and
saved builds are available immediately without client-side loading states driven
by `useEffect`.

The alternatives considered were:

- **Next.js** — provides loaders and file-based routing but introduces opinionated
  full-stack conventions (API routes, server components) that conflict with the
  existing Express backend.
- **React Router v7 framework mode** (formerly Remix) — provides file-based
  routing, loaders, and actions without imposing full-stack conventions. Keeps the
  frontend layer lightweight while the Express backend handles API concerns.
- **React Router v7 SPA mode** — provides routing without loaders running
  server-side. Insufficient because loaders are needed for pre-render data
  fetching.

## Decision

We will use React Router v7 in framework mode with `ssr: false`. All initial data
fetching is handled by route loaders. No `useEffect` data fetching for initial
data.

## Consequences

- Data Dragon data and saved builds are available before render — no loading
  spinner for initial page load.
- Nested route loaders run in parallel, not sequentially.
- `ssr: false` keeps deployment simple — the output is a static client bundle
  served without a Node server.
- Framework mode introduces an upgrade coupling to React Router's release cycle —
  breaking changes in the framework API require migration effort.
