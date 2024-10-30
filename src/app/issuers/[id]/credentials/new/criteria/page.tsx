"use client";

import {
  useForm,
  useFieldArray,
  Controller,
  type FieldArrayWithId,
  type UseFormRegister,
  type UseFieldArrayRemove,
  type UseFormTrigger,
  type FieldErrors,
  type Control,
} from "react-hook-form";
import { AchievementFormSection } from "~/components/forms/achievement";
import { useIssuerContext } from "~/providers/issuer-provider";
import { ForwardRefEditor } from "~/components/forms/ForwardRefEditor";
import type { PartialCredentialForm } from "shared/interfaces/credential-form-object.interface";
import Icon from "~/components/icon";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AssessmentPlacement } from "@prisma/client";
import { useAchievementStore } from "~/providers/achievement-form-provider";
import { useCredentialFormUpdate } from "~/lib/react-hook-form";
import { FormError } from "~/components/forms/errors";
import DropdownSelection from "~/components/forms/select-dropdown";

type PlacementOption = { value: string; label: string };

const placementOptions: PlacementOption[] = Object.values(
  AssessmentPlacement,
).map((s) => {
  const value = s;
  const label = s ? s.replace(/([A-Z])/g, " $1").trim() : "";

  return { value, label };
});

type ArrayFieldProps = {
  control: Control<PartialCredentialForm>;
  register: UseFormRegister<PartialCredentialForm>;
  trigger: UseFormTrigger<PartialCredentialForm>;
  errors: FieldErrors<PartialCredentialForm>;
};

type ArrayFieldChildProps = {
  field: FieldArrayWithId;
  index: number;
  control: ArrayFieldProps["control"];
  register: ArrayFieldProps["register"];
  trigger: ArrayFieldProps["trigger"];
  errors: ArrayFieldProps["errors"];
  remove: UseFieldArrayRemove;
};

function AssessmentSections({
  control,
  register,
  trigger,
  errors,
}: ArrayFieldProps) {
  const { append, remove, fields } = useFieldArray({
    name: "resultDescription",
    control,
    shouldUnregister: true,
  });

  return (
    <fieldset>
      <legend className="sr-only">
        Add assessment rubric sections to this achievement
      </legend>

      <div className="flex flex-col gap-6">
        {fields.map((field, index) => (
          <AssessmentSection
            key={field.id}
            {...{ field, index, control, register, trigger, errors, remove }}
          />
        ))}
      </div>

      <button
        type="button"
        className="font-bold text-blue-4"
        onClick={() =>
          append({
            name: "",
            uiPlacement: undefined,
            requireFile: false,
            rubricCriterionLevel: [],
          })
        }
      >
        <Icon name="plus" />
        <span className="underline">
          {fields.length
            ? "Add Another Assessment Section"
            : "Add Assessment Section"}
        </span>
      </button>
    </fieldset>
  );
}

