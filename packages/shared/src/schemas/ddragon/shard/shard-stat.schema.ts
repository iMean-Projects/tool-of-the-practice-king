// TODO: Shard data is hardcoded because Data Dragon does not expose rune shard data via API.
// Revisit if Community Dragon (https://raw.communitydragon.org/) exposes this in a stable format.

import * as z from "zod";

import ShardStatConstants from "./shard-stat.constants";

// ─── Shard Stat Values ──────────────────────────────────────────────────────
export const FlatStatValueSchema = z.object({
  kind: z.literal(ShardStatConstants.kinds.FLAT_STAT_KIND_NAME),
  value: z.number().positive(),
});

// TODO: level is currently the only scaling variable for shard stats.
// If additional scaling variables are introduced, extend ScaledStatValueSchema accordingly.
export const ScaledStatValueSchema = z.object({
  kind: z.literal(ShardStatConstants.kinds.SCALED_STAT_KIND_NAME),
  min: z.number().positive(),
  max: z.number().positive(),
  variable: z.literal(ShardStatConstants.kinds.ON_LEVEL_SCALING_VARIABLE),
});

export const ShardStatValueSchema = z.object({
  id: z.string().nonempty(),
  value: z.discriminatedUnion("kind", [FlatStatValueSchema, ScaledStatValueSchema]),
});
