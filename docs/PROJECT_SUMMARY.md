<!-- docs/PROJECT_SUMMARY.md -->
# Project Summary

## Purpose

A personal tool to streamline the setup of Practice Tool Dummies in League of Legends.

When testing a champion matchup in the Practice Tool, configuring the Dummy to reflect a real opponent's stats (base stats + their build) is tedious and error-prone. This tool automates the computation and recommends the exact items and rune shards to apply to the Dummy.

---

## Problem Statement

The Practice Tool Dummy has fixed base stats:

| Stat | Value |
|---|---|
| HP | 1000 (cannot be reduced) |
| Armor | 0 |
| Magic Resist | 0 |

To simulate a real champion, the user must manually find items and rune shards that bring the Dummy's stats as close as possible to the target champion's full stat block (base stats + build bonuses). This tool does that automatically.

---

## Core Features

### Build Composer

- Select a champion from the latest Data Dragon patch
- Select items (0 to full build) and rune shards
- Compute the champion's effective stat block:

```
effective_stat = champion_base_stat + sum(item_bonuses) + sum(rune_shard_bonuses)
```

> Only raw stat summation — no multiplicative or derived stats (e.g. no effective HP calculation) in the current scope.

### Dummy Recommendation

- Given the champion's computed stat block, find a combination of items and rune shards to apply to the Dummy
- Dummy starts at 0 armor / 0 MR, so the full effective stat must be covered (not just the bonus)
- When no exact match exists: take the closest value, exceeding is acceptable
- HP matching is **deferred** to a future milestone

### Build Persistence

- Builds are saved per champion in a JSON file
- Stats are **recomputed on load** against the latest Data Dragon patch to stay current
- Each build has a unique identity (champion ID + build ID) reflected in the URL

---

## Scope Boundaries

| In scope | Out of scope (current) |
|---|---|
| Raw stat summation | Multiplicative stat interactions |
| Items + rune shards | Keystones, secondary runes, summoner spells |
| Latest patch only | Historical patch comparison |
| JSON file storage | Cloud sync, user accounts |
| Personal use | Public auth, multi-user |
| Armor / MR / flat stats | Effective HP calculation |

---

## Future Milestones

- **Effective HP matching** — propose a Dummy build that matches the champion's effective HP (HP × damage reduction factor), not just raw HP
- **Public exposure** — expose the tool via the Express API for other users
- **MongoDB migration** — move from JSON files to MongoDB when multi-user or remote access is needed
