"use client";

import { useState } from "react";

type UploadResponse = {
  ok: boolean;
  message?: string;
  batchId?: string;
  templateId?: string;
  issuedCount?: number;
  issuedBadges?: Array<{
    id: string;
    recipientName: string;
    recipientEmail: string;
    publicId: string;
    credentialId: string;
    badgeTitle: string | null;
    issueDate: string;
    status: string;
    imagePath?: string | null;
    verificationUrl?: string | null;
  }>;
  error?: string;
};

export default function BadgeUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<UploadResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      setError("Please choose a CSV file first.");
      setResult(null);
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/badges/upload", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as UploadResponse;

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Upload failed.");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown upload error.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-6 py-10">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-wide">
          Badge Upload
        </p>
        <h1 className="text-2xl font-bold">Upload badge recipients CSV</h1>
        <p>
          Upload a CSV file to generate issued badges from real recipient data.
        </p>
      </div>

      <section className="rounded-lg border border-neutral-3 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="csvFile" className="font-semibold">
              CSV file
            </label>
            <input
              id="csvFile"
              type="file"
              accept=".csv,text/csv"
              onChange={(event) => {
                const selectedFile = event.target.files?.[0] ?? null;
                setFile(selectedFile);
              }}
              className="rounded border border-neutral-4 px-3 py-2"
            />
          </div>

          <div className="rounded-lg border border-neutral-3 p-4">
            <p className="text-sm font-semibold">Expected CSV headers</p>
            <code className="mt-2 block break-all text-sm">
              recipientName,recipientEmail,occupation,date,badgeTitle
            </code>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-fit rounded border border-neutral-4 px-4 py-2 font-semibold disabled:opacity-50"
          >
            {isSubmitting ? "Uploading..." : "Upload CSV"}
          </button>
        </form>
      </section>

      {error ? (
        <section className="rounded-lg border border-red-400 p-6">
          <p className="font-semibold">Upload error</p>
          <p className="mt-2">{error}</p>
        </section>
      ) : null}

      {result ? (
        <section className="rounded-lg border border-neutral-3 p-6">
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Upload result</p>
            <p>Batch ID: {result.batchId}</p>
            <p>Template ID: {result.templateId}</p>
            <p>Issued count: {result.issuedCount}</p>
          </div>

          {result.issuedBadges?.length ? (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr>
                    <th className="border-b border-neutral-3 px-3 py-2">
                      Recipient
                    </th>
                    <th className="border-b border-neutral-3 px-3 py-2">
                      Email
                    </th>
                    <th className="border-b border-neutral-3 px-3 py-2">
                      Public ID
                    </th>
                    <th className="border-b border-neutral-3 px-3 py-2">
                      Status
                    </th>
                    <th className="border-b border-neutral-3 px-3 py-2">
                      Verification
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.issuedBadges.map((badge) => (
                    <tr key={badge.id}>
                      <td className="border-b border-neutral-2 px-3 py-2">
                        {badge.recipientName}
                      </td>
                      <td className="border-b border-neutral-2 px-3 py-2">
                        {badge.recipientEmail}
                      </td>
                      <td className="border-b border-neutral-2 px-3 py-2">
                        {badge.publicId}
                      </td>
                      <td className="border-b border-neutral-2 px-3 py-2">
                        {badge.status}
                      </td>
                      <td className="border-b border-neutral-2 px-3 py-2">
                        {badge.verificationUrl ? (
                          <a
                            href={badge.verificationUrl}
                            className="underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Open verification page
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </section>
      ) : null}
    </main>
  );
}
