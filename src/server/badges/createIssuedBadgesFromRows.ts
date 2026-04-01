import { randomUUID } from "crypto";

import { prismaConnect } from "~/server/db/prismaConnect";
import { generateAndSaveBadgeImage } from "~/server/badges/generateBadge";
import { getActiveBadgeTemplate } from "~/server/badges/getActiveBadgeTemplate";
import type { ParsedBadgeCsvRow } from "~/server/badges/parseCsv";
import { sendIssuedBadgeEmail } from "~/server/badges/sendIssuedBadgeEmail";

type CreateIssuedBadgesFromRowsInput = {
  rows: ParsedBadgeCsvRow[];
  uploadedByUserId?: string;
  csvOriginalFilename?: string;
  baseUrl?: string;
};

function slugifyForFilename(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createIssuedBadgesFromRows(
  input: CreateIssuedBadgesFromRowsInput
) {
  const {
    rows,
    uploadedByUserId,
    csvOriginalFilename,
    baseUrl = "http://localhost:3000",
  } = input;

  if (rows.length === 0) {
    throw new Error("Cannot create issued badges from an empty row set.");
  }

  const template = await getActiveBadgeTemplate();

  const batch = await prismaConnect.badgeBatch.create({
    data: {
      templateId: template.id,
      uploadedByUserId,
      csvOriginalFilename,
      status: "PROCESSING",
      totalRows: rows.length,
      successCount: 0,
      failureCount: 0,
    },
  });

  const issuedBadges = [];
  const duplicateRows: Array<{
    recipientName: string;
    recipientEmail: string;
    badgeTitle: string;
    date: string;
    reason: string;
    existingPublicId: string;
  }> = [];
  const emailedRows: Array<{
    recipientEmail: string;
    publicId: string;
  }> = [];
  const emailFailedRows: Array<{
    recipientEmail: string;
    publicId: string;
    reason: string;
  }> = [];

  for (const row of rows) {
    const issueDate = new Date(row.date);

    if (Number.isNaN(issueDate.getTime())) {
      throw new Error(
        `Invalid date value for recipient "${row.recipientName}": ${row.date}`
      );
    }

    const resolvedBadgeTitle = row.badgeTitle ?? template.name;

    const existingIssuedBadge = await prismaConnect.issuedBadge.findFirst({
      where: {
        templateId: template.id,
        recipientEmail: row.recipientEmail,
        badgeTitle: resolvedBadgeTitle,
        issueDate,
      },
    });

    if (existingIssuedBadge) {
      duplicateRows.push({
        recipientName: row.recipientName,
        recipientEmail: row.recipientEmail,
        badgeTitle: resolvedBadgeTitle,
        date: row.date,
        reason: "A matching badge already exists for this recipient.",
        existingPublicId: existingIssuedBadge.publicId,
      });

      continue;
    }

    const credentialId = randomUUID();
    const publicId = `badge-${randomUUID().slice(0, 8)}`;

    const imageFileBase = `${publicId}-${slugifyForFilename(row.recipientName)}`;

    const { imagePath } = await generateAndSaveBadgeImage(
      {
        recipientName: row.recipientName,
        occupation: row.occupation,
        date: row.date,
      },
      imageFileBase
    );

    const verificationUrl = `/verify/${publicId}`;

    const issuedBadge = await prismaConnect.issuedBadge.create({
      data: {
        batchId: batch.id,
        templateId: template.id,
        recipientName: row.recipientName,
        recipientEmail: row.recipientEmail,
        occupation: row.occupation,
        badgeTitle: resolvedBadgeTitle,
        issueDate,
        credentialId,
        publicId,
        imagePath,
        verificationUrl,
        status: "VALID",
      },
    });

    await prismaConnect.badgeEvent.create({
      data: {
        issuedBadgeId: issuedBadge.id,
        type: "ISSUED",
        payloadJson: {
          recipientName: row.recipientName,
          recipientEmail: row.recipientEmail,
          publicId,
          imagePath,
          verificationUrl,
        },
      },
    });

    const absoluteVerificationUrl = `${baseUrl}${verificationUrl}`;
    const absoluteImageUrl = `${baseUrl}${imagePath}`;

    try {
      await sendIssuedBadgeEmail({
        recipientName: row.recipientName,
        recipientEmail: row.recipientEmail,
        badgeTitle: resolvedBadgeTitle,
        verificationUrl: absoluteVerificationUrl,
        imageUrl: absoluteImageUrl,
      });

      await prismaConnect.badgeEvent.create({
        data: {
          issuedBadgeId: issuedBadge.id,
          type: "EMAILED",
          payloadJson: {
            recipientEmail: row.recipientEmail,
            verificationUrl: absoluteVerificationUrl,
            imageUrl: absoluteImageUrl,
          },
        },
      });

      emailedRows.push({
        recipientEmail: row.recipientEmail,
        publicId,
      });
    } catch (error) {
      emailFailedRows.push({
        recipientEmail: row.recipientEmail,
        publicId,
        reason:
          error instanceof Error
            ? error.message
            : "Unknown email sending error.",
      });
    }

    issuedBadges.push(issuedBadge);
  }

  await prismaConnect.badgeBatch.update({
    where: {
      id: batch.id,
    },
    data: {
      status: "COMPLETED",
      successCount: issuedBadges.length,
      failureCount: duplicateRows.length,
      completedAt: new Date(),
    },
  });

  return {
    batchId: batch.id,
    templateId: template.id,
    issuedCount: issuedBadges.length,
    duplicateCount: duplicateRows.length,
    emailedCount: emailedRows.length,
    emailFailedCount: emailFailedRows.length,
    issuedBadges,
    duplicateRows,
    emailedRows,
    emailFailedRows,
  };
}
