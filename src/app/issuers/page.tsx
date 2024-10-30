import Link from "next/link";
import Image from "next/image";
import { api } from "~/trpc/server";
import instituteEmpty from "~/assets/illustrations/institute-empty.svg";
import type { RouterOutputs } from "~/trpc/shared";
import { ListView } from "~/components/list-view";
import { ellipsis } from "~/util";
import Icon from "~/components/icon";
import type { ListingParams } from "~/components/list-view";

export default async function Issuers({
  searchParams,
}: {
  searchParams: ListingParams;
}) {
  const { s, page } = searchParams;
  const limit = 6;
  const [total, count, issuers] = await api.issuer.index.query({
    s,
    page,
    limit,
  });

  if (total === 0) return <NoIssuers />;

  const IssuerItems = () =>
    issuers.map((issuer, index) => <IssuerCard key={index} issuer={issuer} />);

  const searchPlaceholder = `Search in ${total} organization${total > 1 ? "s" : ""}`;

  return (
    <main className="mx-auto flex min-h-screen max-w-[75rem] flex-col gap-6 py-8">
      <header className="flex justify-between">
        <h1 className="text-xl font-bold">Issuing Organizations</h1>
        <Link
          className="h-[3rem] rounded-3xl border-2 border-blue-3 px-5 py-3 text-base font-bold leading-5 text-primary"
          href="/issuers/new"
        >
          <Icon name="plus" className="mr-2" />
          Add Organization
        </Link>
      </header>
      <ListView
        className="grid grid-cols-2 gap-5"
        {...{ total, count, limit, searchPlaceholder }}
      >
        <IssuerItems />
      </ListView>
    </main>
  );
}

const IssuerCard = ({
  issuer,
}: {
  issuer: RouterOutputs["issuer"]["index"][2][number];
}) => {
  let issuerImageSrc = "/DigitalPromise.svg";

  if (issuer.image) {
    issuerImageSrc = issuer.image.id;
  }

  return (
    <article className="flex gap-5 rounded-lg border border-gray-2 px-5 py-6">
      <Image
        className="self-start bg-gray-1"
        priority={true}
        alt=""
        src={issuerImageSrc}
        height={144}
        width={144}
      ></Image>
      <div className="flex flex-col gap-2">
        <Link
          href={`/issuers/${issuer.docId}`}
          className="break-words text-md font-bold text-primary underline"
        >
          {issuer.name}
        </Link>
        <p>{ellipsis(issuer.description ?? "")}</p>

        <div className="mt-auto flex divide-x divide-gray-3 font-medium text-gray-5">
          {issuer._count.Achievement > 0 && (
            <p className="[&:not(:first-child)]:pl-3 [&:not(:last-child)]:pr-3">
              <span className="font-bold">{issuer._count.Achievement}</span>{" "}
              {issuer._count.Achievement === 1 ? "Achievement" : "Achievements"}
            </p>
          )}

          {issuer._count.childOrgs > 0 && (
            <p className="[&:not(:first-child)]:pl-3 [&:not(:last-child)]:pr-3">
              <span className="font-bold">{issuer._count.childOrgs}</span>{" "}
              {issuer._count.childOrgs === 1 ? "Collaborator" : "Collaborators"}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

const NoIssuers = () => {
  return (
    <>
      <h1 className="text-xl font-bold">Issuing Organizations</h1>
      <section className="flex flex-col gap-5 border-y border-gray-2 py-7 text-center">
        <Image
          src={instituteEmpty as string}
          alt=""
          className="self-center"
          priority={true}
        ></Image>

        <div className="flex flex-col gap-1 p-1">
          <p className="text-lg font-medium">
            You have no issuing organization yet.
          </p>
          <p>
            Let&apos;s add your first organization to start awarding badges.
          </p>
        </div>

        <Link
          className="self-center rounded-3xl bg-primary px-5 py-2 font-bold text-neutral-1"
          href="/issuers/new"
        >
          Add Organization
        </Link>
      </section>
    </>
  );
};
