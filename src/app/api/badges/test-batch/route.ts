import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Not available in production." },
      { status: 404 }
    );
  }

  try {
    const { createIssuedBadgesFromRows } = await import(
      "~/server/badges/createIssuedBadgesFromRows"
    );

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
          hpscaRegistrationNumber: "PS0000001",
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
      duplicateCount: result.duplicateCount,
      emailedCount: result.emailedCount,
      emailFailedCount: result.emailFailedCount,
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
