"use client";

import type { ReactNode } from "react";
import { CredentialFormNav } from "~/components/forms/credential-form-nav";
import "~/styles/forms.css";
import { useIssuerContext } from "~/providers/issuer-provider";
import BreadcrumbNavigation from "~/components/global/breadcrumb";
import Link from "next/link";

export function AchievementFormSection({ children }: { children: ReactNode }) {
  const issuer = useIssuerContext();
  const breadcrumbs = [
    <Link key="issuers" href={`/issuers/${issuer.docId}`}>
      {issuer.name ?? "Profile"}
    </Link>,
    <p key="title">Create New Achievement</p>,
  ];

  return (
    <>
      <BreadcrumbNavigation items={breadcrumbs} />
      <main className="mx-auto min-h-screen max-w-[45rem] py-6">
        <header className="mb-5 flex flex-col gap-5 border-b-2 border-gray-2 pb-5">
          <h1 className="text-xl font-bold">Create New Achievement</h1>
          <CredentialFormNav />
        </header>
        {children}
      </main>
    </>
  );
}
