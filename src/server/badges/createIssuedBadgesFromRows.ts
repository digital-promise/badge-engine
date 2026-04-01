import { randomUUID } from "crypto";

import { prismaConnect } from "~/server/db/prismaConnect";
import { generateAndSaveBadgeImage } from "~/server/badges/generateBadge";
import { getActiveBadgeTemplate } from "~/server/badges/getActiveBadgeTemplate";
import type { ParsedBadgeCsvRow } from "~/server/badges/parseCsv";

type CreateIssuedBadgesFromRowsInput = {
  rows: ParsedBadgeCsvRow[];
  uploadedByUserId?: string;
  csvOriginalFilename?: string;
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
  const { rows, uploadedByUserId, csvOriginalFilename } = input;

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

  for (const row of rows) {
    const credentialId = randomUUID();
    const publicId = `badge-${randomUUID().slice(0, 8)}`;

    const issueDate = new Date(row.date);

    if (Number.isNaN(issueDate.getTime())) {
      throw new Error(
        `Invalid date value for recipient "${row.recipientName}": ${row.date}`
      );
    }

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
        badgeTitle: row.badgeTitle ?? template.name,
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

    issuedBadges.push(issuedBadge);
  }

  await prismaConnect.badgeBatch.update({
    where: {
      id: batch.id,
    },
    data: {
      status: "COMPLETED",
      successCount: issuedBadges.length,
      failureCount: rows.length - issuedBadges.length,
      completedAt: new Date(),
    },
  });

  return {
    batchId: batch.id,
    templateId: template.id,
    issuedCount: issuedBadges.length,
    issuedBadges,
  };
}
