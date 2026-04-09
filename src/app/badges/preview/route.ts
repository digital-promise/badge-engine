import { NextResponse } from "next/server";
import { generateBadge } from "~/server/badges/generateBadge";

export async function GET() {
  try {
    const badgeBuffer = await generateBadge({
      recipientName: "Jane Doe",
      occupation: "Counsellor",
      date: "23 March 2026",
      hpscaRegistrationNumber: "PS0000000",
    });

    return new NextResponse(badgeBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": 'inline; filename="badge-preview.png"',
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Badge preview generation failed:", error);

    return NextResponse.json(
      { error: "Failed to generate badge preview" },
      { status: 500 }
    );
  }
}
