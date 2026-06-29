// ────────────────────────────────────────────────────────────────────────────
// ─── ITEM STATS ─────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────

// ─── Item Boundaries ────────────────────────────────────────────────────────

const FLAT_HP_POOL_MOD_MIN_VALUE = 0;
const FLAT_HP_POOL_MOD_MAX_VALUE = 1000;
const FLAT_ARMOR_MOD_MIN_VALUE = 0;
const FLAT_ARMOR_MOD_MAX_VALUE = 100;
const FLAT_SPELL_BLOCK_MOD_MIN_VALUE = 0;
const FLAT_SPELL_BLOCK_MOD_MAX_VALUE = 100;

const BOUNDARIES = {
  FLAT_HP_POOL_MOD_MIN_VALUE,
  FLAT_HP_POOL_MOD_MAX_VALUE,
  FLAT_ARMOR_MOD_MIN_VALUE,
  FLAT_ARMOR_MOD_MAX_VALUE,
  FLAT_SPELL_BLOCK_MOD_MIN_VALUE,
  FLAT_SPELL_BLOCK_MOD_MAX_VALUE,
};

export default {
  boundaries: BOUNDARIES,
} as const;
