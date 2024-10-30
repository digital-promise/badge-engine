"use client";

import type { IssuerFormState } from "~/server/actions/create-issuer";
import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import type { AchievementFormState } from "~/app/issuers/[id]/credentials/new/page";

type FormErrorMessage = string | FieldError | Merge<FieldError, FieldErrorsImpl<Record<string, unknown>>> | undefined;

export const useFormErrors = (state: IssuerFormState | AchievementFormState | null) => {
  const hasFieldError = (fieldName: string) => {
    return state?.errors?.some(error => error.field?.includes(fieldName));
  };

  const getFieldErrorMessage = (fieldName: string) => {
    const error = state?.errors?.find(error => error.field?.includes(fieldName));
    if (error?.message?.includes(error.field ?? "")) {
      return error.message;
    }
    return error?.message ? `${error.message} ${error.field ?? ""}`.trim() : "";
  };

  const getGeneralErrorMessages = () => {
    return state?.errors?.filter(error => !error.field).map(error => error.message) ?? [];
  };

  return { hasFieldError, getFieldErrorMessage, getGeneralErrorMessages };
};

export function FormError({ message }: { message?: FormErrorMessage }) {
    const formattedMessage = typeof message === 'string' ? message.replace(/url/gi, 'URL') : '';
    
    return (
        <div>
            <p className="text-red-4">{formattedMessage}</p>
        </div>
    )
}