"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col text-center gap-6 py-8">
      <h1 className="text-xl font-bold">Error</h1>
    
      <div className="flex flex-col gap-2 p-1">
        <p className="font-bold">
          Badge Engine encountered an unhandled error.
        </p>
        <p>
          Verify that you have the correct URL, or contact the site administrator for assistance.
        </p>
      </div>
    </main>
  );
}
