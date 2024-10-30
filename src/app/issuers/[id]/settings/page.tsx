"use client";

import { useContext } from "react";
import { IssuerContext } from "~/providers/issuer-provider";
import { IssuingOrganizationForm } from "~/components/forms/issuing-organization";
import { IssuerDetailSidebarLayout } from "~/components/issuer";

export default function Issuer() {
  const issuer = useContext(IssuerContext);

  if (!issuer) return "";

  return (
    <IssuerDetailSidebarLayout>
      <h1 className="mb-6 text-xl font-bold">Org Settings</h1>
      <IssuingOrganizationForm issuer={issuer} />
    </IssuerDetailSidebarLayout>
  );
}
