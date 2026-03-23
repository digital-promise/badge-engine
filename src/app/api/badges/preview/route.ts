import { NextResponse } from "next/server";
import { generateBadge } from "~/server/badges/generateBadge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const recipientName = searchParams.get("name") ?? "Jane Doe";
    const occupation = searchParams.get("occupation") ?? "Counsellor";
    const date = searchParams.get("date") ?? "23 March 2026";

    const badgeBuffer = await generateBadge({
      recipientName,
      occupation,
      date,
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
