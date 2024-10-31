"use client";

import SingleImageDropzone from "~/components/forms/dropzone";
import { createIssuer, IssuerFormState } from "~/server/actions/create-issuer";
import { useForm } from "react-hook-form";
import { FormError, useFormErrors } from "./errors";
import type { Issuer } from "~/server/api/schemas/issuerProfile.schema";
import { useState } from "react";
import { useNotifications } from "~/providers/notifications";
import { useRouter } from "next/navigation";
import "~/styles/forms.css";

export function IssuingOrganizationForm({ issuer }: { issuer?: Issuer }) {
  const [state, setState] = useState<IssuerFormState>({ success: false });
  const router = useRouter();
  const { notify } = useNotifications();
  const issuerId = issuer?.docId ?? "";
  const createOrUpdateIssuer = createIssuer.bind(null, issuerId);
  const formErrors = useFormErrors(state);
  const { getFieldErrorMessage, getGeneralErrorMessages, hasFieldError } =
    formErrors;
  const [hasError, setHasError] = useState<Record<string, boolean>>({});

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm();

  const onSubmit = handleSubmit(async (_data, event) => {
    const formData = new FormData(event!.target)
    const newFormState = await createOrUpdateIssuer(formData);

    if (newFormState.success) {
      notify({
        type: "success",
        message: issuerId
          ? "Successfully saved changes."
          : `Successfully added ${newFormState.profileName ? newFormState.profileName : "profile"}.`,
      });

      if (!issuerId) {
        router.push("/issuers");
      }
    }

    setState(newFormState);
  });

  const imagePreview = issuer?.image?.id ? issuer.image.id : undefined;

  return (
    <form className="dashboard-form" onSubmit={onSubmit}>
      <h2 className="heading">Basic Information</h2>

      {getGeneralErrorMessages().map((message, index) => (
        <FormError key={index} message={message} />
      ))}

      <div className="field">
        <label
          htmlFor="name"
          className={
            (hasFieldError("name") ?? errors.name) ? "error-label" : ""
          }
        >
          Organization Name
        </label>
        <input
          type="text"
          id="name"
          defaultValue={issuer?.name ?? ""}
          required
          className={(hasFieldError("name") ?? errors.name) ? "error" : ""}
          {...register("name", {
            required: "Organization Name is required",
            onChange: () => {
              if (hasError.name) void trigger("name");
            },
            onBlur: () => {
              void trigger("name").then((isValid) => {
                if (!isValid) setHasError((prev) => ({ ...prev, name: true }));
              });
            },
          })}
        ></input>
        <FormError
          message={errors.name?.message ?? getFieldErrorMessage("name")}
        />
      </div>

      <div className="field">
        <label
          htmlFor="email"
          className={
            (hasFieldError("email") ?? errors.email) ? "error-label" : ""
          }
        >
          Organization Email
        </label>
        <input
          type="email"
          id="email"
          defaultValue={issuer?.email ?? ""}
          required
          className={(hasFieldError("email") ?? errors.email) ? "error" : ""}
          {...register("email", {
            required: "Organization Email is required",
            pattern: {
              value:
                /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/, // Thanks to https://github.com/manishsaraan/email-validator/blob/master/index.js
              message: "Invalid email address",
            },
            onChange: () => {
              if (hasError.email) void trigger("email");
            },
            onBlur: () => {
              void trigger("email").then((isValid) => {
                if (!isValid) setHasError((prev) => ({ ...prev, email: true }));
              });
            },
          })}
        ></input>
        <FormError
          message={errors.email?.message ?? getFieldErrorMessage("email")}
        />
      </div>

      <div className="field">
        <label
          htmlFor="website"
          className={(hasFieldError("url") ?? errors.url) ? "error-label" : ""}
        >
          Organization Website
        </label>
        <input
          type="text"
          maxLength={90}
          id="website"
          defaultValue={issuer?.url ?? ""}
          required
          className={(hasFieldError("url") ?? errors.url) ? "error" : ""}
          {...register("url", {
            required: "Organization Website is required",
            pattern: {
              value:
                /^(https?:\/\/)?([\w\d-]+\.){1,2}[\w\d-]+(\/[\w\d-]+)*\/?$/,
              message: "Invalid URL",
            },
            onChange: () => {
              if (hasError.url) void trigger("url");
            },
            onBlur: () => {
              void trigger("url").then((isValid) => {
                if (!isValid) setHasError((prev) => ({ ...prev, url: true }));
              });
            },
          })}
        ></input>
        <FormError
          message={errors.url?.message ?? getFieldErrorMessage("url")}
        />
      </div>

      <div className="field">
        <label
          htmlFor="description"
          className={
            (hasFieldError("description") ?? errors.description)
              ? "error-label"
              : ""
          }
        >
          Organization Description
        </label>
        <textarea
          id="description"
          defaultValue={issuer?.description ?? ""}
          rows={6}
          maxLength={700}
          className={
            (hasFieldError("description") ?? errors.description) ? "error" : ""
          }
          {...register("description", {
            maxLength: {
              value: 700,
              message: "Description cannot exceed 700 characters",
            },
            onChange: () => {
              if (hasError.description) void trigger("description");
            },
            onBlur: () => {
              void trigger("description").then((isValid) => {
                if (!isValid)
                  setHasError((prev) => ({ ...prev, description: true }));
              });
            },
          })}
        ></textarea>
        <label className="text-gray-5" htmlFor="description">
          Please limit your description to around 75 words.
        </label>
        <FormError
          message={
            errors.description?.message ?? getFieldErrorMessage("description")
          }
        />
      </div>

      <div className="field">
        <label
          htmlFor="image"
          className={
            (hasFieldError("image") ?? errors.image) ? "error-label" : ""
          }
        >
          Organization Image
        </label>
        <SingleImageDropzone
          className={(hasFieldError("image") ?? errors.image) ? "error" : ""}
          preview={imagePreview}
          inputProps={{
            name: "image",
            id: "image",
            accept: "image/png, image/svg",
          }}
        />
        <FormError
          message={errors.image?.message ?? getFieldErrorMessage("image")}
        />
      </div>

      <div className="checkbox">
        <input
          type="checkbox"
          id="is_public"
          defaultChecked={issuer?.isPublic ?? false}
          {...register("is_public")}
        ></input>
        <label htmlFor="is_public">
          Set this issuing organization as Publicly Viewable
        </label>
      </div>

      <div className="flex">
        <button
          type="submit"
          className="mr-3 inline-block"
          disabled={isSubmitting}
        >
          Confirm and Finish
        </button>
      </div>
    </form>
  );
}
