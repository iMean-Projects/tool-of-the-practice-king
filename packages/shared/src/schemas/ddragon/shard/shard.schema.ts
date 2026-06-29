// TODO: Shard data is hardcoded because Data Dragon does not expose rune shard data via API.
// Revisit if Community Dragon (https://raw.communitydragon.org/) exposes this in a stable format.

import * as z from "zod";

import ShardConstants from "./shard.constants";

import { createShardSlotCategory } from "./shard.schema.utils";

import { ShardStatValueSchema } from "./shard-stat.schema";

// ─── Shard Slot Categories ──────────────────────────────────────────────────
export const OffenseCategorySchema = createShardSlotCategory(
  ShardConstants.categories.OFFENSE_SLOT_CATEGORY,
);

export const FlexCategorySchema = createShardSlotCategory(
  ShardConstants.categories.FLEX_SLOT_CATEGORY,
);

export const DefenseCategorySchema = createShardSlotCategory(
  ShardConstants.categories.DEFENSE_SLOT_CATEGORY,
);

export const AnyShardSlotCategorySchema = z.discriminatedUnion("name", [
  OffenseCategorySchema,
  FlexCategorySchema,
  DefenseCategorySchema,
]);

export const ShardSlotSchema = z.tuple([
  OffenseCategorySchema,
  FlexCategorySchema,
  DefenseCategorySchema,
]);

// ─── Shard Definition ───────────────────────────────────────────────────────
const ShardSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
  category: AnyShardSlotCategorySchema,
  value: ShardStatValueSchema,
});

// ─── Shard Refinement predicate ─────────────────────────────────────────────
export const shardSchemaRefinement = (schema: z.infer<typeof ShardSchema>) =>
  schema.category.values.some((value) => value.id === schema.value.id);

export const OffenseShardSchema = ShardSchema.extend({ category: OffenseCategorySchema }).refine(
  shardSchemaRefinement,
);

export const FlexShardSchema = ShardSchema.extend({ category: FlexCategorySchema }).refine(
  shardSchemaRefinement,
);

export const DefenseShardSchema = ShardSchema.extend({ category: DefenseCategorySchema }).refine(
  shardSchemaRefinement,
);
