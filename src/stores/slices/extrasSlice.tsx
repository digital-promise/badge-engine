import type { StateCreator } from "zustand";
import type { PartialExtrasSection } from "shared/interfaces/credential-form-object.interface";

export interface ExtrasFormSlice {
  extrasForm: PartialExtrasSection;
  isExtrasComplete: boolean;

  setIsExtrasComplete: (isExtrasComplete: boolean) => void;
  setExtrasSection: (update: PartialExtrasSection) => void;
}

export const createExtrasFormStore: StateCreator<ExtrasFormSlice> = (set) => ({
  extrasForm: {},
  isExtrasComplete: false,

  setIsExtrasComplete: () =>
    set((state) => ({
      ...state,
      isExtrasComplete: !state.isExtrasComplete,
    })),
  setExtrasSection: (update) =>
    set((state) => ({
      extrasForm: {
        ...state.extrasForm,
        ...update,
      },
    })),
});
