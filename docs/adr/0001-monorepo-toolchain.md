# ADR-0001: monorepo-toolchain

## Status

Accepted

## Context

The project is structured as a monorepo containing multiple packages
(`apps/client`, `apps/api`, `packages/shared`) that must be built, tested, and
linted in a coordinated way. The toolchain must ensure a consistent, reproducible
development environment across all packages.

Four concerns drove the toolchain selection:

- **Node version consistency** — the project must run on a pinned Node version
  across all environments. fnm was chosen over nvm (Windows support is WSL-only,
  slow shell-based) and Volta (experimental and broken pnpm support on Windows in
  monorepo setups).

- **Package manager version consistency** — pnpm version drift across contributors
  silently breaks workspace resolution. Corepack, shipped with Node.js since
  v16.9, enforces the pinned pnpm version declared in `packageManager` in the root
  `package.json` without requiring a manual install step.

- **Workspace management** — pnpm was chosen over npm and Yarn for its strict
  dependency linking (no phantom dependencies) and significantly lighter disk
  footprint via its symlink-based store.

- **Task orchestration** — packages have build dependencies on each other
  (`packages/shared` must be built before `apps/client` or `apps/api`). Turborepo
  was chosen over Nx (heavier, more opinionated) and Lerna (deprecated task
  orchestration) for its dependency-aware execution, incremental caching, and
  parallel task running with minimal configuration.

## Decision

We will use fnm for Node version management, Corepack for package manager version
enforcement, pnpm for workspace management, and Turborepo for task orchestration.
Node version is pinned in `.nvmrc`. pnpm version is pinned via the `packageManager`
field in the root `package.json`.

## Consequences

- Development environment setup is reproducible and consistent across machines.
- Corepack must be enabled once per Node installation after fnm switches to a new
  version (`corepack enable`).
- Phantom dependency issues are caught early by pnpm's strict linking — some
  packages that rely on hoisted dependencies in npm may require explicit
  declaration.
- Turborepo's incremental cache must be invalidated manually if task inputs change
  outside of tracked source files (e.g. environment variables not declared in
  `turbo.json`).
- Volta cannot be used as an alternative — its pnpm support in monorepo setups on
  Windows is unsupported in practice.
