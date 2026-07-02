import z from "zod";

export const BASETREE_SCHEMA = z.object({ name: z.string(), tree: z.object({ "$className": z.literal("DataModel") }).loose() })