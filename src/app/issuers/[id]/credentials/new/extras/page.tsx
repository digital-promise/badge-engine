"use client";

import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { AchievementFormSection } from "~/components/forms/achievement";
import Hr from "~/components/global/hr";
import Icon from "~/components/icon";
import ListInput from "~/components/forms/list";
import { useEffect } from "react";
import { useAchievementStore } from "~/providers/achievement-form-provider";
import {
  ExtrasSectionSchema,
  type PartialCredentialForm,
} from "shared/interfaces/credential-form-object.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "~/components/forms/errors";
import ConfirmAndCreate from "~/components/Credential/ConfirmAndCreate";
import { useCredentialFormUpdate } from "~/lib/react-hook-form";
import { ForwardRefEditor } from "~/components/forms/ForwardRefEditor";

export default function Extras() {
  const { form } = useAchievementStore();
  const {
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm<PartialCredentialForm>({
    defaultValues: form ?? {},
    resolver: zodResolver(ExtrasSectionSchema),
  });

  const updateForm = useCredentialFormUpdate(watch);

  useEffect(() => updateForm(), [updateForm]);

  return (
    <AchievementFormSection>
      <form className="dashboard-form">
        <h2 className="heading">Tags</h2>
        <Controller
          name="tag"
          control={control}
          render={({ field: { onChange } }) => (
            <ListInput onChange={onChange} defaultValue={form?.tag} />
          )}
        />
        <FormError message={errors.tag?.message} />

        <Hr />

        <h2 className="heading">Supporting Information</h2>

        <div className="field" aria-required>
          <label
            htmlFor="supportingResearchAndRationale"
            className={
              errors.supportingResearchAndRationale
                ? "error-label"
                : "base-form-label"
            }
          >
            Supporting Research and Rationale
          </label>
          <div
            className={
              errors.supportingResearchAndRationale ? "error rounded-xl" : ""
            }
          >
            <Controller
              name="supportingResearchAndRationale"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <ForwardRefEditor
                  onChange={onChange}
                  onBlur={() => {
                    void trigger("supportingResearchAndRationale");
                  }}
                  markdown={form?.supportingResearchAndRationale ?? ""}
                  error={errors.supportingResearchAndRationale ? true : false}
                />
              )}
            />
          </div>
          <FormError
            message={
              errors.supportingResearchAndRationale?.message
                ? "Supporting Research and Rationale is required"
                : ""
            }
          />
        </div>

        <div className="field" aria-required>
          <label
            className={errors.resources ? "error-label" : "base-form-label"}
          >
            Resources
          </label>
          <div className={errors.resources ? "error rounded-xl" : ""}>
            <Controller
              name="resources"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <ForwardRefEditor
                  onChange={onChange}
                  onBlur={() => {
                    void trigger("resources");
                  }}
                  markdown={form?.resources ?? ""}
                  error={errors.resources ? true : false}
                />
              )}
            />
          </div>
          <FormError
            message={errors.resources?.message ? "Resources is required" : ""}
          />
        </div>

        <div className="flex gap-4">
          <Link
            href="preview"
            className="rounded-full border-2 border-blue-3 bg-neutral-1 px-5 py-3 font-bold text-blue-4"
          >
            <Icon name="eye-open" /> Preview Public Page
          </Link>
          <ConfirmAndCreate />
        </div>
      </form>
    </AchievementFormSection>
  );
}
