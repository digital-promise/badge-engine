"use client";

import type { ReactNode } from "react";
// import { AwardFormNav } from "~/components/forms/award-form-nav";
import "~/styles/forms.css";
import { useIssuerContext } from "~/providers/issuer-provider";
import { useCredentialContext } from "~/providers/award-provider";
import BreadcrumbNavigation from "~/components/global/breadcrumb";
import Link from "next/link";

export function AwardFormSection({ children }: { children: ReactNode }) {
  const issuer = useIssuerContext();
  const credential = useCredentialContext();
  
  const breadcrumbs = [
    <Link key="issuer" href={`/issuers/${issuer.docId}`}>
      {issuer.name ?? "Profile"}
    </Link>,
    <Link key="credential" href={`/issuers/${issuer.docId}/credentials/${credential.docId}`}>
      {credential.name}
    </Link>,
  ];

  return (
    <>
      <BreadcrumbNavigation items={breadcrumbs} />  
      <main className="mx-auto min-h-screen max-w-[45rem] py-6">
        <header className="mb-5 flex flex-col gap-5 border-b-2 border-gray-2 pb-5">
          <h1 className="text-xl font-bold">Award {credential.name}</h1>
          {/* <AwardFormNav /> */}
        </header>
        {children}
      </main>
    </>
  );
}
