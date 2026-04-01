import { NextResponse } from "next/server";

import { createIssuedBadgesFromRows } from "~/server/badges/createIssuedBadgesFromRows";
import { parseCsv } from "~/server/badges/parseCsv";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          ok: false,
          error: "No CSV file was uploaded.",
        },
        { status: 400 }
      );
    }

    const csvText = await file.text();
    const rows = parseCsv(csvText);

    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    const result = await createIssuedBadgesFromRows({
      rows,
      csvOriginalFilename: file.name,
      baseUrl,
    });

    return NextResponse.json({
      ok: true,
      message: "CSV uploaded and badge processing completed.",
      batchId: result.batchId,
      templateId: result.templateId,
      issuedCount: result.issuedCount,
      duplicateCount: result.duplicateCount,
      emailedCount: result.emailedCount,
      emailFailedCount: result.emailFailedCount,
      issuedBadges: result.issuedBadges.map((badge) => ({
        id: badge.id,
        recipientName: badge.recipientName,
        recipientEmail: badge.recipientEmail,
        publicId: badge.publicId,
        credentialId: badge.credentialId,
        badgeTitle: badge.badgeTitle,
        issueDate: badge.issueDate,
        status: badge.status,
        imagePath: badge.imagePath,
        verificationUrl: badge.verificationUrl,
      })),
      duplicateRows: result.duplicateRows,
      emailedRows: result.emailedRows,
      emailFailedRows: result.emailFailedRows,
    });
  } catch (error) {
    console.error("CSV upload failed:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error while uploading CSV.",
      },
      { status: 500 }
    );
  }
}
