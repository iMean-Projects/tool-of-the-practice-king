// ────────────────────────────────────────────────────────────────────────────
// ─── SHARDS CONSTANTS ───────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────

// ─── Shard Slot Categories ──────────────────────────────────────────────────
const OFFENSE_SLOT_CATEGORY = "Offense";
const FLEX_SLOT_CATEGORY = "Flex";
const DEFENSE_SLOT_CATEGORY = "Defense";
const SHARD_SLOT_CATEGORIES = [
  OFFENSE_SLOT_CATEGORY,
  FLEX_SLOT_CATEGORY,
  DEFENSE_SLOT_CATEGORY,
] as const;

// ─── Shard Slot Array Boundaries ────────────────────────────────────────────
const SHARD_SLOT_ARRAY_LENGTH = 3;
const SHARD_SLOT_MIN_INDEX = 0;
const SHARD_SLOT_MAX_INDEX = SHARD_SLOT_ARRAY_LENGTH - 1;
const SHARD_SELECTION_ARRAY_LENGTH = 3;

// ─── Export ───────────────────────────────────────────────────────────
export default {
  categories: {
    OFFENSE_SLOT_CATEGORY,
    FLEX_SLOT_CATEGORY,
    DEFENSE_SLOT_CATEGORY,
    SHARD_SLOT_CATEGORIES,
  },
  SHARD_SLOT_ARRAY_LENGTH,
  SHARD_SLOT_MIN_INDEX,
  SHARD_SLOT_MAX_INDEX,
  SHARD_SELECTION_ARRAY_LENGTH,
} as const;
