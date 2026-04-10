import { NextResponse } from "next/server";

import { prismaConnect } from "~/server/db/prismaConnect";
import { generateBadge } from "~/server/badges/generateBadge";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: { publicId: string } }
) {
  try {
    const issuedBadge = await prismaConnect.issuedBadge.findUnique({
      where: {
        publicId: params.publicId,
      },
    });

    if (!issuedBadge) {
      return NextResponse.json(
        { error: "Badge not found." },
        { status: 404 }
      );
    }

    const badgeBuffer = await generateBadge({
      recipientName: issuedBadge.recipientName ?? "",
      occupation: issuedBadge.occupation ?? "",
      date: issuedBadge.issueDate.toLocaleDateString("en-GB"),
      hpscaRegistrationNumber: issuedBadge.hpscaRegistrationNumber ?? "",
    });

    return new NextResponse(badgeBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `inline; filename="${issuedBadge.publicId}.png"`,
        "Cache-Control": "public, max-age=0",
      },
    });
  } catch (error) {
    console.error("Badge image generation failed:", error);

    return NextResponse.json(
      { error: "Failed to generate badge image." },
      { status: 500 }
    );
  }
}
