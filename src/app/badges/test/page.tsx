"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export default function BadgeTestPage() {
  const [recipientName, setRecipientName] = useState("Jane Doe");
  const [occupation, setOccupation] = useState("Counsellor");
  const [date, setDate] = useState("23 March 2026");

  const previewUrl = useMemo(() => {
    const params = new URLSearchParams({
      name: recipientName,
      occupation,
      date,
    });

    return `/api/badges/preview?${params.toString()}`;
  }, [recipientName, occupation, date]);

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-bold">Badge Preview Tester</h1>
        <p>
          Edit the fields below to preview your badge with different recipient
          details.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[380px_minmax(0,1fr)]">
        <section className="rounded-lg border border-neutral-3 p-6">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="recipientName" className="font-semibold">
                Recipient name
              </label>
              <input
                id="recipientName"
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="rounded border border-neutral-4 px-3 py-2"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="occupation" className="font-semibold">
                Occupation
              </label>
              <input
                id="occupation"
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="rounded border border-neutral-4 px-3 py-2"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="date" className="font-semibold">
                Date
              </label>
              <input
                id="date"
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded border border-neutral-4 px-3 py-2"
              />
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <p className="font-semibold">Preview URL</p>
              <code className="break-all rounded bg-neutral-1 p-3 text-sm">
                {previewUrl}
              </code>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-md font-semibold">Live preview</h2>
          <div className="flex flex-col gap-4 rounded-lg border border-neutral-3 p-4">
            <Image
              src={previewUrl}
              alt="Generated badge preview"
              width={1200}
              height={850}
              unoptimized
              className="h-auto max-w-full"
            />

            <a
              href={previewUrl}
              download="badge-preview.png"
              className="inline-flex w-fit rounded bg-blue-600 px-4 py-2 font-semibold text-white"
            >
              Download PNG
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
