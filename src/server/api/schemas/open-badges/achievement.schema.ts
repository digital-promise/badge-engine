import { z } from "zod";
import { AchievementType, ResultStatusType, ResultType } from "@prisma/client";
import { alignmentSchema } from "./alignment.schema";
import { profileSchema } from "./profile.schema";
import { imageSchema } from "./image.schema";
import {
  identifierEntrySchema,
  identityObjectSchema,
} from "./identifier.schema";
import { isoStringFromDatetime } from "../util.schema";
import { compactJwsSchema } from "./proof.schema";
import { endorsementCredentialSchema } from "./credential.schema";

/**
 * @link https://www.imsglobal.org/spec/ob/v3p0/#criteria
 */
export const criteriaSchema = z
  .object({
    id: z
      .string()
      .nullish()
      .transform((v) => v ?? undefined),
    narrative: z
      .string()
      .nullish()
      .transform((v) => v ?? undefined),
  })
  .refine((c) => c.id ?? c.narrative, {
    message: "Must provide at least one of id or narrative.",
  });

/**
 * @link https://www.imsglobal.org/spec/ob/v3p0/#rubriccriterionlevel
 */
export const rubricCriterionLevelSchema = z.object({
  id: z.string(),
  type: z
    .array(z.string())
    .min(1)
    .refine((t) => t.includes("RubricCriterionLevel"), {
      message: "One of the items MUST be the IRI 'RubricCriterionLevel'.",
    })
    .default(["RubricCriterionLevel"]),
  alignment: z
    .array(alignmentSchema)
    .nullish()
    .transform((v) => v ?? undefined),
  description: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  level: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  name: z.string(),
  points: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
});

/**
 * @link https://www.imsglobal.org/spec/ob/v3p0/#resultdescription
 */
export const resultDescriptionSchema = z.object({
  id: z.string(),
  type: z
    .array(z.string())
    .min(1)
    .refine((t) => t.includes("ResultDescription"), {
      message: "One of the items MUST be the IRI 'ResultDescription'.",
    })
    .default(["ResultDescription"]),
  alignment: z
    .array(alignmentSchema)
    .nullish()
    .transform((v) => v ?? undefined),
  allowedValue: z
    .array(z.string())
    .nullish()
    .transform((v) => v ?? undefined),
  name: z.string(),
  requiredLevel: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  requiredValue: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  resultType: z.nativeEnum(ResultType),
  rubricCriterionLevel: z
    .array(rubricCriterionLevelSchema)
    .nullish()
    .transform((v) => v ?? undefined),
  valueMax: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  valueMin: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
});

const baseAchievementSchema = z.object({
  id: z.string(),
  inLanguage: z
    .string()
    .min(2)
    .nullish()
    .transform((v) => v ?? undefined),
  version: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
});

const relatedAchievementSchema = baseAchievementSchema.extend({
  type: z
    .array(z.string())
    .refine((t) => t.includes("Related"), {
      message: "One of the items MUST be the IRI 'Related'.",
    })
    .default(["Related"]),
});

/**
 * @link https://www.imsglobal.org/spec/ob/v3p0#achievement
 */
export const achievementSchema = baseAchievementSchema.extend({
  type: z
    .array(z.string())
    .min(1)
    .refine((t) => t.includes("Achievement"), {
      message: "The type MUST include the IRI 'Achievement'.",
    })
    .default(["Achievement"]),
  alignment: z
    .array(alignmentSchema)
    .nullish()
    .transform((v) => v ?? undefined),
  achievementType: z
    .nativeEnum(AchievementType)
    .nullish()
    .transform((v) => v ?? undefined),
  creator: profileSchema.nullish().transform((v) => v ?? undefined),
  creditsAvailable: z
    .number({ coerce: true })
    .nullish()
    .transform((v) => v ?? undefined),
  criteria: criteriaSchema,
  description: z.string(),
  endorsement: z
    .array(z.lazy(() => endorsementCredentialSchema))
    .nullish()
    .transform((v) => v ?? undefined),
  endorsementJwt: z
    .array(compactJwsSchema)
    .nullish()
    .transform((v) => v ?? undefined),
  fieldOfStudy: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  humanCode: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  image: imageSchema.nullish().transform((v) => v ?? undefined),
  name: z.string(),
  otherIdentifier: z
    .array(identifierEntrySchema)
    .nullish()
    .transform((v) => v ?? undefined),
  related: z
    .array(relatedAchievementSchema)
    .nullish()
    .transform((v) => v ?? undefined),
  resultDescription: z
    .array(resultDescriptionSchema)
    .nullish()
    .transform((v) => v ?? undefined),
  specialization: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  tag: z
    .array(z.string())
    .nullish()
    .transform((v) => v ?? undefined),
});

/**
 * @link https://www.imsglobal.org/spec/ob/v3p0/#result
 */
export const resultSchema = z.object({
  type: z.array(z.string()).refine((t) => t.includes("Result"), {
    message: "One of the items MUST be the IRI 'Result'",
  }),
  achievedLevel: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  alignment: z
    .array(alignmentSchema)
    .nullish()
    .transform((v) => v ?? undefined),
  resultDescription: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  status: z
    .nativeEnum(ResultStatusType)
    .nullish()
    .transform((v) => v ?? undefined),
  value: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
});

/**
 * @link https://www.imsglobal.org/spec/ob/v3p0/#achievementsubject
 */
export const achievementSubjectSchema = z
  .object({
    id: z
      .string()
      .nullish()
      .transform((v) => v ?? undefined),
    type: z
      .array(z.string())
      .min(1)
      .refine((t) => t.includes("AchievementSubject"), {
        message: "One of the items MUST be the IRI 'AchievementSubject'",
      })
      .default(["AchievementSubject"]),
    activityEndDate: isoStringFromDatetime(
      z
        .string()
        .datetime()
        .nullish()
        .transform((v) => v ?? undefined),
    ),
    activityStartDate: isoStringFromDatetime(
      z
        .string()
        .datetime()
        .nullish()
        .transform((v) => v ?? undefined),
    ),
    creditsEarned: z
      .number({ coerce: true })
      .nullish()
      .transform((v) => v ?? undefined),
    achievement: achievementSchema,
    identifier: z
      .array(identityObjectSchema)
      .nullish()
      .transform((v) => v ?? undefined),
    image: imageSchema.nullish().transform((v) => v ?? undefined),
    licenseNumber: z
      .string()
      .nullish()
      .transform((v) => v ?? undefined),
    narrative: z
      .string()
      .nullish()
      .transform((v) => v ?? undefined),
    result: z
      .array(resultSchema)
      .nullish()
      .transform((v) => v ?? undefined),
    role: z
      .string()
      .nullish()
      .transform((v) => v ?? undefined),
    source: profileSchema.nullish().transform((v) => v ?? undefined),
    term: z
      .string()
      .nullish()
      .transform((v) => v ?? undefined),
  })
  .refine((s) => s.id ?? s.identifier?.length, {
    message: "Either id or at least one identifier MUST be supplied.",
  })
  .transform((s) => {
    if (!s.id) {
      delete s.id;
    }

    return s;
  });
