import Link from "next/link";
import Image from "next/image";
import { api } from "~/trpc/server";
import CredentialCard from "~/components/CredentialCard";
import Icon from "~/components/icon";
import emptyBadgeSVG from "~/assets/illustrations/badge-empty.svg";
import { IssuerDetailSidebarLayout } from "~/components/issuer";
import BreadcrumbNavigation from "~/components/global/breadcrumb";
import { type ListingParams, ListView } from "~/components/list-view";

export default async function CredentialsList({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: ListingParams;
}) {
  const { s, page } = searchParams;
  const issuer = await api.issuer.find.query({ docId: params.id });

  if (!issuer) return null;

  const breadcrumbs = [
    <Link key="issuer" href={`/issuers/${params.id}`}>
      {issuer.name ?? "Profile"}
    </Link>,
  ];

  const limit = 4;

  const [total, count, achievements] = await api.credential.index.query({
    issuerId: params.id,
    s,
    page,
    limit,
  });

  const Achievements = () =>
    achievements.map((credential) => (
      <CredentialCard key={credential.docId} credential={credential} />
    ));

  const searchPlaceholder = `Search in ${total} achievement${total > 1 ? "s" : ""}`;

  return (
    <>
      <BreadcrumbNavigation items={breadcrumbs} />
      <IssuerDetailSidebarLayout>
        {(total === 0) ? (
          <NoBadges issuerId={issuer.docId} />
        ) : (
          <section className="flex flex-col gap-6">
            <header className="flex items-center justify-between gap-4">
              <h1 className="text-xl font-bold">Achievements</h1>
              <Link
                className="btn"
                href={`/issuers/${params.id}/credentials/new`}
              >
                <Icon name="plus" />
                Create New
              </Link>
            </header>
            <ListView {...{ total, count, limit, searchPlaceholder }} className="mt-6 flex flex-col gap-4">
              <Achievements />
            </ListView>
          </section>
        )}
      </IssuerDetailSidebarLayout>
    </>
  );
}

function NoBadges({ issuerId }: { issuerId: string }) {
  return (
    <>
      <h1 className="border-b border-gray-2 pb-6 text-xl font-bold">
        Achievements
      </h1>
      <div className="flex flex-col items-center gap-4 pb-8 pt-7 text-center">
        <Image src={emptyBadgeSVG as string} alt="" priority={true} />
        <div className="pb-4 pt-2">
          <p className="text-md font-medium">No achievements here yet</p>
          <p className="mt-2">
            You can create a new one or import from a local file.
          </p>
        </div>
        <div className="flex flex-col">
          <Link className="btn" href={`/issuers/${issuerId}/credentials/new`}>
            <Icon name="plus" />
            Create New
          </Link>
        </div>
      </div>
    </>
  );
}
