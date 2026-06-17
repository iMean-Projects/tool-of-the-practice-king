// ─── HP & HP Per Level ──────────────────────────────────────────────────────
const hpMinValue = 410;
const hpMaxValue = 810;
const hpPerLevelMinValue = 69;
const hpPerLevelMaxValue = 142.82352941176;

// ─── MP & MP Per Level ──────────────────────────────────────────────────────
const mpMinValue = 0;
const mpMaxValue = 530;
const mpPerLevelMinValue = 0;
const mpPerLevelMaxValue = 87;

// ─── Movespeed ──────────────────────────────────────────────────────────────
const movespeedMinValue = 305;
const movespeedMaxValue = 355;

// ─── Armor & Armor Per Level ────────────────────────────────────────────────
const armorMinValue = 18;
const armorMaxValue = 43;
const armorPerLevelMinValue = 0;
const armorPerLevelMaxValue = 6.7;

// ─── Spellblock & Spellblock Per Level ──────────────────────────────────────
const spellblockMinValue = 22;
const spellblockMaxValue = 37;
const spellblockPerLevelMinValue = 1.1;
const spellblockPerLevelMaxValue = 4.8;

// ─── Attack Range ───────────────────────────────────────────────────────────
const attackRangeMinValue = 125;
const attackRangeMaxValue = 650;

// ─── HP Regen & HP Regen Per Level ──────────────────────────────────────────
const hpRegenMinValue = 0;
const hpRegenMaxValue = 10;
const hpRegenPerLevelMinValue = 0;
const hpRegenPerLevelMaxValue = 1.25;

// ─── MP Regen & MP Regen Per Level ──────────────────────────────────────────
const mpRegenMinValue = 0;
const mpRegenMaxValue = 50;
const mpRegenPerLevelMinValue = 0;
const mpRegenPerLevelMaxValue = 1;

// ─── Crit & Crit Per Level ──────────────────────────────────────────────────
/**
 * All champions currently have 0 base crit and 0 crit per level.
 * Max is intentionally locked to 0 to reflect the current game state.
 * If Riot introduces base crit in a future patch, update both min and max.
 * @latestReviewed 2026-06-12
 */
const critMinValue = 0;
const critMaxValue = 0;
const critPerLevelMinValue = 0;
const critPerLevelMaxValue = 0;

// ─── Attack Damage & Attack Damage Per Level ────────────────────────────────
const attackDamageMinValue = 44;
const attackDamageMaxValue = 69;
const attackDamagePerLevelMinValue = 0;
const attackDamagePerLevelMaxValue = 5.7;

// ─── Attack Speed Per Level & Attack Speed ──────────────────────────────────
const attackSpeedPerLevelMinValue = 0;
const attackSpeedPerLevelMaxValue = 6;
const attackSpeedMinValue = 0.475;
const attackSpeedMaxValue = 0.85;

export default {
  hpMinValue,
  hpMaxValue,
  hpPerLevelMinValue,
  hpPerLevelMaxValue,
  mpMinValue,
  mpMaxValue,
  mpPerLevelMinValue,
  mpPerLevelMaxValue,
  movespeedMinValue,
  movespeedMaxValue,
  armorMinValue,
  armorMaxValue,
  armorPerLevelMinValue,
  armorPerLevelMaxValue,
  spellblockMinValue,
  spellblockMaxValue,
  spellblockPerLevelMinValue,
  spellblockPerLevelMaxValue,
  attackRangeMinValue,
  attackRangeMaxValue,
  hpRegenMinValue,
  hpRegenMaxValue,
  hpRegenPerLevelMinValue,
  hpRegenPerLevelMaxValue,
  mpRegenMinValue,
  mpRegenMaxValue,
  mpRegenPerLevelMinValue,
  mpRegenPerLevelMaxValue,
  critMinValue,
  critMaxValue,
  critPerLevelMinValue,
  critPerLevelMaxValue,
  attackDamageMinValue,
  attackDamageMaxValue,
  attackDamagePerLevelMinValue,
  attackDamagePerLevelMaxValue,
  attackSpeedPerLevelMinValue,
  attackSpeedPerLevelMaxValue,
  attackSpeedMinValue,
  attackSpeedMaxValue,
} as const;
