<!-- docs/ARCHITECTURE.md -->
# Architecture

## Monorepo Structure

```
lol-dummy-tool/
├── apps/
│   ├── client/                 # React Router v7 (framework mode, ssr: false)
│   └── api/                    # Express + TypeScript (scaffolded, minimal)
├── packages/
│   └── shared/                 # Shared TypeScript types (stats, builds, recommendations)
├── docs/                       # Project documentation
├── README.md
└── turbo.json                  # Turborepo pipeline configuration
```

### Package responsibilities

| Package | Role |
|---|---|
| `apps/client` | UI, routing, Data Dragon CDN fetching, build composition, dummy recommendation display |
| `apps/api` | Scaffolded Express server — no active role yet, ready for future public exposure |
| `packages/shared` | TypeScript interfaces and types shared across client and api — stat shapes, build contracts, recommendation output |

> **Why shared types now?** The dummy recommendation algorithm and stat computation logic must be typed consistently across the API boundary. If computation moves server-side later, code moves — not types.

---

## Data Flow

```
Data Dragon CDN
      │
      │  (fetch on load, always latest patch)
      ▼
  apps/client
      │
      ├── Champion base stats
      ├── Item stat bonuses
      └── Rune shard bonuses
              │
              ▼
      Stat computation
      (base + Σ items + Σ shards)
              │
              ├──────────────────────────┐
              ▼                          ▼
   Champion stat block         Dummy recommendation
   (displayed to user)         (closest item/shard combo
                                covering full stat value)
              │
              ▼
     JSON file storage
     (per champion, build identity = championId + buildId)
              │
              ▼
     Recomputed on load
     (always against latest patch)
```

---

## Routing

Built with **React Router v7 framework mode** (`ssr: false`).

| Route | Purpose |
|---|---|
| `/` | Champion select |
| `/champion/:championId` | Champion page — build composer, stat block, dummy recommendation |
| `/champion/:championId/build/:buildId` | Saved build loaded for a specific champion |

### Route conventions

- Each route file exports a `loader` for data fetching — runs before render
- Loaders at nested levels run **in parallel**, not sequentially
- No `useEffect` data fetching — all initial data comes through loaders

### Loader responsibilities

| Route | Loader fetches |
|---|---|
| `/champion/:championId` | Champion base stats from Data Dragon + list of saved builds |
| `/champion/:championId/build/:buildId` | Specific saved build from JSON file (stats recomputed client-side) |

---

## Storage

### Current: JSON files

```
apps/api/
  data/
    builds/
      .gitkeep          ← ensures folder exists on clone; contents are gitignored
      aatrox.json       ← generated at runtime, never committed
      ahri.json
      ...
```

**Key decisions:**
- `data/builds/` is **runtime storage** — files are created and updated while the app runs
- The folder is owned exclusively by the API process — the client never reads or writes files directly
- All build I/O goes through the Express API
- Contents are gitignored; only `.gitkeep` is committed to ensure the folder exists on clone

```gitignore
# in .gitignore
apps/api/data/builds/*
!apps/api/data/builds/.gitkeep
```

Each file contains an array of saved builds for that champion. Stats are never stored — only the selected item IDs and rune shard IDs. Stats are recomputed on load against the latest Data Dragon data.

```jsonc
// apps/api/data/builds/aatrox.json
[
  {
    "id": "uuid-v4",
    "name": "Full lethality",
    "championId": "Aatrox",
    "items": ["3142", "3814", "3071"],
    "shards": ["5008", "5002", "5003"],
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
]
```

### Future: MongoDB

MongoDB + Mongoose is scaffolded but not active. Migration path: replace JSON file read/write with Mongoose repository — shared types remain unchanged.

---

## Key Architectural Decisions

| Decision | Rationale |
|---|---|
| Framework mode over SPA mode | Loaders map cleanly to Data Dragon + JSON fetching before render; routes reflect build identity |
| `ssr: false` | Personal tool, no SEO or server rendering needed; keeps deployment simple |
| Stats recomputed on load | Ensures data is always current with latest patch — never stale stored values |
| Shared types package | Decouples type definitions from implementation; survives a server-side migration intact |
| Express scaffolded but minimal | Future-proofing for public exposure without blocking current development |
| JSON before MongoDB | Avoids infrastructure overhead for a personal tool; clear migration path when needed |
| `data/builds/` under `apps/api/` | Runtime storage owned by the API process — not a shared monorepo resource |
| `.gitkeep` in `data/builds/` | Ensures folder exists on clone without committing runtime files |
