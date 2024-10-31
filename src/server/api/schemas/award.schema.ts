import { z } from "zod";
import { nonEmptyString } from "shared/interfaces/functions";
import { mongoDbObjectId } from "~/server/api/schemas/util.schema";

export const CreateAchievementSubjectProfile = z.object({
  name: z.string().nullish(),
  official: z.string().nullish(),
  familyName: z.string().nullish(),
  givenName: z.string().nullish(),
  additionalName: z.string().nullish(),
  patronymicName: z.string().nullish(),
  honorificPrefix: z.string().nullish(),
  honorificSuffix: z.string().nullish(),
  familyNamePrefix: z.string().nullish(),
});

export const CreateAchievementSubject = z.object({
  identifier: nonEmptyString(5),
  profile: CreateAchievementSubjectProfile,
});

export const CreateAchievementCredential = z.object({
  credentialId: mongoDbObjectId,
});

export const CreateAwardSchema = CreateAchievementCredential.merge(
  CreateAchievementSubject,
);
