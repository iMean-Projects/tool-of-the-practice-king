import * as z from "zod";

import { ShardStatValueSchema } from "./shard-stat.schema";
import ShardConstants from "./shard.constants";

type ShardSlotCategory = (typeof ShardConstants.categories.SHARD_SLOT_CATEGORIES)[number];

export const createShardSlotCategory = (category: ShardSlotCategory) =>
  z.object({
    id: z.string().nonempty(),
    name: z.literal(category),
    values: z.array(ShardStatValueSchema).length(ShardConstants.SHARD_SLOT_ARRAY_LENGTH),
  });
