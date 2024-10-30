"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Icon from "~/components/icon";

export default function Search({
  placeholder,
  className,
}: {
  placeholder: string;
  className?: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const updateSearch = function (q: string): void {
    const params = new URLSearchParams(searchParams);
    if (q) {
      params.set("s", q);
    } else {
      params.delete("s");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form className={className ?? ""}>
      <label className="sr-only" htmlFor="search">
        Search
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 z-10 -translate-y-1/2">
          <Icon name="magnifier" className="text-gray-5" />
        </span>
        <input
          className="relative text-base block w-full rounded py-3 pl-7 pr-4 text-neutral-5 outline outline-1 outline-gray-5 transition placeholder:text-gray-5 focus:outline-2 focus:outline-blue-4"
          id="search"
          type="search"
          defaultValue={searchParams.get("s")?.toString()}
          placeholder={placeholder}
          onChange={(e) => updateSearch(e.target.value)}
        />
      </div>
    </form>
  );
}
