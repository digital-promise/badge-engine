import Image from "next/image";
import Link from "next/link";

import lockSVG from "~/assets/illustrations/lock.svg";

export default function Forbidden() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 py-10">
      <Image
        alt=""
        height={144}
        width={144}
        priority={true}
        src={lockSVG as string}
      />
      <div className="text-center">
        <p className="text-xl">No access to this page</p>
        <p>Contact the site administrator for access.</p>
      </div>
      <Link className="btn" href="/">
        Back to Badge Engine Homepage
      </Link>
    </main>
  );
}
