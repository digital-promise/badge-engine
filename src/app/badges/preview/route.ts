import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { generateBadge } = await import("~/server/badges/generateBadge");

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
      { error: "Failed to generate badge preview." },
      { status: 500 }
    );
  }
}