function AssessmentSection({
  index,
  control,
  register,
  trigger,
  errors,
  remove,
}: ArrayFieldChildProps) {
  const { form } = useAchievementStore();
  const [includeRubric, setIncludeRubric] = useState(
    Boolean(form?.resultDescription?.at(index)?.rubricCriterionLevel?.length),
  );

  return (
    <section className="flex flex-col gap-7">
      <header className="-mb-4 flex justify-between font-medium">
        <h3 className="text-md">Assessment Section {index + 1}</h3>
        <button
          type="button"
          className="text-blue-4"
          onClick={() => remove(index)}
        >
          <Icon name="delete" />
          <span>
            {" "}
            <span className="underline">Remove</span>
          </span>
        </button>
      </header>

      <div className="field" aria-required>
        <label
          htmlFor={`resultDescription.${index}.uiPlacement`}
          className={
            errors?.resultDescription?.[index]?.uiPlacement
              ? "error-label"
              : "base-form-label"
          }
        >
          Assessment Section
        </label>
        <Controller
          name={`resultDescription.${index}.uiPlacement`}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur } }) => (
            <DropdownSelection
              defaultValue={placementOptions.find(
                (o) =>
                  o.value === form?.resultDescription?.at(index)?.uiPlacement,
              )}
              onChange={(option) => {
                onChange(option?.value);
                void trigger(`resultDescription.${index}.uiPlacement`);
              }}
              onBlur={() => {
                onBlur();
                void trigger(`resultDescription.${index}.uiPlacement`);
              }}
              options={placementOptions}
              id={`resultDescription.${index}.uiPlacement`}
              placeholder="Is this an overview, work example, or reflection?"
              className={
                errors.resultDescription?.[index]?.uiPlacement
                  ? "error-dropdown"
                  : ""
              }
              isSearchable
              closeMenuOnSelect
              required
              isMulti={false}
              error={
                errors.resultDescription?.[index]?.uiPlacement ? true : false
              }
              blurInputOnSelect={true}
            ></DropdownSelection>
          )}
        />
        <FormError
          message={
            errors.resultDescription?.[index]?.uiPlacement
              ? "Assessment Section is required"
              : undefined
          }
        />
      </div>

      <div className="field" aria-required>
        <label
          htmlFor={`resultDescription.${index}.name`}
          className={
            errors?.resultDescription?.[index]?.name
              ? "error-label"
              : "base-form-label"
          }
        >
          Assessment Details
        </label>
        <div>
          <Controller
            name={`resultDescription.${index}.name`}
            control={control}
            rules={{ required: "Assessment Details is required" }}
            render={({ field: { onChange } }) => (
              <ForwardRefEditor
                onChange={onChange}
                onBlur={() => {
                  void trigger(`resultDescription.${index}.name`);
                }}
                markdown={form?.resultDescription?.at(index)?.name ?? ""}
                error={errors.resultDescription?.[index]?.name ? true : false}
              />
            )}
          />
        </div>
        <FormError
          message={
            errors.resultDescription?.[index]?.name
              ? "Assessment Details is required"
              : undefined
          }
        />
      </div>

      <div className="flex flex-col gap-5 py-5">
        <div className="checkbox">
          <input
            id={`resultDescription.${index}.requireFile`}
            type="checkbox"
            {...register(`resultDescription.${index}.requireFile`)}
          />
          <label
            className="font-medium"
            htmlFor={`resultDescription.${index}.requireFile`}
          >
            Require file uploading for this assessment
          </label>
        </div>
        <div className="checkbox">
          <input
            id={`resultDescription.${index}.includeRubric`}
            type="checkbox"
            checked={includeRubric}
            onChange={() => setIncludeRubric(!!!includeRubric)}
          />
          <label
            className="font-medium"
            htmlFor={`resultDescription.${index}.includeRubric`}
          >
            Include Rubric Criterion Details
          </label>
        </div>
      </div>

      {includeRubric && (
        <Rubric
          {...{ control, register, trigger, parentIndex: index, errors }}
        />
      )}
    </section>
  );
}

