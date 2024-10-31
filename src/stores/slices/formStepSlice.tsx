import { type StateCreator } from "zustand";

export type FormStepSlice = {
  currentStep: number;
  completedSteps: Set<number>;
  addCompletedStep: (step: number) => void;
  removeCompletedStep: (step: number) => void;
  setStep: (index: number) => void;
};

export const createFormStepStore: StateCreator<FormStepSlice> = (set, get) => ({
  currentStep: 0,
  completedSteps: new Set(),
  addCompletedStep: (step) => {
    set((state) => ({
      ...state,
      completedSteps: state.completedSteps.add(step),
    }));
  },
  removeCompletedStep: (step) => {
    const completedStepSet = get().completedSteps;
    if (completedStepSet.delete(step)) {
      set((state) => ({ ...state, completedSteps: completedStepSet }));
    }
  },
  setStep: (index) => set((state) => ({ ...state, currentStep: index })),
});
