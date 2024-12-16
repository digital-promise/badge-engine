import { z } from "zod";
import { isoStringFromDatetime } from "../util.schema";

export const compactJwsSchema = z
  .string()
  .regex(/^[-A-Za-z0-9]+\.[-A-Za-z0-9]+\.[-A-Za-z0-9\-\_]*$/);

/**
 * @link https://www.imsglobal.org/spec/ob/v3p0/#proof
 */
export const proofSchema = z.object({
  type: z.string(),
  created: isoStringFromDatetime(
    z
      .string()
      .datetime()
      .nullish()
      .transform((v) => v ?? undefined),
  ),
  cryptosuite: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  challenge: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  domain: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  nonce: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  proofPurpose: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  proofValue: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  verificationMethod: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
});

export type Proof = z.infer<typeof proofSchema>;

export const dataIntegrityProofConfigSchema = z.object({
  type: z.literal("DataIntegrityProof"),
  cryptosuite: z.literal("eddsa-rdfc-2022"),
  created: z.string().datetime(),
});

export const dataIntegrityProofSchema = dataIntegrityProofConfigSchema.extend({
  challenge: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  domain: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  nonce: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  proofPurpose: z.string().default("assertionMethod"),
  proofValue: z
    .string()
    .min(88)
    .max(89)
    .regex(/^z[1-9A-HJ-NP-Za-km-z]+/),
  verificationMethod: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
});
