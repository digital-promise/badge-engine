import Image from "next/image";
import type { Credential } from "~/trpc/shared";
import CredentialDetails from "~/components/Credential/CredentialDetails";
import { TabList, type TabListProps } from "~/components/Tabs/TabList";
import AwardHistory from "~/components/Credential/AwardHistory";
import { TRPCReactProvider } from "~/trpc/react";
import Link from "next/link";
import Icon from "../icon";

export default function Credential({
  preview,
  credential,
}: {
  preview?: boolean;
  credential: Credential;
}) {
  const tabs: TabListProps["tabs"] = [
    {
      label: "Achievement Details",
      id: "achievement-details",
      content: <CredentialDetails credential={credential} />,
    },
  ];

  if (preview !== true)
    tabs.push({
      label: "Award History",
      id: "award-history",
      content: (
        <TRPCReactProvider>
          <AwardHistory credential={credential} />
        </TRPCReactProvider>
      ),
    });

  return (
    <article className="mx-auto flex w-[75rem] max-w-full gap-7 py-8">
      <aside className="flex-shrink-0 basis-[240px]">
        {credential.image?.id && (
          <Image alt="" src={credential.image.id} height={240} width={240} />
        )}
      </aside>
      <div className="flex flex-grow flex-col gap-7">
        <header className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-4">
            <h1 className="flex-grow-0 basis-[44.25rem] text-xl font-bold">
              {credential.name}
            </h1>
            {!preview && (
              <Link
                href={`${credential.docId}/award`}
                className="btn"
                prefetch={true}
              >
                Award <Icon name="badge" />
              </Link>
            )}
          </div>

          <p className="mt-2">{credential.description}</p>
        </header>

        <TabList tabs={tabs} />
      </div>
    </article>
  );
}
