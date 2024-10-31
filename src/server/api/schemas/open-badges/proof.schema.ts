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
  created: isoStringFromDatetime(z.string().datetime()).nullish(),
  cryptosuite: z.string().nullish(),
  challenge: z.string().nullish(),
  domain: z.string().nullish(),
  nonce: z.string().nullish(),
  proofPurpose: z.string().nullish(),
  proofValue: z.string().nullish(),
  verificationMethod: z.string().nullish(),
});

export type Proof = z.infer<typeof proofSchema>;

export const dataIntegrityProofConfigSchema = z.object({
  type: z.string().default("DataIntegrityProof"),
  cryptosuite: z.string().default("eddsa-jcs-2022"),
  created: z.string().datetime(),
});

export const dataIntegrityProofSchema = dataIntegrityProofConfigSchema.extend({
  challenge: z.string().nullish(),
  domain: z.string().nullish(),
  nonce: z.string().nullish(),
  proofPurpose: z.string().default("assertionMethod"),
  proofValue: z
    .string()
    .min(88)
    .max(89)
    .regex(/^z[1-9A-HJ-NP-Za-km-z]+/),
  verificationMethod: z.string().nullish(),
});
