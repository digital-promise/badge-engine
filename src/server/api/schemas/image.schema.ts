import { z } from "zod";

export const imageSchema = z.object({
  docId: z.string().default(""),
  id: z.string(),
  type: z.string().default("Image") || z.undefined(),
  caption: z.string().nullable(),
});
