"use server";

import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { TRPCClientError } from "@trpc/client";
import { api } from "~/trpc/server";
import { issuerProfileSchema } from "~/server/api/schemas/issuerProfile.schema";
import { type FormState } from "~/server/actions/forms";

export type IssuerFormState = FormState & { profileName?: string };

export const createIssuer = async (
  issuerId: string,
  _state: IssuerFormState | null,
  formData: FormData,
) => {
  const response: IssuerFormState = { success: false };
  try {
    let image = undefined
    const removeImage = Boolean(formData.get("remove_image"));
    const imageFile = formData.get("image");

    if (removeImage) {
      image = null
    } else if (imageFile !== null) {
      image = await api.image.upload.mutate(imageFile as unknown as File)
    }

    const input = await issuerProfileSchema.parseAsync({
      id: issuerId,
      createdAt: new Date().toJSON(),
      updatedAt: new Date().toJSON(),
      isActive: Boolean(
        formData.get("is_active") ? formData.get("is_active") : true,
      ),
      isPublic: Boolean(formData.get("is_public")),
      hasAgreedTerms: false,
      name: formData.get("name"),
      email: formData.get("email"),
      url: formData.get("url"),
      description: formData.get("description"),
      image: image,
    });

    await api.issuer.create.mutate(input);
    
    response.success = true;
    response.profileName = input.name;
    revalidatePath("/issuers");

  } catch (e) {
    if (e instanceof ZodError) {
      // Server-side validation of the form input failed.
      const fieldErrors = e.flatten().fieldErrors;

      response.errors = Object.entries(fieldErrors).map(([field, errors]) => ({
        message: errors?.[0] ?? 'Invalid input',
        field: field
      }));
    } else if (e instanceof TRPCClientError) {
      // An error was thrown from the invoked TRPC procedure.
      response.errors = [{
        message: e.message
      }];
    } else {
      console.error(e);
      response.errors = [{
        message: "An unexpected error occurred."
      }];
    }
  }

  return response;
};
