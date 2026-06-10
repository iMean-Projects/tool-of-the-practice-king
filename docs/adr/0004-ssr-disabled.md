# ADR-0004: ssr-disabled

## Status

Accepted

## Context

React Router v7 framework mode supports server-side rendering. For this tool,
SSR would require a Node.js server to serve rendered HTML at runtime. The tool
is personal, has no SEO requirements, and no need for server-rendered responses.

## Decision

We will set `ssr: false` in the React Router configuration. The build output is
a fully static client bundle.

## Consequences

- Deployment requires only a static file host — no Node.js runtime needed for
  the frontend.
- SEO is not supported — acceptable for a personal tool.
- If SSR is ever needed (public exposure, SEO), enabling it requires introducing
  a Node.js server for the frontend and revisiting the deployment setup.
