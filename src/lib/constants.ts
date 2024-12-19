import type { z } from "zod";
import {
  BasicsSectionSchema,
  CriteriaSectionSchema,
  ExtrasSectionSchema,
  AwardBasicsSectionSchema,
  AwardExtrasSectionSchema,
} from "shared/interfaces/credential-form-object.interface";

type CredentialFormStep = {
  path: string;
  label: string;
  validationSchema: z.ZodSchema;
};

export const CREDENTIAL_FORM_STEPS: CredentialFormStep[] = [
  {
    path: "",
    label: "Basics",
    validationSchema: BasicsSectionSchema,
  },
  {
    path: "criteria",
    label: "Criteria",
    validationSchema: CriteriaSectionSchema,
  },
  {
    path: "extras",
    label: "Extras",
    validationSchema: ExtrasSectionSchema,
  },
] as const;

export const AWARD_FORM_STEPS: CredentialFormStep[] = [
  {
    path: "",
    label: "Recipients",
    validationSchema: AwardBasicsSectionSchema,
  },
  {
    path: "extras",
    label: "Extras",
    validationSchema: AwardExtrasSectionSchema,
  },
] as const;
