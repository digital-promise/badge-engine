"use server";

import { revalidatePath } from "next/cache";
import { CredentialFormSchema } from "shared/interfaces/credential-form-object.interface";
import { api } from "~/trpc/server";

export const createCredential = async (
  issuer: string,
  credentialForm: FormData,
) => {
  try {
    const image = credentialForm.get("image") as unknown as Blob
    const credential = credentialForm.get("credential")

    const validatedCredential = await CredentialFormSchema.omit({image: true}).parseAsync({
      ...(JSON.parse(credential as string))
    });

    const uploadedImage = await api.image.upload.mutate(image)
    const newCredential = await api.credential.create.mutate({
      ...validatedCredential,
      issuer,
      image: uploadedImage!,
      resultDescription: validatedCredential.resultDescription?.map(item => ({
        ...item,
        uiPlacement: item.uiPlacement ?? 'Overview'
      }))
    });

    revalidatePath(`/issuers/${issuer}`);
    return newCredential
  } catch (error) {
    console.error("createCredential error", error);
    throw new Error("Unexpected error creating credential for issuer.");
  }
};
