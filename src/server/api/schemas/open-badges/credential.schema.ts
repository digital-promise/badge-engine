import { z } from "zod";
import { compactJwsSchema, proofSchema } from "./proof.schema";
import { profileRefSchema } from "./profile.schema";
import { achievementSubjectSchema } from "./achievement.schema";
import { imageSchema } from "./image.schema";
import { mongoDbObjectId } from "../util.schema";

/**
 * @link https://www.imsglobal.org/spec/ob/v3p0/#endorsementsubject
 */
export const evidenceSchema = z.object({
  id: z
    .string()
    .url()
    .nullish()
    .transform((v) => v ?? undefined),
  type: z
    .array(z.string())
    .min(1)
    .refine((t) => t.includes("Evidence"), {
      message: "One of the items MUST be the IRI 'Evidence'.",
    }),
  narrative: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  name: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  description: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  genre: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  audience: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
});

/**
 * @link https://www.imsglobal.org/spec/ob/v3p0/#credentialschema
 */
export const credentialSchemaSchema = z.object({
  id: z.string().url(),
  type: z
    .string()
    .refine((t) => t === "1EdTechJsonSchemaValidator2019", {
      message:
        "One instance of CredentialSchema MUST have a type of '1EdTechJsonSchemaValidator2019'",
    })
    .default("1EdTechJsonSchemaValidator2019"),
});

/**
 * @link https://www.imsglobal.org/spec/ob/v3p0/#credentialstatus
 */
export const credentialStatusSchema = z.object({
  id: z.string().url(),
  type: z.string(),
});

/**
 * @link https://www.imsglobal.org/spec/ob/v3p0/#credentialsubject
 */
export const credentialSubjectSchema = z.object({
  id: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
});

/**
 * @link https://www.imsglobal.org/spec/ob/v3p0/#refreshservice
 */
export const refreshServiceSchema = z.object({
  id: z.string().url(),
  type: z.string(),
});

/**
 * @link https://www.imsglobal.org/spec/ob/v3p0/#termsofuse
 */
export const termsOfUseSchema = z.object({
  id: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  type: z.string(),
});

/**
 * @link https://www.imsglobal.org/spec/ob/v3p0/#endorsementsubject
 */
export const endorsementSubjectSchema = z.object({
  id: z.string(),
  type: z
    .array(z.string())
    .min(1)
    .refine((t) => t.includes("EndorsementSubject"), {
      message: "One of the items MUST be the URI 'EndorsementSubject'.",
    })
    .default(["EndorsementSubject"]),
  endorsementComment: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
});

const baseCredentialSchema = z.object({
  credentialSubject: credentialSubjectSchema,
  issuer: profileRefSchema,
  validFrom: z.string().datetime(),
  validUntil: z
    .string()
    .datetime()
    .nullish()
    .transform((v) => v ?? undefined),
  proof: z
    .array(proofSchema)
    .nullish()
    .transform((v) => v ?? undefined),
  credentialSchema: z
    .array(credentialSchemaSchema)
    .nullish()
    .transform((v) => v ?? undefined),
  credentialStatus: credentialStatusSchema
    .nullish()
    .transform((v) => v ?? undefined),
  refreshService: refreshServiceSchema
    .nullish()
    .transform((v) => v ?? undefined),
  termsOfUse: z
    .array(termsOfUseSchema)
    .nullish()
    .transform((v) => v ?? undefined),
});

const baseEndorsementSchema = baseCredentialSchema.extend({
  context: z
    .array(z.string().url())
    .min(2)
    .refine(
      (c) => {
        const [head] = c;
        return head === "https://www.w3.org/ns/credentials/v2";
      },
      {
        message:
          "The first item MUST be a URI with the value 'https://www.w3.org/ns/credentials/v2'",
      },
    )
    .refine(
      (c) => {
        const [_head, second] = c;
        return (
          second ===
          "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json"
        );
      },
      {
        message:
          "The second item MUST be a URI with the value 'https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json'.",
      },
    )
    .default([
      "https://www.w3.org/ns/credentials/v2",
      "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json",
    ]),
  type: z
    .array(z.string())
    .min(2)
    .refine(
      (t) =>
        t.includes("VerifiableCredential") &&
        t.includes("EndorsementCredential"),
      {
        message:
          "One of the items MUST be the URI 'VerifiableCredential', and one of the items MUST be the URI 'EndorsementCredential'.",
      },
    )
    .default(["VerifiableCredential", "EndorsementCredential"]),
  id: z.string(),
  name: z.string(),
  description: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  credentialSubject: endorsementSubjectSchema,
  awardedDate: z
    .string()
    .datetime()
    .nullish()
    .transform((v) => v ?? undefined),
});

