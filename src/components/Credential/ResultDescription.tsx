import type { Prisma } from "@prisma/client";
import { pascalCaseToSpaced } from "~/util";
import Rubric from "./Rubric";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";

type Assessment = Prisma.ResultDescriptionGetPayload<{
  select: {
    name: true;
    uiPlacement: true;
    rubricCriterionLevel: true;
  };
}>;

export default function ResultDescription({
  assessment: { name, uiPlacement: type, rubricCriterionLevel },
}: {
  assessment: Assessment;
}) {
  return (
    <section>
      <h2 className="text-lg font-bold">{pascalCaseToSpaced(type)}</h2>
      <Markdown className="prose mt-6" remarkPlugins={[remarkGfm]}>
        {name}
      </Markdown>

      {rubricCriterionLevel.length > 0 && (
        <Rubric levels={rubricCriterionLevel} />
      )}
    </section>
  );
}
