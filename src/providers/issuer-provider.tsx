"use client";

import type { Issuer } from "~/server/api/schemas/issuerProfile.schema";
import { type ReactNode, createContext, useContext } from "react";

export const IssuerContext = createContext<Issuer | null>(null);

export function WithIssuer({
  issuer,
  children,
}: {
  issuer: Issuer | null;
  children: ReactNode;
}) {
  return (
    <IssuerContext.Provider value={issuer}>{children}</IssuerContext.Provider>
  );
}

export function useIssuerContext() {
  const context = useContext(IssuerContext);

  if (!context) {
    throw Error(
      "useIssuerContext must be used from within an IssuerContext provider.",
    );
  }
  return context;
}
