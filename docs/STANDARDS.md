<!-- docs/STANDARDS.md -->
# Coding and Versioning Standards

## Code Principles

- **SOLID** — applied at every layer; single responsibility per module, depend on abstractions not implementations
- **Explicit over clever** — prefer readable, obvious code over compact or tricky solutions
- **Security-first** — all external input (URL params, API responses, user selections) is validated before use
- **No deprecated APIs** — if a deprecated API must be referenced, it is flagged explicitly in a comment and in the PR description
- **JSDoc on non-obvious functions** — anything with non-trivial logic, side effects, or a non-obvious signature gets a JSDoc block

---

## TypeScript

- `strict: true` in all `tsconfig.json` files — no exceptions
- No `any` — use `unknown` and narrow explicitly
- Shared types live in `packages/shared` — never duplicate types across `apps/client` and `apps/api`
- Prefer `type` over `interface` for data shapes; use `interface` only when extension via `extends` is intentional

---

## Testing

- **Approach:** Test-Driven Development where business logic is involved (stat computation, dummy recommendation algorithm)
- **Pattern:** Arrange / Act / Assert — strictly followed
- **Unit tests:** Pure functions in `packages/shared` and business logic modules
- **Component tests:** React Testing Library — test behavior, not implementation
- **No snapshot tests** — too brittle, too little signal

### Test file colocation

```
src/
  features/
    statComputation/
      statComputation.ts
      statComputation.test.ts     ← colocated with the module
```

---

## Git Workflow

### Branch naming

```
feat/short-description
fix/short-description
chore/short-description
docs/short-description
refactor/short-description
test/short-description
```

### Conventional Commits

Format: `<type>(scope): <description>`

| Type | When to use |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `chore` | Tooling, deps, config — no production code change |
| `docs` | Documentation only |
| `refactor` | Code change that is neither a fix nor a feature |
| `test` | Adding or updating tests |
| `style` | Formatting, lint fixes — no logic change |
| `perf` | Performance improvement |

**Examples:**

```
feat(client): add champion select route with Data Dragon loader
fix(shared): correct armor computation for multi-item builds
chore(api): scaffold Express server with TypeScript config
docs(architecture): add routing decision rationale
test(shared): add unit tests for dummy recommendation algorithm
```

### Rules

- Subject line: imperative mood, max 72 characters, no period at the end
- Breaking changes: append `!` after type/scope — `feat(api)!: change build endpoint contract`
- Reference issues in the footer when applicable: `Closes #12`

---

## ESLint

- Base config: `eslint-config-airbnb-typescript`
- No inline `eslint-disable` without a comment explaining why
- CI will fail on lint errors — warnings are reviewed, not ignored

---

## File and Folder Conventions

- `kebab-case` for file and folder names
- One component or module per file
- Feature-based folder structure under `src/features/` — not layer-based (`components/`, `hooks/`, etc.)

```
src/
  features/
    champion-select/
    build-composer/
    dummy-recommendation/
    stat-computation/
  routes/           ← React Router route files
  shared/           ← UI primitives reused across features (not business logic)
```

---

## Security Notes

- All Data Dragon responses are typed and validated before use — no direct pass-through to state
- URL params (`:championId`, `:buildId`) are validated against known champion IDs before any file I/O or API call
- JSON file paths are constructed from a whitelist — never interpolated directly from user input

> ⚠️ If the tool is ever made public, a full security review of the file I/O layer is required before deployment.
