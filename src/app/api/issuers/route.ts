import { api } from "~/trpc/server";
import { type NextRequest, NextResponse } from "next/server";
import { isAuthorized } from "~/lib/api-middleware";

export const GET = async function GET(req: NextRequest) {
  const authorization = await isAuthorized(req);

  if (authorization) {
    const issuers = await api.issuer.index.query({});

    return NextResponse.json(issuers);
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
};
