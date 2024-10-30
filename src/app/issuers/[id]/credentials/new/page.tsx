"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import SingleImageDropzone from "~/components/forms/dropzone";
import { useIssuerContext } from "~/providers/issuer-provider";
import Icon from "~/components/icon";
import { AchievementFormSection } from "~/components/forms/achievement";
import { AchievementType } from "@prisma/client";
import DropdownSelection, {
  transformEnum,
} from "~/components/forms/select-dropdown";
import { useAchievementStore } from "~/providers/achievement-form-provider";
import { useCredentialFormUpdate } from "~/lib/react-hook-form";
import { BasicsSectionSchema, type PartialCredentialForm } from "shared/interfaces/credential-form-object.interface";
import { FormError } from "~/components/forms/errors";
import { zodResolver } from "@hookform/resolvers/zod";

type AchievementTypeOption = { value: string; label: string };

export type AchievementFormState = {
  errors?: {
    field: string;
    message?: string;
    name?: string;
    description?: string;
    achievementType?: string;
  }[];
};

export default function Basics() {
  const { form } = useAchievementStore();

  const { register, control, handleSubmit, watch, trigger, formState: { errors }} = useForm<PartialCredentialForm>({
    defaultValues: form ?? {},
    resolver: zodResolver(BasicsSectionSchema),
  });
    
  const { id: issuerId } = useIssuerContext();
  const router = useRouter();
  const dropdownOptions: AchievementTypeOption[] =
    transformEnum(AchievementType).sort((a, b) => a.label.localeCompare(b.label));
  
  const [hasError, setHasError] = useState<Record<string, boolean>>({});

  const formUpdates = useCredentialFormUpdate(watch);

  useEffect(() => formUpdates(), [formUpdates]);

  const onSubmit = handleSubmit(() => {
    router.push(`/issuers/${issuerId}/credentials/new/criteria`);
  });

  const imagePreview =
    form?.image?.size && form?.image?.size
      ? URL.createObjectURL(form.image && form.image)
      : undefined;

  return (
    <AchievementFormSection>
      <form className="dashboard-form" onSubmit={onSubmit} noValidate>
        <h2 className="heading">About the Achievement</h2>
        <div className="field" aria-required>
          <label htmlFor="name" className={errors?.name ? "error-label": "base-form-label"}>Achievement Name</label>
          <input
            type="text"
            id="name"
            className={errors.name ? "error" : ""}
            required
            {...register("name", { 
              required: "Achievement Name is required",
              onChange: () => {
                if (hasError.name) void trigger("name");
              },
              onBlur: () => {
                void trigger("name").then((isValid) => {
                  if (!isValid) setHasError((prev) => ({ ...prev, name: true }));
                });
              },
            })}
          />
          <FormError message={errors.name?.message} />
        </div>

        <div className="field" aria-required>
          <label htmlFor="description" className={errors?.description ? "error-label" : "base-form-label"}>Achievement Description</label>
          <textarea
            id="description"
            className={errors.description ? "error" : ""}
            required
            {...register("description", { 
              required: "Achievement Description is required",
              onChange: () => {
                if (hasError.description) void trigger("description");
              },
              onBlur: () => {
                void trigger("description").then((isValid) => {
                  if (!isValid) setHasError((prev) => ({ ...prev, description: true }));
                });
              },
            })}
          />
          <FormError message={errors.description?.message} />
        </div>

        <div className="field" aria-required>
          <label htmlFor="achievementType" className={errors?.achievementType ? "error-label" : "base-form-label"}>Achievement Type</label>

          <Controller
            name="achievementType"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur } }) => (
              <DropdownSelection
                defaultValue={dropdownOptions.find(
                  (o) => o.value === form?.achievementType,
                )}
                onChange={(option) => {
                  onChange(option?.value)

                  if (hasError.achievementType) void trigger("achievementType");
                }}
                onBlur={() => {
                  onBlur();
                  void trigger("achievementType").then((isValid) => {
                    if (!isValid) setHasError((prev) => ({ ...prev, achievementType: true }));
                  });
                }}
                options={dropdownOptions}
                id="achievementType"
                placeholder="Select the applicable type"
                className={errors.achievementType ? "error-dropdown" : ""}
                isSearchable
                closeMenuOnSelect
                required
                isMulti={false}
                error={errors.achievementType ? true : false}
                blurInputOnSelect={true}
              ></DropdownSelection>
            )}
          />
          <FormError message={errors.achievementType?.message ? "Achievement Type is required" : undefined} />
        </div>

        <div className="field" aria-required>
          <label htmlFor="image" className={errors?.image  ? "error-label" : "base-form-label"}>Achievement Image</label>
          <Controller
            name="image"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <SingleImageDropzone
                defaultFiles={form?.image}
                preview={imagePreview}
                onChange={onChange}
                inputProps={{
                  required: true,
                  name: "image",
                  id: "image",
                }}
                className={errors.image ? "error" : ""}
              />
            )}
          />

          <FormError message={errors.image?.message ? "Achievement Image is required" : undefined} />
        </div>

        <div className="checkbox">
          <input
            type="checkbox"
            {...register("isPublic")}
            id="isPublic"
            name="isPublic"
            defaultChecked={Boolean(form?.isPublic)}
          />
          <label htmlFor="isPublic">
            Display this achievement on issuing organization&#39;s public page
          </label>
        </div>

        <button type="submit" className="block w-fit font-semibold">
          Next: Criteria <Icon name="arrow-line-right" />
        </button>
      </form>
    </AchievementFormSection>
  );
}
