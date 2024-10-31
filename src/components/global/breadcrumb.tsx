import Link from "next/link";
import { type ReactNode } from "react";
import Icon from "~/components/icon";

export default function BreadcrumbNavigation({
  items,
  root,
}: {
  items: ReactNode[];
  root?: ReactNode;
}) {
  if (0 === items.length) return null; // Do not render if items is empty.

  const menuRoot = root ?? <Link href="/issuers">Issuing Organizations</Link>;

  const menuItems = [menuRoot, ...items];

  return (
    <nav className="contents">
      <ul className="mx-auto my-2 flex max-w-[75rem] items-center gap-2 font-medium">
        {menuItems.map((i, index) => {
          const isLast = index === menuItems.length - 1;
          return (
            <li
              className="py-3 text-blue-4 underline last:text-neutral-5 last:no-underline last:font-light"
              key={index}
            >
              {i}
              {menuItems.length !== 1 && false === isLast && (
                <Icon
                  name="arrow-line-right"
                  className="!mr-0 ml-2 text-neutral-5"
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
