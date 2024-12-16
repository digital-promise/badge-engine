import { z } from "zod";
import { AlignmentTargetType } from "@prisma/client";

/**
 * @link https://www.imsglobal.org/spec/ob/v3p0/#alignment
 */
export const alignmentSchema = z.object({
  type: z
    .array(z.string())
    .min(1)
    .refine((t) => t.includes("Alignment"), {
      message: "One of the items MUST be the IRI 'Alignment'.",
    })
    .default(["Alignment"]),
  targetCode: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  targetDescription: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  targetName: z.string(),
  targetFramework: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  targetType: z
    .nativeEnum(AlignmentTargetType)
    .nullish()
    .transform((v) => v ?? undefined),
  targetUrl: z.string().url(),
});
