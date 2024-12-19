"use client";

import { api } from "~/trpc/react";
import { AwardFormProvider } from "~/providers/award-form-provider";
import { WithCredential } from "~/providers/award-provider";
import { TRPCReactProvider } from "~/trpc/react";
import { useParams } from "next/navigation";

export default function AwardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TRPCReactProvider>
      <AwardContent>{children}</AwardContent>
    </TRPCReactProvider>
  );
}

function AwardContent({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const { data: credential, isLoading } = api.credential.find.useQuery(
    { docId: params.credentialId as string },
    { enabled: !!params.credentialId }
  );

  if (isLoading || !credential) {
    return (
      <div className="flex flex-col min-h-screen">
        <header></header>
        <main className="flex-1"></main>
        <footer></footer>
      </div>
    );
  }

  return (
    <WithCredential credential={credential}>
      <AwardFormProvider>{children}</AwardFormProvider>
    </WithCredential>
  );
}
