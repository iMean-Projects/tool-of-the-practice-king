import * as z from "zod";

import StatsConstants from "./champion-stats.constants";

// ────────────────────────────────────────────────────────────────────────────
// ─── SCHEMA ─────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────

export const ChampionStatsSchema = z.object({
  // ─── HP & HP Per Level ────────────────────────────────────────────────────
  hp: z.number().min(StatsConstants.hpMinValue).max(StatsConstants.hpMaxValue),
  hpperlevel: z
    .number()
    .min(StatsConstants.hpPerLevelMinValue)
    .max(StatsConstants.hpPerLevelMaxValue),

  // ─── MP & MP Per Level ────────────────────────────────────────────────────
  mp: z.number().min(StatsConstants.mpMinValue).max(StatsConstants.mpMaxValue),
  mpperlevel: z
    .number()
    .min(StatsConstants.mpPerLevelMinValue)
    .max(StatsConstants.mpPerLevelMaxValue),

  // ─── Movespeed ────────────────────────────────────────────────────────────
  movespeed: z.number().min(StatsConstants.movespeedMinValue).max(StatsConstants.movespeedMaxValue),

  // ─── Armor & Armor Per Level ──────────────────────────────────────────────
  armor: z.number().min(StatsConstants.armorMinValue).max(StatsConstants.armorMaxValue),
  armorperlevel: z
    .number()
    .min(StatsConstants.armorPerLevelMinValue)
    .max(StatsConstants.armorPerLevelMaxValue),

  // ─── Spellblock & Spellblock Per Level ────────────────────────────────────
  spellblock: z
    .number()
    .min(StatsConstants.spellblockMinValue)
    .max(StatsConstants.spellblockMaxValue),
  spellblockperlevel: z
    .number()
    .min(StatsConstants.spellblockPerLevelMinValue)
    .max(StatsConstants.spellblockPerLevelMaxValue),

  // ─── Attack Range ─────────────────────────────────────────────────────────
  attackrange: z
    .number()
    .min(StatsConstants.attackRangeMinValue)
    .max(StatsConstants.attackRangeMaxValue),

  // ─── HP Regen & HP Regen Per Level ────────────────────────────────────────
  hpregen: z.number().min(StatsConstants.hpRegenMinValue).max(StatsConstants.hpRegenMaxValue),
  hpregenperlevel: z
    .number()
    .min(StatsConstants.hpRegenPerLevelMinValue)
    .max(StatsConstants.hpRegenPerLevelMaxValue),

  // ─── MP Regen & MP Regen Per Level ────────────────────────────────────────
  mpregen: z.number().min(StatsConstants.mpRegenMinValue).max(StatsConstants.mpRegenMaxValue),
  mpregenperlevel: z
    .number()
    .min(StatsConstants.mpRegenPerLevelMinValue)
    .max(StatsConstants.mpRegenPerLevelMaxValue),

  // ─── Crit & Crit Per Level ────────────────────────────────────────────────
  crit: z.number().min(StatsConstants.critMinValue).max(StatsConstants.critMaxValue),
  critperlevel: z
    .number()
    .min(StatsConstants.critPerLevelMinValue)
    .max(StatsConstants.critPerLevelMaxValue),

  // ─── Attack Damage & Attack Damage Per Level ──────────────────────────────
  attackdamage: z
    .number()
    .min(StatsConstants.attackDamageMinValue)
    .max(StatsConstants.attackDamageMaxValue),
  attackdamageperlevel: z
    .number()
    .min(StatsConstants.attackDamagePerLevelMinValue)
    .max(StatsConstants.attackDamagePerLevelMaxValue),

  // ─── Attack Speed & Attack Speed Per Level ────────────────────────────────
  attackspeedperlevel: z
    .number()
    .min(StatsConstants.attackSpeedPerLevelMinValue)
    .max(StatsConstants.attackSpeedPerLevelMaxValue),
  attackspeed: z
    .number()
    .min(StatsConstants.attackSpeedMinValue)
    .max(StatsConstants.attackSpeedMaxValue),
});

// ────────────────────────────────────────────────────────────────────────────
// ─── TYPE ───────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────

export type ChampionStats = z.infer<typeof ChampionStatsSchema>;
