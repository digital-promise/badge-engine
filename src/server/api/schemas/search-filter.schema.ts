import { z } from "zod";

export const baseQuery = z.object({
  s: z.string().optional(),
  limit: z.number().optional(),
  page: z
    .number({ coerce: true })
    .transform((p) => (p <= 0 ? 1 : p))
    .default(1),
});
