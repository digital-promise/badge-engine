import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface AssessmentExtensionProps {
  supportingResearchAndRationale: string | null;
  resources: string | null;
}

export default function AssessmentExtension(props: AssessmentExtensionProps) {
  const { supportingResearchAndRationale, resources } = props;
  return (
    <section>
      <h2 className="mb-5 border-b border-gray-2 pb-4 text-lg font-bold">
        Supporting Information
      </h2>
      <div className="flex flex-col gap-7">
        {supportingResearchAndRationale && (
          <div>
            <h3 className="text-lg font-bold">
              Supporting Research and Rationale
            </h3>
            <Markdown className="prose" remarkPlugins={[remarkGfm]}>
              {supportingResearchAndRationale}
            </Markdown>
          </div>
        )}

        {resources && (
          <div>
            <h3 className="text-lg font-bold">Resources</h3>
            <Markdown className="prose" remarkPlugins={[remarkGfm]}>
              {resources}
            </Markdown>
          </div>
        )}
      </div>
    </section>
  );
}
