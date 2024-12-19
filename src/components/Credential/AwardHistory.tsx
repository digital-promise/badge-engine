"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

import type { Credential, AwardHistory as IAwardHistory } from "~/trpc/shared";
import Icon from "../icon";

export const AwardHistory = ({ credential }: { credential: Credential }) => {
  const [query, setQuery] = useState<string>("");
  const { data: awards } = api.award.index.useQuery({
    credentialId: credential.docId,
    query,
  });

  return (
    <section className="flex flex-col gap-6">
      <form onSubmit={(e) => e.preventDefault()}>
        <label className="sr-only" htmlFor="recipient-search">
          Search in recipients
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 z-10 -translate-y-1/2">
            <Icon name="magnifier" className="text-gray-5" />
          </span>
          <input
            className="block w-[27rem] rounded py-3 pl-7 pr-4 text-base text-neutral-5 outline outline-1 outline-gray-5 transition placeholder:text-gray-5 focus:outline-2 focus:outline-blue-4"
            id="recipient-search"
            type="search"
            placeholder="Search in recipients"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </form>
      <table className="w-full table-auto border-y border-gray-2 text-gray-5">
        <thead className="font-bold">
          <tr>
            <td className="px-3 py-4">Recipient Name</td>
            <td className="px-3 py-4">Status</td>
            <td className="px-3 py-4">Awarded on</td>
          </tr>
        </thead>
        <tbody>
          {awards?.map((award, index) => (
            <AwardListItem key={index} award={award} />
          ))}
        </tbody>
      </table>
    </section>
  );
};

const AwardListItem = ({ award }: { award: IAwardHistory[number] }) => {
  const {
    credentialSubject: { profile },
    awardedDate,
  } = award;

  const name =
    profile?.name ??
    ([profile?.givenName, profile?.familyName]
      .filter((n) => n)
      .join(" ")
      .trim() ||
      "Anonymous User");

  return (
    <tr className="border-t border-gray-2">
      <td className="px-3 py-4">
        <p className="font-medium text-neutral-5">{name}</p>
        {profile?.email && <p>{profile.email}</p>}
      </td>

      <td className="px-3 py-4">
        <p
          data-status={award.claimed ? "claimed" : "pending"}
          className="font-semibold before:mr-2 before:content-['\2022'] data-[status=claimed]:text-green-5 data-[status=pending]:text-gray-4"
        >
          {award.claimed ? "Claimed" : "Awaiting Claim"}
        </p>
      </td>

      <td className="px-3 py-4">
        {awardedDate && (
          <p>
            {new Date(awardedDate).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </p>
        )}
      </td>
    </tr>
  );
};

export default AwardHistory;
