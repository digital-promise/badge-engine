"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { type ReactNode } from "react";
import Icon from "~/components/icon";
import Search from "~/components/search";
import edtechSVG from "~/assets/illustrations/institute-empty.svg";

const LAYOUTS = ["list", "blocks"] as const;
export type Layout = (typeof LAYOUTS)[number];

export interface ListingParams {
  s?: string;
  layout?: Layout;
  page?: number;
}

interface PaginationProps {
  count: number;
  limit: number;
}

interface ListViewProps extends PaginationProps {
  total: number;
  children: ReactNode;
  className?: string;
  searchPlaceholder: string;
}

export function ListView({
  className,
  children,
  count,
  limit,
  searchPlaceholder,
}: ListViewProps) {
  return (
    <section className="flex flex-col gap-6">
      <aside className="flex justify-between gap-5">
        <Search
          className="shrink-0 basis-[36.8rem]"
          placeholder={searchPlaceholder}
        />
      </aside>
      {count === 0 ? (
        <NoSearchResults />
      ) : (
        <div className={className}>{children}</div>
      )}
      <Pagination {...{ count, limit }} />
    </section>
  );
}

function NoSearchResults() {
  return (
    <div className="mx-auto flex flex-col items-center text-center gap-6 py-8">
      <Image src={edtechSVG as string} alt="" priority={true} />
      <div className="flex flex-col gap-2 pb-4 pt-2">
        <p className="text-md font-medium">No results were found.</p>
        <p>
          Check your search terms and filters, or contact your site&apos;s
          administrator
        </p>
      </div>
    </div>
  );
}

const Pagination = ({ count, limit }: PaginationProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  if (count <= limit) return null;
  const cutoff = 3;
  const pageParam = searchParams.get("page");

  const currentPage = pageParam ? parseInt(pageParam) : 1;

  const pages = Math.ceil(count / limit);

  const links = Array.from(Array(pages), (_p, i) => i + 1);

  const onFirstPage = currentPage === 1;
  const onLastPage = currentPage === pages;

  const advancePage = (direction: "prev" | "next") => {
    if (
      (onFirstPage && direction === "prev") ||
      (onLastPage && direction === "next")
    )
      return false;

    const nextPage = direction === "prev" ? currentPage - 1 : currentPage + 1;

    const params = new URLSearchParams(searchParams);
    params.set("page", String(nextPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <ul className="flex items-center justify-center gap-4 font-medium">
      <li>
        <button
          className="disabled:text-gray-3"
          disabled={onFirstPage}
          onClick={() => advancePage("prev")}
        >
          <Icon name="arrow-line-left" />
        </button>
      </li>
      {links.map((p) => {
        let linkContent: ReactNode = p;
        const isCurrentPage = p === currentPage;
        const isOutOfRange = pages > cutoff && p > cutoff && p !== pages;

        if (false === isCurrentPage && pages > cutoff && p === cutoff) {
          linkContent = "...";
        } else if (isOutOfRange) {
          return null;
        } else if (false === isCurrentPage) {
          linkContent = <button type="button" className="cursor-pointer" onClick={() => goToPage(p)}>{p}</button>;
        }

        return (
          <li
            data-current-page={p === currentPage || null}
            className="px-3 py-1 data-[current-page]:bg-blue-1 data-[current-page]:text-blue-4"
            key={p}
          >
            {linkContent}
          </li>
        );
      })}
      <li>
        <button
          disabled={onLastPage}
          onClick={() => advancePage("next")}
          className="disabled:text-gray-3"
        >
          <Icon name="arrow-line-right" />
        </button>
      </li>
    </ul>
  );
};
