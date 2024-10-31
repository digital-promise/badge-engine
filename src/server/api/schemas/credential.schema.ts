import { z } from "zod";
import { nonEmptyString } from "shared/interfaces/functions";
import {
  CredentialFormSchema,
  ResultDescriptionSchema,
} from "shared/interfaces/credential-form-object.interface";
import { imageSchema } from "~/server/api/schemas/image.schema";
import { AssessmentPlacement, QuestionType, ResultType } from "@prisma/client";
import { anyUrlPattern } from "~/util";
import type { Credential } from "~/trpc/shared";

export const CreateResultDescriptionSchema = ResultDescriptionSchema.extend({
  uiPlacement: z.nativeEnum(AssessmentPlacement),
});

export const CreateCredentialSchema = CredentialFormSchema.extend({
  issuer: nonEmptyString(24),
  image: imageSchema,
  resultDescription: z.array(CreateResultDescriptionSchema).optional(),
});

export const PreviewCredentialSchema = CredentialFormSchema.transform(
  (cred): Credential => {
    const {
      image,
      criteria,
      supportingResearchAndRationale,
      resources,
      resultDescription,
      tag,
      ...props
    } = cred;

    const credentialImage = {
      docId: "",
      type: "",
      caption: "",
      id: URL.createObjectURL(image),
      encodedImageData: "",
    } satisfies Credential["image"];

    const criteriaTextContent = criteria.replace(/(<([^>]+)>)/gi, ""); // Strip HTML tags for funsies to see if we've been provided a URL.

    const credentialCriteria = {
      ...(criteriaTextContent.match(anyUrlPattern)
        ? {
            id: criteriaTextContent,
            narrative: null,
          }
        : {
            narrative: criteria,
            id: null,
          }),
    } satisfies Credential["criteria"];

    const credentialAssessmentExtension = [
      {
        id: "",
        context: [""],
        achievementId: "",
        extensionsId: "",
        type: ["Extension", "AssessmentExtension"],
        supportingResearchAndRationale: supportingResearchAndRationale ?? null,
        resources: resources ?? null,
      },
    ] satisfies Credential["extensions"][number]["assessmentExtensions"];

    const credentialResultDescription =
      resultDescription
        ?.filter((r) => r)
        .map((result) => {
          const { name, uiPlacement, rubricCriterionLevel } = result;

          return {
            name,
            docId: "",
            id: "",
            type: ["ResultDescription"],
            achievementId: "",
            alignment: [],
            alignmentIds: [],
            requiredLevel: null,
            requiredValue: null,
            resultType: ResultType.Result,
            valueMax: null,
            valueMin: null,
            allowedValue: [],
            uiPlacement: uiPlacement ?? AssessmentPlacement.Overview,
            questionType: QuestionType.TEXTQUESTION,
            rubricCriterionLevel:
              rubricCriterionLevel
                ?.filter((c) => c)
                .map((criterion) => {
                  return {
                    alignment: [],
                    name: criterion.level,
                    level: criterion.level,
                    description: criterion.description,
                    docId: "",
                    id: "",
                    type: [],
                    resultDescriptionId: "",
                    points: "",
                  } satisfies Credential["resultDescription"][number]["rubricCriterionLevel"][number];
                }) ?? [],
          } satisfies Credential["resultDescription"][number];
        }) ?? [];

    return {
      ...props,
      extensions: [
        {
          id: "",
          achievementId: "",
          assessmentExtensions: credentialAssessmentExtension,
        },
      ],
      tag: tag ?? [],
      image: credentialImage,
      criteria: credentialCriteria,
      resultDescription: credentialResultDescription ?? [],
      docId: "",
      id: "",
      creator: null,
      creatorId: "",
      otherIdentifier: [],
      endorsement: [],
      related: [],
      alignment: [],
      alignmentIds: [],
      type: [props.achievementType],
      creditsAvailable: null,
      endorsementJwt: [],
      fieldOfStudy: null,
      humanCode: null,
      imageId: null,
      inLanguage: null,
      specialization: null,
      version: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      validityId: null,
    };
  },
);
