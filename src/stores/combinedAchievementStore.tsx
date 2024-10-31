import { createStore } from "zustand/vanilla";
import { devtools } from "zustand/middleware";
import {
  createFormStepStore,
  type FormStepSlice,
} from "./slices/formStepSlice";
import {
  type AchievementFormSlice,
  createAchievementFormStore,
} from "./slices/achievementSlice";
import {
  type BasicsFormSlice,
  createBasicsFormStore,
} from "./slices/basicsSlice";
import {
  type CriteriaFormSlice,
  createCriteriaFormStore,
} from "./slices/criteriaSlice";
import {
  type ExtrasFormSlice,
  createExtrasFormStore,
} from "./slices/extrasSlice";

export type AchievementFormStore = FormStepSlice &
  AchievementFormSlice &
  BasicsFormSlice &
  CriteriaFormSlice &
  ExtrasFormSlice;

export const createCredentialFormStore = () =>
  createStore<AchievementFormStore>()(
    devtools((...init) => ({
      ...createFormStepStore(...init),
      ...createAchievementFormStore(...init),
      ...createBasicsFormStore(...init),
      ...createCriteriaFormStore(...init),
      ...createExtrasFormStore(...init),
    })),
  );
