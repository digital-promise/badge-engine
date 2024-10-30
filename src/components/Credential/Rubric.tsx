"use client";

import type { RubricCriterionLevel } from "@prisma/client";
import { useState } from "react";
import Icon from "~/components/icon";

export default function Rubric({ levels }: { levels: RubricCriterionLevel[] }) {
  const [showRubric, setShowRubric] = useState<boolean>(false);
  if (levels.length === 0) return null;

  return (
    <aside className="mt-6 overflow-hidden rounded-lg border border-gray-3">
      <header
        onClick={() => setShowRubric(!showRubric)}
        className={`flex cursor-pointer justify-between gap-5 border-gray-3 px-5 py-4 ${showRubric ? "border-b" : "border-none"}`}
      >
        <h3 className="text-md font-medium">
          <Icon name="rubric" /> Rubric Criterion Level Details
        </h3>
        <Icon name={showRubric ? "arrow-line-up" : "arrow-line-down"} />
      </header>

      <div className={`p-5 ${!showRubric ? "hidden" : "block"}`}>
        <table className="w-full table-auto">
          <thead className="font-bold">
            <tr className="border-b border-gray-2">
              <td className="p-4">Level</td>
              <td className="px-4">Description</td>
            </tr>
          </thead>
          <tbody>
            {levels.map((level, index) => (
              <RubricCriterionRow key={index} criterion={level} />
            ))}
          </tbody>
        </table>
      </div>
    </aside>
  );
}

function RubricCriterionRow({
  criterion: { level, description },
}: {
  criterion: RubricCriterionLevel;
}) {
  return (
    <tr className="border-b border-gray-2 last:border-none">
      <td className="p-4">{level}</td>
      <td className="p-4">{description}</td>
    </tr>
  );
}
