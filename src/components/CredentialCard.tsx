import Image from "next/image";
import { type RouterOutputs } from "~/trpc/shared";
import compassSVG from "~/assets/illustrations/compass.svg";
import Link from "next/link";

export default function CredentialCard({
  credential,
}: {
  credential: RouterOutputs["credential"]["index"][2][number];
}) {
  let badgeImgSrc = compassSVG as string;

  if (credential.image?.id) {
    badgeImgSrc = credential.image.id;
  }

  return (
    <div className="flex gap-5 rounded-lg border border-gray-2 px-5 py-6">
      <Image
        className="flex-shrink-0 flex-grow-0 basis-[9rem] self-start"
        height={144}
        width={144}
        alt=""
        src={badgeImgSrc}
        priority={true}
      />
      <div className="flex flex-grow flex-col gap-2">
        <p className="text-md font-medium text-blue-4 underline">
          <Link href={`/issuers/${credential.creatorId}/credentials/${credential.docId}`}>{credential.name}</Link>
        </p>
        <p>{credential.description}</p>
      </div>
    </div>
  );
}
