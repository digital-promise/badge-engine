import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import Credential from "~/components/Credential/Credential";
import { isTRPCClientError } from "~/lib/error";

export default async function AchievementDetails({
  params,
}: {
  params: { credentialId: string };
}) {
  try {
    const credential = await api.credential.find.query({
      docId: params.credentialId,
    });

    return (
      <main className="flex min-h-screen flex-col">
        <Credential credential={credential!} />
      </main>
    );
  } catch (cause) {
    if (isTRPCClientError(cause)) {
      if (cause.message === "Record not found") return notFound();

      throw cause;
    }
  }
}
