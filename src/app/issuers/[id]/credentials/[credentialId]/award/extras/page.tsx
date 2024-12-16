"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Icon from "~/components/icon";
import { FormError } from "~/components/forms/errors";
import { AwardFormSection } from "~/components/forms/award";
// import { useRouter } from "next/navigation";
// import { useIssuerContext } from "~/providers/issuer-provider";
import { AwardExtrasSectionSchema } from "../../../../../../../../shared/interfaces/credential-form-object.interface";

export default function AwardExtras() {

  // const router = useRouter();
  // const { docId: issuerId } = useIssuerContext();
  // const { credentialId } = params;

  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: zodResolver(AwardExtrasSectionSchema),
    defaultValues: {
      message: "",
      expirationDate: new Date()
    }
  });

  const onSubmit = async () => {
    try {
      // const response = await fetch(`/api/issuers/${issuerId}/credentials/${credentialId}/award`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data)
      // });

      // if (!response.ok) {  
      //   throw new Error('Failed to award achievement');
      // }

      //router.push(`/issuers/${issuerId}/credentials/${credentialId}`);
    } catch (error) {
      console.error('Error awarding achievement:', error);
    }
  };

  return (
    <>
      <AwardFormSection>
        <form className="dashboard-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-6 mt-5">
            <div className="field">
              {/* TODO: Update Order */}
              <label htmlFor="message" className={errors?.message ? "error-label" : "base-form-label"}>
                Narrative
              </label>
              {/* TODO: Replace with MDXEditor */}
              <textarea
                id="message"
                rows={4}
                className={`w-full rounded border px-4 py-3 ${errors?.message ? "border-2 border-red-5 focus:outline-none" : "border-gray-5"}`}
                {...register("message")}
                placeholder="Describe or congratulate the recipient for the effort put into earning this achievement."
              />
              <FormError message={errors?.message?.message} />
            </div>

            <div className="field">
              <label htmlFor="expirationDate" className={errors?.expirationDate ? "error-label" : "base-form-label"}>
                Expiration Date
              </label>
              <input
                type="date"
                id="expirationDate"
                className={`w-full rounded border px-4 py-3 ${errors?.expirationDate ? "border-2 border-red-5 focus:outline-none" : "border-gray-5"}`}
                {...register("expirationDate", {
                  setValueAs: (value: string) => value ? new Date(value) : null
                })}
              />
              <FormError message={errors?.expirationDate?.message} />
            </div>
          </div>

          <div className="flex justify-between">
            <button 
              type="submit" 
              className="block w-fit rounded bg-blue-6 px-4 py-2 font-semibold text-white hover:bg-blue-7"
            >
              Award Achievement <Icon name="arrow-line-right" />
            </button>
          </div>
        </form>
      </AwardFormSection>
    </>
  );
}