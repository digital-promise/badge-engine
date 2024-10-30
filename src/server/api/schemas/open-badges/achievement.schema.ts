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
    id: z.string().nullish(),
    narrative: z.string().nullish(),
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
  alignment: z.array(alignmentSchema).nullish(),
  description: z.string().nullish(),
  level: z.string().nullish(),
  name: z.string(),
  points: z.string().nullish(),
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
  alignment: z.array(alignmentSchema).nullish(),
  allowedValue: z.array(z.string()).nullish(),
  name: z.string(),
  requiredLevel: z.string().nullish(),
  requiredValue: z.string().nullish(),
  resultType: z.nativeEnum(ResultType),
  rubricCriterionLevel: z.array(rubricCriterionLevelSchema).nullish(),
  valueMax: z.string().nullish(),
  valueMin: z.string().nullish(),
});

const baseAchievementSchema = z.object({
  id: z.string(),
  inLanguage: z.string().min(2).nullish(),
  version: z.string().nullish(),
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
  alignment: z.array(alignmentSchema).nullish(),
  achievementType: z.nativeEnum(AchievementType).nullish(),
  creator: profileSchema.nullish(),
  creditsAvailable: z.number({ coerce: true }).nullish(),
  criteria: criteriaSchema,
  description: z.string(),
  endorsement: z.array(z.lazy(() => endorsementCredentialSchema)).nullish(),
  endorsementJwt: z.array(compactJwsSchema).nullish(),
  fieldOfStudy: z.string().nullish(),
  humanCode: z.string().nullish(),
  image: imageSchema.nullish(),
  name: z.string(),
  otherIdentifier: z.array(identifierEntrySchema).nullish(),
  related: z.array(relatedAchievementSchema).nullish(),
  resultDescription: z.array(resultDescriptionSchema).nullish(),
  specialization: z.string().nullish(),
  tag: z.array(z.string()).nullish(),
});

/**
 * @link https://www.imsglobal.org/spec/ob/v3p0/#result
 */
export const resultSchema = z.object({
  type: z.array(z.string()).refine((t) => t.includes("Result"), {
    message: "One of the items MUST be the IRI 'Result'",
  }),
  achievedLevel: z.string().nullish(),
  alignment: z.array(alignmentSchema).nullish(),
  resultDescription: z.string().nullish(),
  status: z.nativeEnum(ResultStatusType).nullish(),
  value: z.string().nullish(),
});

/**
 * @link https://www.imsglobal.org/spec/ob/v3p0/#achievementsubject
 */
export const achievementSubjectSchema = z
  .object({
    id: z.string().nullish(),
    type: z
      .array(z.string())
      .min(1)
      .refine((t) => t.includes("AchievementSubject"), {
        message: "One of the items MUST be the IRI 'AchievementSubject'",
      })
      .default(["AchievementSubject"]),
    activityEndDate: isoStringFromDatetime(z.string().datetime().nullish()),
    activityStartDate: isoStringFromDatetime(z.string().datetime().nullish()),
    creditsEarned: z.number({ coerce: true }).nullish(),
    achievement: achievementSchema,
    identifier: z.array(identityObjectSchema).nullish(),
    image: imageSchema.nullish(),
    licenseNumber: z.string().nullish(),
    narrative: z.string().nullish(),
    result: z.array(resultSchema).nullish(),
    role: z.string().nullish(),
    source: profileSchema.nullish(),
    term: z.string().nullish(),
  })
  .refine((s) => s.id ?? s.identifier?.length, {
    message: "Either id or at least one identifier MUST be supplied.",
  });
