# ADR-0009 — Stat Computation Model and `packages/shared` Internal Structure

**Status:** Accepted  
**Date:** 2026-06-29

---

## Context

The core feature of this tool is computing a champion's combat effectiveness at a given level and build, then using that computation to recommend a Dummy configuration that matches as closely as possible.

Several design decisions were required before implementation could begin:

1. **What stats to target** — the Dummy has a fixed HP floor of 1000 and starts at 0 AR / 0 MR. Raw stat matching is not meaningful because HP cannot be reduced below 1000. A model that relates HP, AR, and MR into a single comparable value is needed.

2. **Level scaling** — champion base stats in Data Dragon are level 1 values. Stats scale non-linearly with level. Rune shards can also scale with level. A level-agnostic computation would be inaccurate.

3. **`packages/shared` internal structure** — as schemas and computation logic grew, the original flat `schemas/` folder was insufficient. Three distinct responsibilities needed to be separated: external API contracts, game domain constraints, and derived computation output.

4. **ISP at the file level** — the computation function and its output type serve different consumers. A consumer that only needs the `ChampionCombatStats` type should not pull in the computation function.

---

## Decisions

### 1. EHP as the matching model

Instead of matching raw HP, AR, and MR independently, the tool computes Effective HP (EHP) — a single value that expresses the total damage a champion can absorb before dying.

```
ehpPhysical = hp × (1 + armor / 100)
ehpMagic    = hp × (1 + magicResist / 100)
```

This is the standard League of Legends EHP formula. It correctly models the relationship between HP and resistances, and produces a value that is meaningful to compare between the champion and the Dummy.

**Why not raw stats?** The Dummy HP floor of 1000 means raw HP matching is impossible for champions with less than 1000 HP at level 1 (which is all of them). EHP absorbs this constraint — the Dummy's items and shards can be tuned to match EHP regardless of the HP floor.

### 2. Level as an explicit user input (1–18)

Champion base stats scale with level via the Data Dragon growth formula:

```
stat(level) = base + growth × (level - 1) × (0.7025 + 0.0175 × (level - 1))
```

Scaling rune shards (e.g. Bonus Health based on level) are interpolated linearly:

```
shardValue(level) = min + (max - min) × (level - 1) / 17
```

Level is user-selected (1–18) and validated at the loader boundary via `LevelSchema` before reaching the computation function. The selected level is persisted in the build JSON alongside item and shard IDs so that stats can be correctly recomputed on load.

### 3. `packages/shared` internal structure

Three folders with distinct responsibilities:

```
packages/shared/src/
  schemas/
    ddragon/     ← Data Dragon API contracts — what we receive from the CDN
    domain/      ← Game domain constraints — rules intrinsic to the game itself
  computation/   ← Derived types and pure functions — what we produce
```

**`schemas/ddragon/`** mirrors Data Dragon response shapes. Keys are kept as-is from the API (e.g. `FlatHPPoolMod`, `FlatArmorMod`). Any schema here answers: "what shape does Data Dragon send us?"

**`schemas/domain/`** encodes game domain constraints that are not Data Dragon contracts. `LevelSchema` (`z.number().int().min(1).max(18)`) is the first resident. Any schema here answers: "what are the structural rules of the game domain?"

**`computation/`** holds derived output types and pure functions. Nothing here is fetched or serialized — it is always produced by the computation layer. `ChampionCombatStats` and `computeChampionStats` live here. Future: `DummyRecommendation` and its algorithm.

This separation makes the origin and authority of any type immediately clear to a reader without requiring them to open the file.

### 4. Type definition separated from computation function (ISP)

Within `computation/champion-combat-stats/`, the output type and the function are in separate files:

```
champion-combat-stats.types.ts        ← ChampionCombatStats type only
champion-combat-stats.computation.ts  ← computeChampionStats function only
```

A consumer that only needs the type (e.g. a UI component rendering the stat block) does not import the computation function. A consumer that only calls the function does not import the type file directly. Each file has one reason to change.

### 5. Defensive stats only in this milestone

The computation covers HP, Armor, and Magic Resist only. Offensive stats (AD, AP, AS, crit, lethality, pen) are out of scope for this milestone and will be revisited if the tool scope expands.

---

## Consequences

### Positive

- EHP provides a single comparable value that correctly models the HP/resistance relationship — raw stat matching is replaced by a more accurate model
- Level scaling makes the computation accurate at any point in the game, not just level 1 or level 18
- The three-folder structure in `packages/shared` makes the origin and responsibility of any schema or type immediately clear
- ISP at the file level means type consumers and function consumers are decoupled

### Negative

- EHP is computed independently for physical and magic damage — there is no single combined EHP value. The Dummy recommendation must satisfy both `ehpPhysical` and `ehpMagic` targets simultaneously, which makes the recommendation algorithm more constrained
- Level scaling adds a required input parameter that did not exist in the original scope — the UI must expose a level selector

### Neutral

- Data Dragon keys (`FlatHPPoolMod` etc.) are kept as-is in the item schema — no normalization. This is consistent with the existing champion stat schema which already uses Data Dragon's own key names (`hp`, `armor`, `spellblock`)

---

## Alternatives Considered

**Raw stat matching**
Rejected — the Dummy HP floor of 1000 makes raw HP matching impossible. EHP is the correct model.

**Fixed level (always level 18)**
Simpler implementation, no level selector in the UI. Rejected — a tool used to practice power spikes at specific levels would be inaccurate. Level as an explicit input costs one UI control and is the correct model.

**Single `schemas/` folder without subfolders**
Original structure. Rejected — as the number of schemas grew, the distinction between Data Dragon contracts, domain constraints, and computation output was lost. The three-folder structure restores that clarity.

**Normalizing Data Dragon item keys**
Rejected — existing champion stat schemas already use Data Dragon key names. Normalizing item keys would create an inconsistency within `schemas/ddragon/` itself.

---

## References

- `PROJECT_SUMMARY.md` — Scope Boundaries, Core Features
- `ARCHITECTURE.md` — `packages/shared` Internal Structure, Stat Computation Model
- ADR-0008 — Runtime Validation Strategy with Zod (boundary enforcement that feeds into computeChampionStats)
- ADR-0002 — Shared types package (original rationale for `packages/shared`)
