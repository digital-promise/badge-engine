"use client";

import { signOut } from "next-auth/react";
import type { ReactNode } from "react";

export default function Logout({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const classes = [className, "pointer-cursor"].filter((c) => c).join(" ");

  return (
    <button className={classes} onClick={() => signOut()}>
      {children}
    </button>
  );
}
