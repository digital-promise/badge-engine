import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import Credential from "~/components/Credential/Credential";

export default async function AchievementDetails({
  params,
}: {
  params: { credentialId: string };
}) {
  const credential = await api.credential.find.query({
    docId: params.credentialId,
  });

  if (!credential) return notFound();

  return (
    <main className="flex min-h-screen flex-col">
      <Credential credential={credential} />
    </main>
  );
}
