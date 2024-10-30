import Image from "next/image";
import Link from "next/link";
import instituteEmpty from "~/assets/illustrations/institute-empty.svg";

export default function IssuerNotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center gap-6 py-8 text-center">
      <h1 className="text-xl font-bold">Issuer Not Found</h1>
      <Image src={instituteEmpty as string} alt="" priority={true} />

      <div className="flex flex-col gap-1 p-1">
        <p className="font-bold">
          The issuing organization you are attempting to view could not be
          found.
        </p>
        <p>
          Verify that you have the correct URL, or search for the organization
          on the
          <Link className="underline" href="/issuers">
            issuers page
          </Link>
          .
        </p>
      </div>

      <Link className="btn" href="/issuers">
        Return to issuers
      </Link>
    </main>
  );
}
