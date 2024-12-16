"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { FormError } from "~/components/forms/errors";
import { AwardFormSection } from "~/components/forms/award";
import { useRouter } from "next/navigation";
import { useIssuerContext } from "~/providers/issuer-provider";
import { api } from "~/trpc/react";
import { useNotifications } from "~/providers/notification-provider";
import { AwardBasicsSectionSchema, type AwardRecipient } from "../../../../../../../shared/interfaces/credential-form-object.interface";
import { CreateAwardSchema } from "~/server/api/schemas/award.schema";
import Icon from "~/components/icon";
// import { useCredentialContext } from "~/providers/award-provider";

export default function Award({
  params,
}: {
  params: { credentialId: string; id: string };
}) {
  // const credential = useCredentialContext();

  const { register, handleSubmit, trigger, control, formState: { errors } } = useForm<{recipients: AwardRecipient[]}>({
    resolver: zodResolver(AwardBasicsSectionSchema),
    defaultValues: {
      recipients: [{ name: "", email: "" }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "recipients"
  });

  const { docId: issuerId } = useIssuerContext();
  const router = useRouter();
  const { credentialId } = params;
  const { notify } = useNotifications();
  
  const awardMutation = api.award.create.useMutation({
    onSuccess: () => {
      notify({
        type: "success",
        message: "Credentials awarded successfully"  
      });
      router.push(`/issuers/${issuerId}/credentials/${credentialId}`);
    },
    onError: (error) => {
      console.error("Award mutation error:", error);
      notify({
        type: "error",
        message: error.message || "Failed to award credentials"
      });
    }
  });

  const onSubmit = handleSubmit(async (data) => {
    for (const recipient of data.recipients) {
      const awardInput = CreateAwardSchema.omit({
        credentialId: true,
      }).parse({
        identifier: recipient.email,
        profile: {
          name: recipient.name,
        }
      });
      
      await awardMutation.mutateAsync({  
        ...awardInput,
        credentialId,
      });
    }
  });

  return (
    <AwardFormSection>
      <form onSubmit={onSubmit} noValidate>
        <div className="mb-6 mt-5">
          <header className="flex border-y border-gray-2 pl-7 font-semibold">
            <div className="required grow px-3 py-4">Recipient Name</div>
            <div className="required grow px-3 py-4">Email</div>
            <div className="w-12 py-4"></div>
          </header>
          {fields.map((field, index) => (
            <div key={field.id} className="flex pl-7 text-gray-5">
              <div className="grow px-3 py-4">
                <input
                  type="text"
                  placeholder="Recipient Name"
                  className={`w-full rounded border px-4 py-3 ${errors?.recipients?.[index]?.name ? "border-2 border-red-5 focus:outline-none" : "border-gray-5"}`}
                  {...register(`recipients.${index}.name`, {
                    required: "Recipient Name is required"
                  })}
                  onBlur={() => trigger(`recipients.${index}.name`)}
                />
                <FormError message={errors?.recipients?.[index]?.name?.message} />
              </div>
              <div className="grow px-3 py-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className={`w-full rounded border px-4 py-3 ${errors?.recipients?.[index]?.email ? "border-2 border-red-5 focus:outline-none" : "border-gray-5"}`}
                  {...register(`recipients.${index}.email`, {
                    required: "Email is required",
                    pattern: {
                      value: /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/, // Thanks to https://github.com/manishsaraan/email-validator/blob/master/index.js
                      message: "Invalid email address"
                    }
                  })}
                  onBlur={() => trigger(`recipients.${index}.email`)}
                />
                <FormError message={errors?.recipients?.[index]?.email?.message} />
              </div>
              
              <div className="w-12 flex items-center justify-center">
                {fields.length > 1 && (
                  <div className="flex shrink-0 grow-0 basis-7 flex-col items-center justify-center">
                    <button
                      type="button"
                      className="flex h-5 w-5 flex-col items-center justify-center rounded-full border-2 border-gray-5"
                      onClick={() => {
                        if (fields.length > 1) remove(index);
                      }}
                    >
                      <Icon name="minus" className="h-min w-min text-md" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            className="px-3 py-4 font-semibold text-blue-4"
            onClick={() => append({ name: "", email: "" })}
          >
            <Icon name="plus" />{" "}
            <span className="underline">Add a Recipient</span>
          </button>
        </div>

        <div className="flex justify-between">
          <button 
            type="submit" 
            className="btn"
          > 
            Award Achievement
          </button>
        </div>
      </form>
    </AwardFormSection>
  );
}