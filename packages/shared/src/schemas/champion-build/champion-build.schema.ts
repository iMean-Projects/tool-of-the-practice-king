import * as z from "zod";

import BuildConstants from "./champion-build.constants";
import { DefenseShardSchema, FlexShardSchema, OffenseShardSchema } from "../shard/shard.schema";

// ────────────────────────────────────────────────────────────────────────────
// ─── SCHEMA ─────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────

// TODO: Shard slot data is hardcoded because Data Dragon does not expose rune shard data via API.
// Revisit if a community API (e.g. Community Dragon) exposes this data in a stable format.
// Tracked in: #<issue-number-if-you-have-one>
export const BuildSchema = z.object({
  id: z.uuidv4(),
  name: z.string().nonempty(),
  createdAt: z.date().readonly(),
  updatedAt: z.date().nullable(),
  championKey: z.string().nonempty(),
  championId: z.string().nonempty(),
  items: z.array(z.string().nonempty()).max(BuildConstants.ITEMS_ARRAY_LENGTH),
  shards: z.tuple([OffenseShardSchema, FlexShardSchema, DefenseShardSchema]),
});

// ────────────────────────────────────────────────────────────────────────────
// ─── TYPE ───────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────

export type Build = z.infer<typeof BuildSchema>;
