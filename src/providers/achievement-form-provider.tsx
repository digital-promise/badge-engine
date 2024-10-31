"use client";

import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { createCredentialFormStore } from "~/stores/combinedAchievementStore";

export type AchievementStoreApi = ReturnType<typeof createCredentialFormStore>;

export const AchievementStoreContext = createContext<
  AchievementStoreApi | undefined
>(undefined);

export interface AchievementStoreProviderProps {
  children: ReactNode;
}

export const AchievementStoreProvider = ({
  children,
}: AchievementStoreProviderProps) => {
  const storeRef = useRef<AchievementStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createCredentialFormStore();
  }

  return (
    <AchievementStoreContext.Provider value={storeRef.current}>
      {children}
    </AchievementStoreContext.Provider>
  );
};

export const useAchievementStore = () => {
  const achievementStoreContext = useContext(AchievementStoreContext);

  if (!achievementStoreContext) {
    throw new Error(
      `useAchievementStore must be used within AchievementStoreProvider`,
    );
  }

  return useStore(achievementStoreContext);
};
