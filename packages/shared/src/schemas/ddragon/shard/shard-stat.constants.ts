// ────────────────────────────────────────────────────────────────────────────
// ─── SHARD STATS CONSTANTS ──────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────

// ─── Shard Stat Names ───────────────────────────────────────────────────────────
const ADAPTIVE_FORCE_STAT_NAME = "AdaptiveForce";
const ABILITY_HASTE_STAT_NAME = "AbilityHaste";
const MOVESPEED_STAT_NAME = "Movespeed";
const ATTACK_SPEED_STAT_NAME = "AttackSpeed";
const FLAT_HEALTH_STAT_NAME = "FlatHealth";
const SCALING_HEALTH_STAT_NAME = "ScalingHealth";
const TENACITY_AND_SLOW_RESIST_STAT_NAME = "TenacityAndSlowResist";

const SHARD_STAT_NAMES = [
  ADAPTIVE_FORCE_STAT_NAME,
  ABILITY_HASTE_STAT_NAME,
  MOVESPEED_STAT_NAME,
  ATTACK_SPEED_STAT_NAME,
  FLAT_HEALTH_STAT_NAME,
  SCALING_HEALTH_STAT_NAME,
  TENACITY_AND_SLOW_RESIST_STAT_NAME,
] as const;

// ─── Shard Stat Kinds ───────────────────────────────────────────────────────
const FLAT_STAT_KIND_NAME = "Flat";
const SCALED_STAT_KIND_NAME = "Scaling";
const SHARD_STAT_KINDS = [FLAT_STAT_KIND_NAME, SCALED_STAT_KIND_NAME] as const;
const ON_LEVEL_SCALING_VARIABLE = "level";

export default {
  names: {
    ADAPTIVE_FORCE_STAT_NAME,
    ABILITY_HASTE_STAT_NAME,
    MOVESPEED_STAT_NAME,
    ATTACK_SPEED_STAT_NAME,
    FLAT_HEALTH_STAT_NAME,
    SCALING_HEALTH_STAT_NAME,
    TENACITY_AND_SLOW_RESIST_STAT_NAME,
    SHARD_STAT_NAMES,
  },
  kinds: {
    FLAT_STAT_KIND_NAME,
    SCALED_STAT_KIND_NAME,
    ON_LEVEL_SCALING_VARIABLE,
    SHARD_STAT_KINDS,
  },
} as const;
