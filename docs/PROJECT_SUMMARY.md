<!-- docs/PROJECT_SUMMARY.md -->

# Project Summary

## Purpose

A personal tool to streamline the setup of Practice Tool Dummies in League of Legends.

When testing a champion matchup in the Practice Tool, configuring the Dummy to reflect a real opponent's stats (base stats + their build) is tedious and error-prone. This tool automates the computation and recommends the exact items and rune shards to apply to the Dummy.

---

## Problem Statement

The Practice Tool Dummy has fixed base stats:

| Stat         | Value                    |
| ------------ | ------------------------ |
| HP           | 1000 (cannot be reduced) |
| Armor        | 0                        |
| Magic Resist | 0                        |

To simulate a real champion, the user must manually find items and rune shards that bring the Dummy's Effective HP (EHP) as close as possible to the target champion's EHP at a given level. This tool does that automatically.

---

## Core Features

### Build Composer

- Select a champion from the latest Data Dragon patch
- Select a champion level (1–18)
- Select items (0 to full build) and rune shards
- Compute the champion's Effective HP stat block:

```
hp(level)     = base_hp + hpperlevel × (level - 1) × (0.7025 + 0.0175 × (level - 1))
armor(level)  = base_armor + armorperlevel × (level - 1) × (0.7025 + 0.0175 × (level - 1))
mr(level)     = base_mr + mrperlevel × (level - 1) × (0.7025 + 0.0175 × (level - 1))

effective_hp  = hp(level) + Σ(item flat HP bonuses) + Σ(shard HP bonuses at level)
effective_ar  = armor(level) + Σ(item flat AR bonuses) + Σ(shard AR bonuses)
effective_mr  = mr(level) + Σ(item flat MR bonuses) + Σ(shard MR bonuses)

ehp_physical  = effective_hp × (1 + effective_ar / 100)
ehp_magic     = effective_hp × (1 + effective_mr / 100)
```

> Scaling rune shards (e.g. Bonus Health based on level) are interpolated linearly:
> `shard_value(level) = min + (max - min) × (level - 1) / 17`

> Only defensive stats are in scope — HP, Armor, Magic Resist. No multiplicative or offensive stat interactions.

### Dummy Recommendation

- Given the champion's computed EHP at a given level, find a combination of items and rune shards to apply to the Dummy
- Dummy starts at HP 1000 / AR 0 / MR 0, so the full effective stat must be covered (not just the bonus)
- When no exact match exists: take the closest value, exceeding is acceptable

### Build Persistence

- Builds are saved per champion in a JSON file
- Stats are **recomputed on load** against the latest Data Dragon patch and the selected level to stay current
- Each build has a unique identity (champion ID + build ID) reflected in the URL

---

## Scope Boundaries

| In scope                                               | Out of scope (current)                      |
| ------------------------------------------------------ | ------------------------------------------- |
| EHP computation (HP, AR, MR)                           | Offensive stats (AD, AP, AS, crit...)       |
| Level scaling (1–18) for base stats and scaling shards | Multiplicative stat interactions            |
| Items + rune shards                                    | Keystones, secondary runes, summoner spells |
| Latest patch only                                      | Historical patch comparison                 |
| JSON file storage                                      | Cloud sync, user accounts                   |
| Personal use                                           | Public auth, multi-user                     |

---

## Future Milestones

- **Public exposure** — expose the tool via the Express API for other users
- **MongoDB migration** — move from JSON files to MongoDB when multi-user or remote access is needed
