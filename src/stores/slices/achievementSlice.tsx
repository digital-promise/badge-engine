import type { StateCreator } from "zustand";
import type { PartialCredentialForm } from "shared/interfaces/credential-form-object.interface";
import type { FormStepSlice } from "./formStepSlice";
import { CREDENTIAL_FORM_STEPS } from "~/lib/constants";

export interface AchievementFormSlice {
  form: PartialCredentialForm;
  updateForm: (update: PartialCredentialForm) => void;
}

export const createAchievementFormStore: StateCreator<
  AchievementFormSlice & FormStepSlice,
  [],
  [],
  AchievementFormSlice
> = (set, get) => ({
  form: {},
  updateForm: (update) => {
    set((state) => ({
      form: {
        ...state.form,
        ...update,
      },
    }));
    const currentStepIndex = get().currentStep;
    const currenStep = CREDENTIAL_FORM_STEPS[currentStepIndex]!;
    const { success } = currenStep.validationSchema.safeParse(update);

    if (success) {
      get().addCompletedStep(currentStepIndex);
    } else {
      get().removeCompletedStep(currentStepIndex);
    }
  },
});
