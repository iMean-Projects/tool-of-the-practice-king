import * as z from "zod";

import ItemStatConstants from "./item-stat.constants";

export const ItemStatSchema = z.object({
  FlatHPPoolMod: z
    .number()
    .min(ItemStatConstants.boundaries.FLAT_HP_POOL_MOD_MIN_VALUE)
    .max(ItemStatConstants.boundaries.FLAT_HP_POOL_MOD_MAX_VALUE)
    .optional(),
  FlatArmorMod: z
    .number()
    .min(ItemStatConstants.boundaries.FLAT_ARMOR_MOD_MIN_VALUE)
    .max(ItemStatConstants.boundaries.FLAT_ARMOR_MOD_MAX_VALUE)
    .optional(),
  FlatSpellBlockMod: z
    .number()
    .min(ItemStatConstants.boundaries.FLAT_SPELL_BLOCK_MOD_MIN_VALUE)
    .max(ItemStatConstants.boundaries.FLAT_SPELL_BLOCK_MOD_MAX_VALUE)
    .optional(),
});

export type ItemStat = z.infer<typeof ItemStatSchema>;
