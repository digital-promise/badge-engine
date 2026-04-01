import Image from "next/image";
import { notFound } from "next/navigation";

import { prismaConnect } from "~/server/db/prismaConnect";

type VerifyBadgePageProps = {
  params: {
    publicId: string;
  };
};

export default async function VerifyBadgePage({
  params,
}: VerifyBadgePageProps) {
  const issuedBadge = await prismaConnect.issuedBadge.findUnique({
    where: {
      publicId: params.publicId,
    },
    include: {
      template: true,
      batch: true,
    },
  });

  if (!issuedBadge) {
    notFound();
  }

  const isRevoked = issuedBadge.status === "REVOKED";
  const badgeImageSrc = issuedBadge.imagePath ?? issuedBadge.template.imagePath;

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-wide">
          Badge Verification
        </p>
        <h1 className="text-2xl font-bold">
          {isRevoked ? "Badge Revoked" : "Badge Verified"}
        </h1>
        <p>
          This page confirms whether the badge record exists in the system and
          whether it is currently valid.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[420px_minmax(0,1fr)]">
        <section className="rounded-lg border border-neutral-3 p-6">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold">Badge artwork</p>

            <div className="overflow-hidden rounded-lg border border-neutral-3 p-4">
              <Image
                src={badgeImageSrc}
                alt={`${issuedBadge.badgeTitle ?? issuedBadge.template.name} badge`}
                width={3004}
                height={3004}
                className="h-auto w-full"
                priority
              />
            </div>

            <div className="rounded-lg border border-neutral-3 p-4">
              <p className="text-sm font-semibold">Status</p>
              <p className="mt-1">{isRevoked ? "REVOKED" : "VALID"}</p>
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-6">
          <section className="rounded-lg border border-neutral-3 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold">Badge title</p>
                <p>{issuedBadge.badgeTitle ?? issuedBadge.template.name}</p>
              </div>

              <div>
                <p className="text-sm font-semibold">Issue date</p>
                <p>{issuedBadge.issueDate.toLocaleDateString("en-GB")}</p>
              </div>

              <div>
                <p className="text-sm font-semibold">Recipient name</p>
                <p>{issuedBadge.recipientName}</p>
              </div>

              <div>
                <p className="text-sm font-semibold">Occupation</p>
                <p>{issuedBadge.occupation ?? "—"}</p>
              </div>

              <div>
                <p className="text-sm font-semibold">Recipient email</p>
                <p>{issuedBadge.recipientEmail}</p>
              </div>

              <div>
                <p className="text-sm font-semibold">Public ID</p>
                <p>{issuedBadge.publicId}</p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-sm font-semibold">Credential ID</p>
                <p className="break-all">{issuedBadge.credentialId}</p>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-neutral-3 p-6">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold">Verification summary</p>

              {isRevoked ? (
                <p>
                  This badge was issued previously, but it is no longer valid.
                </p>
              ) : (
                <p>
                  This badge is valid and has been issued by the system record.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
