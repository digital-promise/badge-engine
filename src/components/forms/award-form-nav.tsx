"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIssuerContext } from "../../providers/issuer-provider";
import { AWARD_FORM_STEPS } from "~/lib/constants";
import { AwardFormProvider, useAwardFormStore } from "~/providers/award-form-provider";

export function AwardFormNav() {
  const pathname = usePathname();
  const { docId: issuerId } = useIssuerContext();
  const { currentStep, setStep, completedSteps } = useAwardFormStore();
  const baseUrl = `/issuers/${issuerId}/credentials/new`;

  useEffect(() => {
    const compare = pathname.split("/").pop();

    if (compare === "new") {
      setStep(0);
    } else {
      for (const [index, step] of AWARD_FORM_STEPS.entries()) {
        const { path } = step;
        if (path === compare) {
          setStep(index);
          break;
        }
      }
    }
  }, [pathname, setStep]);

  return (
    <AwardFormProvider>
      <nav>
        <ul className="flex font-medium text-gray-4">
        {AWARD_FORM_STEPS.map((s, i) => {
          const { path, label } = s;
          const isActive = i === currentStep;
          const isComplete = completedSteps.has(i);
          const index = i + 1;

          return (
            <li
              data-index={index}
              data-active={isActive || null}
              data-complete={isComplete || null}
              className="before:leading-1 py-1 before:mr-2 before:inline-flex before:h-6 before:w-6 before:items-center before:justify-center before:rounded-full before:border-2 before:border-gray-4 before:font-medium before:content-[attr(data-index)] after:mx-3 after:inline-block after:w-7 after:border-b after:border-gray-2 after:align-middle after:content-[''] last:after:hidden data-[active]:font-bold data-[active]:text-blue-4 data-[complete]:text-blue-4 data-[active]:before:border-blue-3 data-[complete]:before:border-blue-3 data-[active]:before:bg-blue-3 data-[complete]:before:font-bold data-[active]:before:text-neutral-1 data-[complete]:before:content-['\2713']"
              key={i}
            >
              {isComplete || i === 0 ? (
                <Link href={`${baseUrl}/${path}`}>{label}</Link>
              ) : (
                <button disabled>{label}</button>
              )}
            </li>
          );
        })}
        </ul>
      </nav>
    </AwardFormProvider>
  );
}
