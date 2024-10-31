"use client";

import { AchievementStoreProvider } from "~/providers/achievement-form-provider";

export default function CreateAchievementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AchievementStoreProvider>{children}</AchievementStoreProvider>;
}
