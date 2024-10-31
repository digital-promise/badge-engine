import { z } from "zod";

/**
 * @link https://www.imsglobal.org/spec/ob/v3p0/#image
 */
export const imageSchema = z.object({
  id: z.string(),
  type: z
    .string()
    .default("Image")
    .refine((t) => t === "Image", { message: "Image" }),
  caption: z.string().nullish(),
});
