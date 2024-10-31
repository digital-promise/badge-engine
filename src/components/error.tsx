import Image from "next/image";
import Link from "next/link";
import edtechSVG from "~/assets/illustrations/institute-empty.svg";

export function NotImplemented() {
  return (
    <section className="flex flex-col items-center gap-4 text-center">
      <Image src={edtechSVG as string} alt="" priority={true} />
      <div className="flex flex-col gap-2 pb-4 pt-2">
        <p className="text-md font-medium">Coming soon...</p>
        <p>We&apos;re working hard on designing and developing this page.</p>
      </div>
      <Link className="btn" href="/">
        Back to Homepage
      </Link>
    </section>
  );
}
