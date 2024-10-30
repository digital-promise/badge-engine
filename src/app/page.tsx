import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import Login from "~/components/login";
import Logout from "~/components/logout";

import badgeEngineByDigitalPromise from "public/alt-badge-engine-logo-color.svg";

export default async function Welcome() {
  const session = await getServerSession(authOptions);

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-6 py-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <Image
          src={badgeEngineByDigitalPromise}
          priority={true}
          height={144}
          width={216}
          alt=""
        />

        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Welcome to Badge Engine!</h1>
          {session === null && (
            <p>
              Please sign in to see what we&apos;ve got for the first release.
            </p>
          )}
        </div>

        {session ? (
          <Logout className="btn mt-5">Sign Out</Logout>
        ) : (
          <Login provider="auth0" className="btn mt-5">
            Sign In
          </Login>
        )}
      </div>
    </main>
  );
}
