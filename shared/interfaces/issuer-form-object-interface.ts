import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.string(),
  email: z.string(),
  url: z.string(),
  description: z.string().optional(),
  image: z.instanceof(Blob).optional(),
  isPublic: z.preprocess((v) => Boolean(v), z.boolean()),
});

export type IssuerForm = z.infer<typeof ProfileSchema>;