export type EndorsementCredential = z.input<typeof baseEndorsementSchema> & {
  issuer: z.input<typeof profileRefSchema>;
};

export const endorsementCredentialSchema: z.ZodType<EndorsementCredential> =
  baseEndorsementSchema.extend({
    issuer: z.lazy(() => profileRefSchema),
  });

/**
 * @link https://www.imsglobal.org/spec/ob/v3p0/#verifiablecredential
 */
export const verifiableCredentialSchema = baseCredentialSchema.extend({
  context: z
    .array(z.string())
    .min(1)
    .refine((c) => c.at(0) === "https://www.w3.org/ns/credentials/v2", {
      message:
        "MUST be an ordered set where the first item is a URI with the value 'https://www.w3.org/ns/credentials/v2'",
    }),
  type: z
    .array(z.string())
    .min(1)
    .refine((t) => t.includes("VerifiableCredential"), {
      message: "One of the items MUST be the URI 'VerifiableCredential'",
    }),
});

/**
 * @link https://www.imsglobal.org/spec/ob/v3p0/#achievementcredential
 */
export const achievementCredentialSchema = verifiableCredentialSchema.extend({
  context: z
    .array(z.string().url())
    .min(2)
    .default([
      "https://www.w3.org/ns/credentials/v2",
      "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json",
    ])
    .refine(
      (c) => {
        const [head] = c;
        return head === "https://www.w3.org/ns/credentials/v2";
      },
      {
        message:
          "The first item in @context must be a URI with the value 'https://www.w3.org/ns/credentials/v2'",
      },
    )
    .refine(
      (c) => {
        const [_head, second] = c;
        return (
          second ===
          "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json"
        );
      },
      {
        message:
          "The second item in @context must be a URI with the value 'https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json'",
      },
    ),
  id: z.string(),
  type: z
    .array(z.string())
    .min(2)
    .refine((t) => t.includes("VerifiableCredential"), {
      message:
        "One of the items in type MUST be the IRI 'VerifiableCredential'",
    })
    .refine(
      (t) =>
        t.includes("AchievementCredential") ||
        t.includes("OpenBadgeCredential"),
      {
        message:
          "One of the items in type MUST be the IRI 'AchievementCredential' or 'OpenBadgeCredential'",
      },
    )
    .default([
      "VerifiableCredential",
      "AchievementCredential",
      "OpenBadgeCredential",
    ]),
  name: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  description: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  image: imageSchema.nullish().transform((v) => v ?? undefined),
  awardedDate: z
    .string()
    .datetime()
    .nullish()
    .transform((v) => v ?? undefined),
  credentialSubject: achievementSubjectSchema,
  endorsement: z
    .array(endorsementCredentialSchema)
    .nullish()
    .transform((v) => v ?? undefined),
  endorsementJwt: z
    .array(compactJwsSchema)
    .nullish()
    .transform((v) => v ?? undefined),
  evidence: z
    .array(evidenceSchema)
    .nullish()
    .transform((v) => v ?? undefined),
});

export const createVerifiableAchievementCredentialSchema =
  achievementCredentialSchema.extend({
    docId: mongoDbObjectId,
    type: z
      .array(z.string())
      .refine(
        (t) =>
          t.includes("AchievementCredential") ||
          t.includes("OpenBadgeCredential"),
        {
          message:
            "One of the items in type MUST be the IRI 'AchievementCredential' or 'OpenBadgeCredential'",
        },
      ),
  });
