import type { ReactNode } from "react";
import WithAuthorization from "~/components/global/auth-guard";

export default async function IssuerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <WithAuthorization>{children}</WithAuthorization>;
}
