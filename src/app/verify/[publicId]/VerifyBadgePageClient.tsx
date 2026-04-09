"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type VerifyBadgePageClientProps = {
  badgeImageSrc: string;
  badgeTitle: string;
  credentialId: string;
  issueDateLabel: string;
  isRevoked: boolean;
  occupation: string | null;
  hpscaRegistrationNumber: string | null;
  publicId: string;
  recipientName: string;
  recipientEmailMasked: string;
  verificationUrl: string;
};

function buildLinkedInText(input: {
  badgeTitle: string;
  verificationUrl: string;
}) {
  return `I’m pleased to share that I’ve been awarded the "${input.badgeTitle}" badge.

You can verify it here:
${input.verificationUrl}`;
}

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export default function VerifyBadgePageClient(
  props: VerifyBadgePageClientProps
) {
  const {
    badgeImageSrc,
    badgeTitle,
    credentialId,
    issueDateLabel,
    isRevoked,
    occupation,
    hpscaRegistrationNumber,
    publicId,
    recipientName,
    recipientEmailMasked,
    verificationUrl,
  } = props;

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const linkedInText = useMemo(() => {
    return buildLinkedInText({
      badgeTitle,
      verificationUrl,
    });
  }, [badgeTitle, verificationUrl]);

  async function handleCopyLink() {
    try {
      await copyText(verificationUrl);
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2000);
    } catch (error) {
      console.error("Failed to copy verification link:", error);
    }
  }

  async function handleCopyLinkedInText() {
    try {
      await copyText(linkedInText);
      setCopiedText(true);
      window.setTimeout(() => setCopiedText(false), 2000);
    } catch (error) {
      console.error("Failed to copy LinkedIn text:", error);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-wide">
          Badge Verification
        </p>
        <h1 className="text-2xl font-bold">
          {isRevoked ? "Badge Revoked" : "Badge Verified"}
        </h1>
        <p>
          This page confirms whether the badge record exists in the system and
          whether it is currently valid.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[420px_minmax(0,1fr)]">
        <section className="rounded-lg border border-neutral-3 p-6">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold">Badge artwork</p>

            <div className="overflow-hidden rounded-lg border border-neutral-3 p-4">
              <Image
                src={badgeImageSrc}
                alt={`${badgeTitle} badge`}
                width={3004}
                height={3004}
                className="h-auto w-full"
                priority
              />
            </div>

            <div className="rounded-lg border border-neutral-3 p-4">
              <p className="text-sm font-semibold">Status</p>
              <p className="mt-1">{isRevoked ? "REVOKED" : "VALID"}</p>
            </div>

            <a
              href={badgeImageSrc}
              download={`${publicId}.png`}
              className="inline-flex w-fit rounded border border-neutral-4 px-4 py-2 font-semibold"
            >
              Download badge
            </a>

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex w-fit rounded border border-neutral-4 px-4 py-2 font-semibold"
            >
              {copiedLink ? "Verification link copied" : "Copy verification link"}
            </button>
          </div>
        </section>

        <div className="flex flex-col gap-6">
          <section className="rounded-lg border border-neutral-3 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold">Badge title</p>
                <p>{badgeTitle}</p>
              </div>

              <div>
                <p className="text-sm font-semibold">Issue date</p>
                <p>{issueDateLabel}</p>
              </div>

              <div>
                <p className="text-sm font-semibold">Recipient name</p>
                <p>{recipientName}</p>
              </div>

              <div>
                <p className="text-sm font-semibold">Occupation</p>
                <p>{occupation ?? "—"}</p>
              </div>

              <div>
                <p className="text-sm font-semibold">HPSCA Registration Number</p>
                <p>{hpscaRegistrationNumber ?? "—"}</p>
              </div>

              <div>
                <p className="text-sm font-semibold">Recipient email</p>
                <p>{recipientEmailMasked}</p>
              </div>

              <div>
                <p className="text-sm font-semibold">Public ID</p>
                <p>{publicId}</p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-sm font-semibold">Credential ID</p>
                <p className="break-all">{credentialId}</p>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-neutral-3 p-6">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold">Verification summary</p>

              {isRevoked ? (
                <p>
                  This badge was issued previously, but it is no longer valid.
                </p>
              ) : (
                <p>
                  This badge is valid and has been issued by the system record.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-lg border border-neutral-3 p-6">
            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold">Share this badge</p>

              <p>
                Recipients can share the badge image on LinkedIn or in a CV, and
                include the verification URL so employers or reviewers can check
                authenticity.
              </p>

              <div className="rounded-lg border border-neutral-3 p-4">
                <p className="text-sm font-semibold">Verification URL</p>
                <p className="mt-2 break-all">{verificationUrl}</p>
              </div>

              <div className="rounded-lg border border-neutral-3 p-4">
                <p className="text-sm font-semibold">Suggested LinkedIn text</p>
                <pre className="mt-2 whitespace-pre-wrap break-words text-sm">
                  {linkedInText}
                </pre>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCopyLinkedInText}
                  className="inline-flex rounded border border-neutral-4 px-4 py-2 font-semibold"
                >
                  {copiedText ? "LinkedIn text copied" : "Copy LinkedIn text"}
                </button>

                <a
                  href="https://www.linkedin.com/feed/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded border border-neutral-4 px-4 py-2 font-semibold"
                >
                  Open LinkedIn
                </a>
              </div>

              <div className="rounded-lg border border-neutral-3 p-4">
                <p className="text-sm font-semibold">Suggested sharing steps</p>
                <ol className="mt-2 list-decimal pl-5 text-sm">
                  <li>Download the badge image.</li>
                  <li>Create a LinkedIn post or add it to a profile section.</li>
                  <li>Paste the verification URL.</li>
                  <li>Use the suggested text as a starting point.</li>
                </ol>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
