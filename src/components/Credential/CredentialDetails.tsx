import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Credential } from "~/trpc/shared";
import { capitalize } from "~/util";
import TagList from "~/components/Credential/TagList";
import ResultDescription from "~/components/Credential/ResultDescription";
import AssessmentExtension from "~/components/Credential/AssessmentExtension";

export const CredentialDetails = ({
  credential,
}: {
  credential: Credential;
}) => {
  let assessmentExtension = undefined;

  ext_check: for (const ext of credential.extensions) {
    for (const extension of ext.assessmentExtensions) {
      assessmentExtension = extension;
      break ext_check;
    }
  }
  return (
    <div className="flex flex-col gap-9">
      <section>
        <h2 className="mb-5 border-b border-gray-2 pb-4 text-lg font-bold">
          Achievement Type
        </h2>
        <TagList tags={[capitalize(credential.achievementType) ?? ""]} />
      </section>

      {credential.criteria.narrative && (
        <section>
          <h2 className="mb-5 border-b border-gray-2 pb-4 text-lg font-bold">
            Criteria
          </h2>

          <Markdown className="prose" remarkPlugins={[remarkGfm]}>
            {credential.criteria?.narrative || ""}
          </Markdown>
        </section>
      )}

      {credential.resultDescription.length > 0 && (
        <section>
          <h2 className="mb-5 border-b border-gray-2 pb-4 text-lg font-bold">
            Assessment
          </h2>

          <div className="flex flex-col gap-7">
            {credential.resultDescription.map((assessment, index) => (
              <ResultDescription key={index} assessment={assessment} />
            ))}
          </div>
        </section>
      )}

      {credential.tag.length > 0 && (
        <section>
          <h2 className="mb-5 border-b border-gray-2 pb-4 text-lg font-bold">
            Tags
          </h2>
          <TagList tags={credential.tag} />
        </section>
      )}

      {assessmentExtension && <AssessmentExtension {...assessmentExtension} />}
    </div>
  );
};

export default CredentialDetails;
