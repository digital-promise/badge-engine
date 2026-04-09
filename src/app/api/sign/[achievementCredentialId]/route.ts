import { NextResponse } from "next/server";

const POST = async function POST() {
  return NextResponse.json(
    {
      error: "Signing is temporarily disabled in this deployment.",
    },
    { status: 503 },
  );
};

export { POST };
