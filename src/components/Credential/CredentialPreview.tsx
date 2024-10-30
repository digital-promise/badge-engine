/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { useRouter } from "next/navigation";
import { PreviewCredentialSchema } from "~/server/api/schemas/credential.schema";
import { useAchievementStore } from "~/providers/achievement-form-provider";
import Credential from "./Credential";
import { useIssuerContext } from "~/providers/issuer-provider";
import { useNotifications } from "~/components/global/notifications";
import ConfirmAndCreate from "./ConfirmAndCreate";

export default function CredentialPreview() {
  const { id: issuerId } = useIssuerContext();
  const { form } = useAchievementStore();
  const { notify } = useNotifications();
  const router = useRouter();
  try {
    const credential = PreviewCredentialSchema.parse(form);
    return <Credential {...{ credential, preview: true }} />;
  } catch (_error) {
    notify({
      type: "error",
      message:
        "Unable to generate preview with current form. Check that all required fields have been completed.",
    });

    router.replace(`/issuers/${issuerId}/credentials/new/extras`);
  }

  return null;
}

export function CredentialPreviewActions() {
  const router = useRouter();

  return (
    <section className="flex items-center gap-4">
      <button
        className="rounded-full border-2 border-blue-3 bg-neutral-1 px-5 py-3 font-bold text-blue-4"
        onClick={() => router.back()}
      >
        Back to Edit
      </button>
      <ConfirmAndCreate />
    </section>
  );
}
