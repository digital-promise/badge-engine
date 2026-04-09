import { NextResponse } from "next/server";

import { createIssuedBadgesFromRows } from "~/server/badges/createIssuedBadgesFromRows";

export async function GET() {
  try {
    const result = await createIssuedBadgesFromRows({
      csvOriginalFilename: "test-batch.csv",
      rows: [
        {
          recipientName: "Jane Doe",
          recipientEmail: "jane@example.com",
          occupation: "Counsellor",
          date: "2026-04-01",
          hpscaRegistrationNumber: "PS0000000",
          badgeTitle: "SLIM Master Competence",
        },
        {
          recipientName: "Alex Smith",
          recipientEmail: "alex@example.com",
          occupation: "Educator",
          date: "2026-04-01",
          hpscaRegistrationNumber: "PS0000000",
          badgeTitle: "SLIM Master Competence",
        },
      ],
    });

    return NextResponse.json({
      ok: true,
      message: "Test batch created successfully.",
      batchId: result.batchId,
      templateId: result.templateId,
      issuedCount: result.issuedCount,
      issuedBadges: result.issuedBadges.map((badge) => ({
        id: badge.id,
        recipientName: badge.recipientName,
        recipientEmail: badge.recipientEmail,
        publicId: badge.publicId,
        credentialId: badge.credentialId,
        badgeTitle: badge.badgeTitle,
        issueDate: badge.issueDate,
        status: badge.status,
      })),
    });
  } catch (error) {
    console.error("Test batch creation failed:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error while creating test batch.",
      },
      { status: 500 }
    );
  }
}
