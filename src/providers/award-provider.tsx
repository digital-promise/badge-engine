"use client";

import { type ReactNode, createContext, useContext } from "react";
import { type Credential } from "~/trpc/shared";

export const CredentialContext = createContext<Credential | null>(null);

export function WithCredential({
  credential,
  children,
}: {
  credential?: Credential | null;
  children: ReactNode;
}) {
  return (
    <CredentialContext.Provider value={credential ?? null}>
      {children}
    </CredentialContext.Provider>
  );
}

export function useCredentialContext() {
  const context = useContext(CredentialContext);

  if (!context) {
    throw Error(
      "useCredentialContext must be used within a CredentialContext provider.",
    );
  }
  return context;
}
