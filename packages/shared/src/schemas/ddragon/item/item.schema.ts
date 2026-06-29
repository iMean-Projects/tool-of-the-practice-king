import * as z from "zod";

import { ItemStatSchema } from "./item-stat.schema";

import ItemConstants from "./item.constants";

export const ItemSchema = z.object({
  name: z.string().nonempty(),
  tags: z.array(z.enum(ItemConstants.tags)),
  stats: ItemStatSchema,
});

export type Item = z.infer<typeof ItemSchema>;
