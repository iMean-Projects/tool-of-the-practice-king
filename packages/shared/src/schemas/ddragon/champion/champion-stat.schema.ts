import * as z from "zod";

import StatConstants from "./champion-stat.constants";

// ────────────────────────────────────────────────────────────────────────────
// ─── SCHEMA ─────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────

export const ChampionStatSchema = z.object({
  // ─── HP & HP Per Level ────────────────────────────────────────────────────
  hp: z.number().min(StatConstants.boundaries.hpMinValue).max(StatConstants.boundaries.hpMaxValue),
  hpperlevel: z
    .number()
    .min(StatConstants.boundaries.hpPerLevelMinValue)
    .max(StatConstants.boundaries.hpPerLevelMaxValue),

  // ─── MP & MP Per Level ────────────────────────────────────────────────────
  mp: z.number().min(StatConstants.boundaries.mpMinValue).max(StatConstants.boundaries.mpMaxValue),
  mpperlevel: z
    .number()
    .min(StatConstants.boundaries.mpPerLevelMinValue)
    .max(StatConstants.boundaries.mpPerLevelMaxValue),

  // ─── Movespeed ────────────────────────────────────────────────────────────
  movespeed: z
    .number()
    .min(StatConstants.boundaries.movespeedMinValue)
    .max(StatConstants.boundaries.movespeedMaxValue),

  // ─── Armor & Armor Per Level ──────────────────────────────────────────────
  armor: z
    .number()
    .min(StatConstants.boundaries.armorMinValue)
    .max(StatConstants.boundaries.armorMaxValue),
  armorperlevel: z
    .number()
    .min(StatConstants.boundaries.armorPerLevelMinValue)
    .max(StatConstants.boundaries.armorPerLevelMaxValue),

  // ─── Spellblock & Spellblock Per Level ────────────────────────────────────
  spellblock: z
    .number()
    .min(StatConstants.boundaries.spellblockMinValue)
    .max(StatConstants.boundaries.spellblockMaxValue),
  spellblockperlevel: z
    .number()
    .min(StatConstants.boundaries.spellblockPerLevelMinValue)
    .max(StatConstants.boundaries.spellblockPerLevelMaxValue),

  // ─── Attack Range ─────────────────────────────────────────────────────────
  attackrange: z
    .number()
    .min(StatConstants.boundaries.attackRangeMinValue)
    .max(StatConstants.boundaries.attackRangeMaxValue),

  // ─── HP Regen & HP Regen Per Level ────────────────────────────────────────
  hpregen: z
    .number()
    .min(StatConstants.boundaries.hpRegenMinValue)
    .max(StatConstants.boundaries.hpRegenMaxValue),
  hpregenperlevel: z
    .number()
    .min(StatConstants.boundaries.hpRegenPerLevelMinValue)
    .max(StatConstants.boundaries.hpRegenPerLevelMaxValue),

  // ─── MP Regen & MP Regen Per Level ────────────────────────────────────────
  mpregen: z
    .number()
    .min(StatConstants.boundaries.mpRegenMinValue)
    .max(StatConstants.boundaries.mpRegenMaxValue),
  mpregenperlevel: z
    .number()
    .min(StatConstants.boundaries.mpRegenPerLevelMinValue)
    .max(StatConstants.boundaries.mpRegenPerLevelMaxValue),

  // ─── Crit & Crit Per Level ────────────────────────────────────────────────
  crit: z
    .number()
    .min(StatConstants.boundaries.critMinValue)
    .max(StatConstants.boundaries.critMaxValue),
  critperlevel: z
    .number()
    .min(StatConstants.boundaries.critPerLevelMinValue)
    .max(StatConstants.boundaries.critPerLevelMaxValue),

  // ─── Attack Damage & Attack Damage Per Level ──────────────────────────────
  attackdamage: z
    .number()
    .min(StatConstants.boundaries.attackDamageMinValue)
    .max(StatConstants.boundaries.attackDamageMaxValue),
  attackdamageperlevel: z
    .number()
    .min(StatConstants.boundaries.attackDamagePerLevelMinValue)
    .max(StatConstants.boundaries.attackDamagePerLevelMaxValue),

  // ─── Attack Speed & Attack Speed Per Level ────────────────────────────────
  attackspeedperlevel: z
    .number()
    .min(StatConstants.boundaries.attackSpeedPerLevelMinValue)
    .max(StatConstants.boundaries.attackSpeedPerLevelMaxValue),
  attackspeed: z
    .number()
    .min(StatConstants.boundaries.attackSpeedMinValue)
    .max(StatConstants.boundaries.attackSpeedMaxValue),
});

// ────────────────────────────────────────────────────────────────────────────
// ─── TYPE ───────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────

export type ChampionStat = z.infer<typeof ChampionStatSchema>;
