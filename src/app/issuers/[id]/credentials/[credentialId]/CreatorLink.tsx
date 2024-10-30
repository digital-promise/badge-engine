"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function CreatorProfileLink() {
  const params = useParams();

  if (!params.id) return null;

  return (
    <Link className="btn w-max" href={`/issuers/${params.id.toString()}`}>
        View Issuer
    </Link>
  );
}
