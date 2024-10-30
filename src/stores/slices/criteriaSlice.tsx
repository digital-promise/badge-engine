import type { StateCreator } from "zustand";
import type { PartialCriteriaSection } from "shared/interfaces/credential-form-object.interface";

export interface CriteriaFormSlice {
  criteriaForm: PartialCriteriaSection;
  isCriteriaComplete: boolean;

  setIsCriteriaComplete: (isCriteriaComplete: boolean) => void;
  setCriteriaSection: (update: PartialCriteriaSection) => void;
}

export const createCriteriaFormStore: StateCreator<CriteriaFormSlice> = (
  set,
) => ({
  criteriaForm: {},
  isCriteriaComplete: false,

  setIsCriteriaComplete: () =>
    set((state) => ({
      ...state,
      isCriteriaComplete: !state.isCriteriaComplete,
    })),
  setCriteriaSection: (update) =>
    set((state) => ({
      criteriaForm: {
        ...state.criteriaForm,
        ...update,
      },
    })),
});
