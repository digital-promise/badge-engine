import { api } from "~/trpc/server";
import { type NextRequest, NextResponse } from "next/server";
import { isAuthorized } from "~/lib/api-middleware";
import { env } from "~/env.mjs";

const maybeAddHttps = (url: string) => {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = "https://" + url;
  }
  return url;
};

function paginationLink(page: number, rel: string) {
  const baseUrl = maybeAddHttps(env.NEXTAUTH_URL)
  const url = new URL(`/api/achievements?page=${page}`, baseUrl)

  return `<${url.toString()}>; rel="${rel}"`;
}

export const GET = async function GET(
  req: NextRequest,
) {
  const authorization = await isAuthorized(req);

  if (authorization) {
    const limit = 20;
    const { searchParams } = new URL(req.url);
    const pageParam = searchParams.get("page")
    const currentPage = pageParam ? parseInt(pageParam) : 1
  
    const [total, _searchTotal, achievements] =
      await api.credential.index.query({
        includeAll: true,
        page: currentPage,
        limit,
      });

    const response = NextResponse.json(achievements);

    if (total > limit) {
      const lastPage = Math.ceil(total / limit);

      const links = [
        paginationLink(1, "first"),
        paginationLink(lastPage, "last"),
      ];

      if (currentPage < lastPage) {
        links.push(paginationLink(currentPage + 1, "next"));
      }

      if (currentPage > 1) {
        links.push(paginationLink(currentPage - 1, "prev"));
      }

      response.headers.set("X-Total-Count", total.toString());
      response.headers.set("Link", links.join(","));
    }

    return response;
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
};
