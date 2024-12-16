import { z } from "zod";
import { IdentifierType } from "@prisma/client";

/**
 * @link https://www.imsglobal.org/spec/ob/v3p0/#identifierentry
 */
export const identifierEntrySchema = z.object({
  type: z
    .string()
    .default("IdentifierEntry")
    .refine((t) => t === "IdentifierEntry", {
      message: "MUST be the IRI 'IdentifierEntry'.",
    }),
  identifier: z.string(),
  identifierType: z.nativeEnum(IdentifierType),
});

/**
 * @link https://www.imsglobal.org/spec/ob/v3p0/#identityobject
 */
export const identityObjectSchema = z.object({
  type: z
    .string()
    .default("IdentityObject")
    .refine((t) => t === "IdentityObject", { message: "IdentityObject" }),
  hashed: z.boolean(),
  identityHash: z.string(),
  identityType: z.nativeEnum(IdentifierType),
  salt: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
});
