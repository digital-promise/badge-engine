import { type Prisma } from "@prisma/client";

export const publicImageSelect = {
  id: true,
  type: true,
  caption: true,
} satisfies Prisma.ImageSelect;

export const publicProfileSelect = {
  id: true,
  type: true,
  name: true,
  url: true,
  description: true,
  image: { select: publicImageSelect },
  email: true,
} satisfies Prisma.ProfileSelect;

export const publicAchievementSubjectSelect = {
  identifier: true,
} satisfies Prisma.AchievementSubjectSelect;

export const publicAchievementCredentialSelect = {
  id: true,
  type: true,
  name: true,
  description: true,
  awardedDate: true,
  validFrom: true,
  image: { select: publicImageSelect },
  issuer: { select: publicProfileSelect },
  credentialSubject: { select: publicAchievementSubjectSelect },
} satisfies Prisma.AchievementCredentialSelect;

export const publicAchievementCredentialStatusSelect = {
  ...publicAchievementCredentialSelect,
  credentialStatus: true,
};

export const endorsementCredentialComplete = {
  credentialSubject: true,
  issuer: true,
  proof: true,
  credentialSchema: true,
  refreshService: true,
  termsOfUse: true,
} satisfies Prisma.EndorsementCredentialInclude;

export const topLevelProfileComplete = {
  endorsement: { include: endorsementCredentialComplete },
  image: true,
  address: true,
  otherIdentifier: true,
} satisfies Prisma.ProfileInclude;

export const profileComplete = {
  ...topLevelProfileComplete,
  parentOrg: { include: topLevelProfileComplete },
} satisfies Prisma.ProfileInclude;

export const resultDescriptionComplete = {
  alignment: true,
  rubricCriterionLevel: {
    include: {
      alignment: true,
    },
  },
} satisfies Prisma.ResultDescriptionInclude;

export const achievementComplete = {
  alignment: true,
  creator: { include: profileComplete },
  extensions: { include: { assessmentExtensions: true } },
  image: true,
  endorsement: { include: endorsementCredentialComplete },
  otherIdentifier: true,
  related: true,
  resultDescription: { include: resultDescriptionComplete },
} satisfies Prisma.AchievementInclude;

export const achievementSubjectComplete = {
  achievement: { include: achievementComplete },
  identifier: true,
  image: true,
  result: { include: { alignment: true } },
  source: { include: profileComplete },
} satisfies Prisma.AchievementSubjectInclude;

export const protectedAchievementCredentialInclude = {
  credentialSubject: { include: achievementSubjectComplete },
  endorsement: { include: endorsementCredentialComplete },
  evidence: true,
  issuer: true,
  proof: true,
  credentialSchema: true,
  credentialStatus: true,
  refreshService: true,
  termsOfUse: true,
} satisfies Prisma.AchievementCredentialInclude;

export const protectedAchievementInclude = {
  image: true,
  extensions: {
    include: {
      assessmentExtensions: true,
    },
  },
  resultDescription: {
    select: {
      name: true,
      uiPlacement: true,
      rubricCriterionLevel: true,
    },
  },
  assessmentExtensions: {
    take: 1,
    select: {
      supportingResearchAndRationale: true,
      resources: true,
    },
  },
} satisfies Prisma.AchievementInclude;
