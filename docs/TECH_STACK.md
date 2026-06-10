<!-- docs/TECH_STACK.md -->

# Tech Stack

## Frontend — `apps/client`

| Tool         | Version              | Role                                 |
| ------------ | -------------------- | ------------------------------------ |
| React        | 19.x                 | UI component library                 |
| React Router | 7.x (framework mode) | File-based routing, loaders, actions |
| TypeScript   | 5.x                  | Type safety across the app           |
| Vite         | 6.x                  | Build tool (via RR framework plugin) |

## Backend — `apps/api`

| Tool       | Version  | Role                         |
| ---------- | -------- | ---------------------------- |
| Node.js    | 22.x LTS | Runtime                      |
| Express    | 5.x      | HTTP server (scaffolded)     |
| TypeScript | 5.x      | Type safety                  |
| Mongoose   | 8.x      | MongoDB ORM (scaffolded)     |
| MongoDB    | 8.x      | Document database (deferred) |

## Shared — `packages/shared`

| Tool       | Role                                                                       |
| ---------- | -------------------------------------------------------------------------- |
| TypeScript | Shared interfaces — champion stats, build shapes, recommendation contracts |

## Testing

| Tool                  | Role                       |
| --------------------- | -------------------------- |
| Jest                  | Unit and integration tests |
| React Testing Library | Component tests            |
| ts-jest               | TypeScript support in Jest |

## Code Quality

| Tool                   | Role                               |
| ---------------------- | ---------------------------------- |
| ESLint                 | Linting — Airbnb TypeScript config |
| Prettier               | Formatting                         |
| TypeScript strict mode | Maximum type safety                |

## External Data

| Source                                                 | Role                                                                  |
| ------------------------------------------------------ | --------------------------------------------------------------------- |
| [Data Dragon CDN](https://ddragon.leagueoflegends.com) | Champion base stats, item data, rune shard data — always latest patch |

---

## Rationale for key choices

**React Router v7 framework mode over Next.js**
RR v7 framework mode (formerly Remix) provides loaders, file-based routing, and SSR
readiness without the opinionated full-stack conventions of Next.js. Given the Express
backend is already part of the stack, keeping the frontend framework lightweight is
the right call. See ADR-0003.

**Express over NestJS**
The API surface is minimal and may stay that way. NestJS overhead (decorators, modules,
DI container) is not justified. If complexity grows, migration to NestJS is
straightforward. See ADR-0005.

**MongoDB over relational databases**
Builds are document-shaped (variable item arrays, nested rune structure). A document
store is a natural fit. MongoDB is the deferred migration target from JSON files —
not currently active. See ADR-0007.

**JSON files before MongoDB**
No infrastructure overhead for a personal tool. The abstraction boundary (a repository
interface in `packages/shared`) means the storage layer can be swapped without touching
business logic. See ADR-0007.

**pnpm + Corepack over npm/Yarn**
Strict dependency linking catches phantom dependency issues early. Significantly lighter
on disk via symlink-based store. Corepack enforces the pinned pnpm version declared in
`packageManager` — prevents silent version drift across environments. See ADR-0001 and
`TOOLING.md` for full rationale.
