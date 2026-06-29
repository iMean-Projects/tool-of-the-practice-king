// ────────────────────────────────────────────────────────────────────────────
// ─── ITEMS ──────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────

// ─── Health Tags ──────────────────────────────────────────────────────────────

const HEALTH_ITEM_TAG_NAME = "Health";
const HEALTH_REGEN_ITEM_TAG_NAME = "HealthRegen";
const ARMOR_ITEM_TAG_NAME = "Armor";
const SPELL_BLOCK_ITEM_TAG_NAME = "SpellBlock";
const DAMAGE_ITEM_TAG_NAME = "Damage";
const MANA_ITEM_TAG_NAME = "Mana";
const MANA_REGEN_ITEM_TAG_NAME = "ManaRegen";
const ABILITY_HASTE_ITEM_TAG_NAME = "AbilityHaste";
const CRITICAL_STRIKE_ITEM_TAG_NAME = "CriticalStrike";
const ATTACK_SPEED_ITEM_TAG_NAME = "AttackSpeed";
const LIFE_STEAL_ITEM_TAG_NAME = "LifeSteal";
const SPELL_VAMP_ITEM_TAG_NAME = "SpellVamp";
const SPELL_DAMAGE_ITEM_TAG_NAME = "SpellDamage";
const ON_HIT_ITEM_TAG_NAME = "OnHit";
const COOLDOWN_REDUCTION_ITEM_TAG_NAME = "CooldownReduction";
const NONBOOTS_MOVEMENT_ITEM_TAG_NAME = "NonbootsMovement";
const ARMOR_PENETRATION_ITEM_TAG_NAME = "ArmorPenetration";
const MAGIC_PENETRATION_ITEM_TAG_NAME = "MagicPenetration";
const TENACITY_ITEM_TAG_NAME = "Tenacity";
const SLOW_ITEM_TAG_NAME = "Slow";
const AURA_ITEM_TAG_NAME = "Aura";
const GOLD_PER_ITEM_TAG_NAME = "GoldPer";
const BOOTS_ITEM_TAG_NAME = "Boots";
const LANE_ITEM_TAG_NAME = "Lane";
const JUNGLE_ITEM_TAG_NAME = "Jungle";
const ACTIVE_ITEM_TAG_NAME = "Active";
const CONSUMABLE_ITEM_TAG_NAME = "Consumable";
const TRINKET_ITEM_TAG_NAME = "Trinket";
const VISION_ITEM_TAG_NAME = "Vision";
const STEALTH_ITEM_TAG_NAME = "Stealth";

const TAGS = [
  HEALTH_ITEM_TAG_NAME,
  HEALTH_REGEN_ITEM_TAG_NAME,
  ARMOR_ITEM_TAG_NAME,
  SPELL_BLOCK_ITEM_TAG_NAME,
  DAMAGE_ITEM_TAG_NAME,
  MANA_ITEM_TAG_NAME,
  MANA_REGEN_ITEM_TAG_NAME,
  ABILITY_HASTE_ITEM_TAG_NAME,
  CRITICAL_STRIKE_ITEM_TAG_NAME,
  ATTACK_SPEED_ITEM_TAG_NAME,
  LIFE_STEAL_ITEM_TAG_NAME,
  SPELL_VAMP_ITEM_TAG_NAME,
  SPELL_DAMAGE_ITEM_TAG_NAME,
  ON_HIT_ITEM_TAG_NAME,
  COOLDOWN_REDUCTION_ITEM_TAG_NAME,
  NONBOOTS_MOVEMENT_ITEM_TAG_NAME,
  ARMOR_PENETRATION_ITEM_TAG_NAME,
  MAGIC_PENETRATION_ITEM_TAG_NAME,
  TENACITY_ITEM_TAG_NAME,
  SLOW_ITEM_TAG_NAME,
  AURA_ITEM_TAG_NAME,
  GOLD_PER_ITEM_TAG_NAME,
  BOOTS_ITEM_TAG_NAME,
  LANE_ITEM_TAG_NAME,
  JUNGLE_ITEM_TAG_NAME,
  ACTIVE_ITEM_TAG_NAME,
  CONSUMABLE_ITEM_TAG_NAME,
  TRINKET_ITEM_TAG_NAME,
  VISION_ITEM_TAG_NAME,
  STEALTH_ITEM_TAG_NAME,
] as const;

export default {
  tags: TAGS,
} as const;
