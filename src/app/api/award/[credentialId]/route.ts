import { api } from "~/trpc/server";
import { type NextRequest, NextResponse } from "next/server";
import { isAuthorized } from "~/lib/api-middleware";
import { CreateAwardSchema } from "~/server/api/schemas/award.schema";

const POST = async function POST(
  req: NextRequest,
  { params: { credentialId } }: { params: { credentialId: string } },
) {
  const authorization = await isAuthorized(req);

  if (authorization) {
    try {
      const awardInput = CreateAwardSchema.omit({
        credentialId: true,
      }).parse(await req.json());

      const newAward = await api.award.create.mutate({
        ...awardInput,
        email: "victor@gmail.com",
        credentialId,
      });
      return NextResponse.json(newAward);
    } catch (e) {
      return NextResponse.json(
        { error: (e as Error).message },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
};

export { POST };
