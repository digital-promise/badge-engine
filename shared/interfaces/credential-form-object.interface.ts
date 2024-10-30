import { z } from "zod";
import { AchievementType, AssessmentPlacement } from "@prisma/client";
import { nonEmptyString } from "./functions";

export const RubricCriterionLevelSchema = z.object({
  level: nonEmptyString(),
  description: z.string(),
});

export const ResultDescriptionSchema = z.object({
  name: nonEmptyString(),
  uiPlacement: z.nativeEnum(AssessmentPlacement).optional(),
  rubricCriterionLevel: z.array(RubricCriterionLevelSchema).optional(),
  requireFile: z.boolean(),
});

export const ResultDescriptionSchemaRequired = ResultDescriptionSchema.extend({
  uiPlacement: z.nativeEnum(AssessmentPlacement),
});

export const CriteriaSectionSchema = z.object({
  criteria: nonEmptyString().min(1, "Criteria is required"),
  resultDescription: z.array(ResultDescriptionSchema).optional()
})

export const BasicsSectionSchema = z.object({
  name: z.string().min(1, "Achievement Name is required"),
  description: z.string().min(1, "Achievement Description is required"),
  achievementType: z.nativeEnum(AchievementType),
  image: z.instanceof(Blob),
  isPublic: z.preprocess((v) => Boolean(v), z.boolean()),
});

export const ExtrasSectionSchema = z.object({
  tag: z.array(z.string()).optional(),
  supportingResearchAndRationale: nonEmptyString().min(1, "Supporting Research and Rationale is required"),
  resources: nonEmptyString().min(1, "Resources is required"),
})

export type BasicsFormSection = z.infer<typeof BasicsSectionSchema>;

export type ResultDescription = z.infer<typeof ResultDescriptionSchema>;

export type CriteriaFormSection = z.infer<typeof CriteriaSectionSchema>;

export type ExtrasFormSection = z.infer<typeof ExtrasSectionSchema>;

export const CredentialFormSchema = BasicsSectionSchema.merge(
  CriteriaSectionSchema,
).merge(ExtrasSectionSchema);

const PartialAchievementForm = CredentialFormSchema.partial();

const PartialBasics = BasicsSectionSchema.partial();

const PartialCriteria = CriteriaSectionSchema.partial();

const PartialExtras = ExtrasSectionSchema.partial();

export type PartialCredentialForm = z.infer<typeof PartialAchievementForm>;

export type PartialBasicsSection = z.infer<typeof PartialBasics>;

export type PartialCriteriaSection = z.infer<typeof PartialCriteria>;

export type PartialExtrasSection = z.infer<typeof PartialExtras>;
