<!-- docs/TOOLING.md -->
# Tooling

Developer environment setup, toolchain decisions, and rationale.

---

## Node Version Management — fnm

**Tool:** [fnm](https://github.com/Schniz/fnm) (Fast Node Manager)

fnm manages the Node.js runtime version per project. It reads `.nvmrc` at the project root and switches automatically when entering the directory.

### Why fnm over alternatives

| | fnm | nvm | Volta |
|---|---|---|---|
| Windows support | First-class | WSL only | First-class |
| Speed | Fast (Rust) | Slow (shell) | Fast (Rust) |
| Auto-switch | Yes (with shell hook) | Yes (with shell hook) | Yes |
| pnpm pinning | N/A — not its responsibility | N/A | Experimental, broken on Windows + monorepo |

**Why not Volta:** Volta's pnpm support is experimental and has known failures on Windows in monorepo workspace setups — which is exactly this project's configuration. Volta + pnpm + Windows + monorepo is an unsupported combination in practice.

### Configuration

Node version is pinned in `.nvmrc` at the monorepo root:

```
22
```

fnm reads this file automatically when entering the project directory (requires shell hook — see [fnm docs](https://github.com/Schniz/fnm#shell-setup) for setup).

---

## Package Manager — pnpm + Corepack

**Tools:** [pnpm](https://pnpm.io) managed by [Corepack](https://nodejs.org/api/corepack.html)

pnpm is the workspace manager for the monorepo. Its version is pinned via the `packageManager` field in the root `package.json`:

```json
{
  "packageManager": "pnpm@10.x.x"
}
```

Corepack — shipped with Node.js since v16.9 — intercepts calls to `pnpm` and enforces the pinned version. If the declared version is not locally cached, Corepack fetches it transparently.

### Why Corepack over a global pnpm install

| Concern | Global install | Corepack |
|---|---|---|
| Version drift | Silent — global pnpm upgrades independently | Prevented — pinned version always runs |
| Enforcement | Convention only | Hard constraint via `packageManager` field |
| Onboarding | Requires manual install step | Automatic once Corepack is enabled |

### Setup (once per Node installation)

When fnm switches to a new Node version, Corepack must be enabled on that installation:

```bash
fnm install 22
fnm use 22
corepack enable
```

After this, any project with a `packageManager` field automatically uses the declared pnpm version.

---

## Build Orchestration — Turborepo

**Tool:** [Turborepo](https://turbo.build/repo)

Turborepo orchestrates tasks across the monorepo with three core benefits:

**Dependency-aware execution.** Tasks declare their dependencies (`build` in `apps/client` depends on `build` in `packages/shared`). Turborepo ensures correct execution order automatically.

**Incremental caching.** Task inputs (source files, env vars, dependencies) are hashed. If nothing changed, the cached output is replayed — no re-execution.

**Parallel execution.** Independent tasks (e.g. `lint` in `apps/client` and `lint` in `apps/api`) run concurrently.

### Configuration

Turborepo is configured in `turbo.json` at the monorepo root:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "lint": {},
    "test": {
      "dependsOn": ["^build"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

`"^build"` means: run `build` in all dependencies of this package before running `build` here. This ensures `packages/shared` is always compiled before `apps/client` or `apps/api` consume it.

---

## Toolchain Summary

| Concern | Tool | Pinned via |
|---|---|---|
| Node.js version | fnm | `.nvmrc` at monorepo root |
| Package manager version | pnpm + Corepack | `packageManager` in root `package.json` |
| Monorepo task orchestration | Turborepo | `turbo.json` at monorepo root |
| Workspace management | pnpm workspaces | `pnpm-workspace.yaml` at monorepo root |
