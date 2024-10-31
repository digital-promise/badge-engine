import type { StateCreator } from "zustand";
import type { PartialBasicsSection } from "shared/interfaces/credential-form-object.interface";

export interface BasicsFormSlice {
  basicsForm: PartialBasicsSection;
  isBasicsComplete: boolean;

  setIsBasicsComplete: (isBasicsComplete: boolean) => void;
  setBasicsSection: (update: PartialBasicsSection) => void;
}

export const createBasicsFormStore: StateCreator<BasicsFormSlice> = (set) => ({
  basicsForm: {},
  isBasicsComplete: false,

  setIsBasicsComplete: () =>
    set((state) => ({
      ...state,
      isBasicsComplete: !state.isBasicsComplete,
    })),
  setBasicsSection: (update) =>
    set((state) => ({
      basicsForm: {
        ...state.basicsForm,
        ...update,
      },
    })),
});
