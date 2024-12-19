"use client";

import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { createCredentialFormStore } from "~/stores/combinedAchievementStore";

export type AwardFormStoreApi = ReturnType<typeof createCredentialFormStore>;

export const AwardFormStoreContext = createContext<
  AwardFormStoreApi | undefined
>(undefined);

export interface AwardFormProviderProps {
  children: ReactNode;
}

export const AwardFormProvider = ({
  children,
}: AwardFormProviderProps) => {
  const storeRef = useRef<AwardFormStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createCredentialFormStore();
  }

  return (
    <AwardFormStoreContext.Provider value={storeRef.current}>
      {children}
    </AwardFormStoreContext.Provider>
  );
};

export const useAwardFormStore = () => {
  const awardFormStoreContext = useContext(AwardFormStoreContext);

  if (!awardFormStoreContext) {
    throw new Error(
      `useAwardFormStore must be used within AwardFormProvider`,
    );
  }

  return useStore(awardFormStoreContext);
};
