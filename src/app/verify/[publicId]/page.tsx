import { notFound } from "next/navigation";

import { prismaConnect } from "~/server/db/prismaConnect";

import VerifyBadgePageClient from "./VerifyBadgePageClient";

function maskEmail(email: string): string {
  const [localPart, domain] = email.split("@");

  if (!localPart || !domain) {
    return "Hidden";
  }

  if (localPart.length <= 2) {
    return `${localPart[0] ?? "*"}***@${domain}`;
  }

  return `${localPart.slice(0, 2)}***@${domain}`;
}

export default async function VerifyBadgePage({
  params,
}: {
  params: { publicId: string };
}) {
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
  const badgeTitle = issuedBadge.badgeTitle ?? issuedBadge.template.name;
  const recipientEmailMasked = maskEmail(issuedBadge.recipientEmail);
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const verificationUrl = `${baseUrl}/verify/${issuedBadge.publicId}`;

  return (
    <VerifyBadgePageClient
      badgeImageSrc={badgeImageSrc}
      badgeTitle={badgeTitle}
      credentialId={issuedBadge.credentialId}
      issueDateLabel={issuedBadge.issueDate.toLocaleDateString("en-GB")}
      isRevoked={isRevoked}
      occupation={issuedBadge.occupation}
      publicId={issuedBadge.publicId}
      recipientName={issuedBadge.recipientName}
      recipientEmailMasked={recipientEmailMasked}
      verificationUrl={verificationUrl}
    />
  );
}
