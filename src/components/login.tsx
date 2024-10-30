"use client";

import { signIn } from "next-auth/react";
import type { ReactNode } from "react";
import type { BuiltInProviderType } from "next-auth/providers/index";

export default function Login({
  provider,
  className,
  children,
}: {
  provider: BuiltInProviderType;
  className?: string;
  children: ReactNode;
}) {
  const classes = [className, "cursor-pointer"].filter((c) => c).join(" ");

  return (
    <button
      className={classes}
      // Always ask the user to reauthenticate
      // https://next-auth.js.org/getting-started/client#additional-parameters
      onClick={() => signIn(provider, undefined, { prompt: "login" })}
    >
      {children}
    </button>
  );
}
