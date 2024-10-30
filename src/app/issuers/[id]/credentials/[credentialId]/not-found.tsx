
import Image from "next/image";
import CreatorLink from "./CreatorLink"
import emptyBadgeSVG from "~/assets/illustrations/badge-empty.svg";

export default function IssuerNotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center gap-6 py-8 text-center">
      <h1 className="text-xl font-bold">Credential Not Found</h1>
      <Image src={emptyBadgeSVG as string} alt="" priority={true} />

      <div className="flex flex-col gap-1 p-1">
        <p className="font-bold">
          The credential you are attempting to view could not be
          found.
        </p>
        <p>
          Verify that you have the correct URL, or search the issuing organization&apos;s achievements.
        </p>
      </div>
      <CreatorLink />
    </main>
  );
}

