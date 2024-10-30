"use client";

import { type ReactNode, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { IssuerContext } from "../providers/issuer-provider";
import Icon from "~/components/icon";

export function IssuerDetailSidebarLayout({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-screen max-w-[75rem] gap-7 py-6">
      <IssuerDetailNav />
      <section className="flex-grow">{children}</section>
    </main>
  );
}

export function IssuerDetailNav() {
  const pathname = usePathname();
  const issuer = useContext(IssuerContext);

  if (!issuer) {
    return "";
  }

  let issuerImageSrc = "/DigitalPromise.svg";

  if (issuer.image) {
    issuerImageSrc = issuer.image.id;
  }

  const issuerBaseUrl = `/issuers/${issuer.docId}`;

  const menuItems = [
    <Link key="badges" href={issuerBaseUrl}>
      <Icon name="badge" className="mr-3" /> Achievements
    </Link>,
    <Link key="collaborators" href={`${issuerBaseUrl}/collaborators`}>
      <Icon name="community" className="mr-3" /> Collaborators
    </Link>,
    <Link key="collections" href={`${issuerBaseUrl}/collections`}>
      <Icon name="certificate" className="mr-3" /> Collections
    </Link>,
    <Link key="settings" href={`${issuerBaseUrl}/settings`}>
      <Icon name="setting" className="mr-3" /> Org Settings
    </Link>,
  ];
  return (
    <nav className="flex flex-shrink-0 flex-grow-0 basis-[15rem] flex-col gap-7 border-r border-gray-2 pr-7">
      <div className="flex flex-col items-center gap-3">
        <Image
          alt=""
          src={issuerImageSrc}
          priority={true}
          className="object-scale-down object-center"
          width={168}
          height={168}
        />
        <p className="break-words">{issuer.name}</p>
      </div>
      <ul className="sidebar-menu flex w-[12rem] flex-col gap-4 font-bold">
        {menuItems.map((item, key) => {
          const props = item.props as LinkProps;
          const active = props.href === pathname;

          return (
            <li key={key} className={active ? "active" : ""}>
              {item}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