function Rubric({
  control,
  register,
  trigger,
  errors,
  parentIndex,
}: ArrayFieldProps & { parentIndex: number }) {
  const baseFieldName: `resultDescription.${number}.rubricCriterionLevel` = `resultDescription.${parentIndex}.rubricCriterionLevel`;

  const { append, fields, swap, remove } = useFieldArray({
    name: baseFieldName,
    control,
    shouldUnregister: true,
  });

  // Immediately add two rubric levels when the component mounts.
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current && !fields.length) {
      initialized.current = true;
      append(Array(2).fill({ description: "", level: "" }));
    }
  }, [append, fields.length]);

  return (
    <fieldset>
      <legend className="border-l border-gray-2 px-4">
        For a consistent experience, we recommend sorting from highest level to
        lowest level.
      </legend>
      <div className="mb-6 mt-5">
        <header className="flex border-y border-gray-2 pl-7 font-semibold">
          <label className="required shrink-0 grow-0 basis-[13rem] px-3 py-4">
            Level
          </label>
          <label className="grow px-3 py-4 pr-7">Description</label>
        </header>
        <div>
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="flex pr-7 text-gray-5 last:pr-0">
                <div className="flex shrink-0 grow-0 basis-7 flex-col items-center justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      if (index !== 0) swap(index, index - 1);
                    }}
                  >
                    <Icon name="arrow-up-short" className="mr-0" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (index !== fields.length - 1) swap(index, index + 1);
                    }}
                  >
                    <Icon name="arrow-down-short" className="mr-0" />
                  </button>
                </div>
                <div className="shrink-0 grow-0 basis-[13rem] px-3 py-4">
                  <textarea
                    rows={1}
                    className={`w-full rounded border px-4 py-3 ${errors.resultDescription?.[parentIndex ?? 0]?.rubricCriterionLevel?.[index]?.level ? "border-2 border-red-5 focus:outline-none" : "border-gray-5"}`}
                    {...register(`${baseFieldName}.${index}.level`, {
                      required: "Level is required",
                    })}
                    onBlur={() => trigger(`${baseFieldName}.${index}.level`)}
                  />
                  <FormError
                    message={
                      errors.resultDescription?.[parentIndex ?? 0]
                        ?.rubricCriterionLevel?.[index]?.level
                        ? "Level is required"
                        : ""
                    }
                  />
                </div>
                <div className="basis-[22rem] px-3 py-4">
                  <textarea
                    rows={1}
                    className="w-full rounded border border-gray-5 px-4 py-3"
                    {...register(`${baseFieldName}.${index}.description`)}
                  />
                </div>
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
              </div>
            );
          })}
        </div>
        {/** Rubric Levels Table **/}
        <footer className="mb-[64px] border-b border-gray-2 pl-7">
          <button
            type="button"
            className="px-3 py-4 font-semibold text-blue-4"
            onClick={() => append({ description: "", level: "" })}
          >
            <Icon name="add-section" />{" "}
            <span className="underline">Add Row</span>
          </button>
        </footer>
      </div>
    </fieldset>
  );
}

export default function CredentialCriteria() {
  const { form } = useAchievementStore();

  const router = useRouter();
  const { id: issuerId } = useIssuerContext();
  const {
    register,
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<PartialCredentialForm>({
    defaultValues: form ?? {},
  });

  const updateForm = useCredentialFormUpdate(watch);
  useEffect(() => updateForm(), [updateForm]);

  const onSubmit = handleSubmit(() => {
    router.push(`/issuers/${issuerId}/credentials/new/extras`);
  });

  return (
    <AchievementFormSection>
      <form className="dashboard-form" onSubmit={onSubmit} noValidate>
        <h2 className="heading">Criteria</h2>

        <div className="field" aria-required>
          <label
            htmlFor="criteria"
            className={errors?.criteria ? "error-label" : "base-form-label"}
          >
            Criteria Narrative or URL
          </label>
          <div>
            <Controller
              name="criteria"
              control={control}
              rules={{ required: "Criteria is required" }}
              render={({ field: { onChange } }) => (
                <ForwardRefEditor
                  onChange={onChange}
                  onBlur={() => {
                    void trigger("criteria");
                  }}
                  // id="criteria"
                  placeholder="Specifically describe the criteria to earn this badge or attach an URL of description."
                  markdown={form?.criteria ?? ""}
                  error={errors.criteria ? true : false}
                />
              )}
            />
          </div>
          <FormError message={errors.criteria?.message} />
        </div>

        <AssessmentSections {...{ control, register, trigger, errors }} />

        <button type="submit" className="block w-fit font-semibold">
          Next: Extras <Icon name="arrow-line-right" />
        </button>
      </form>
    </AchievementFormSection>
  );
}
