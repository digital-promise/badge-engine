import { api } from "~/trpc/server";
import { type NextRequest, NextResponse } from "next/server";
import { isAuthorized } from "~/lib/api-middleware";

const POST = async function POST(
  req: NextRequest,
  {
    params: { achievementCredentialId },
  }: { params: { achievementCredentialId: string } },
) {
  const authorization = await isAuthorized(req);

  if (authorization) {
    try {
      const achievementCredential = await api.award.find.query(
        achievementCredentialId,
      );

      const signedCredential = await api.signing.createProof.mutate({
        ...achievementCredential,
        type: ["VerifiableCredential", ...achievementCredential.type],
      });

      return NextResponse.json(signedCredential);
    } catch (e) {
      return NextResponse.json(JSON.parse((e as Error).message), {
        status: 500,
      });
    }
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
};

export { POST };
