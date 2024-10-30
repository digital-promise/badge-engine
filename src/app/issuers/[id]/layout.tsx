import { type ReactNode } from "react";
import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import { WithIssuer } from "~/providers/issuer-provider";

export default async function IssuerDetailLayout({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) {
  const issuer = await api.issuer.find.query({ docId: params.id });

  if (!issuer) return notFound();

  return <WithIssuer issuer={issuer}>{children}</WithIssuer>;
}
