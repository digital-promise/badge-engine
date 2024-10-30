import {
  type PartialCredentialForm,
  CredentialFormSchema,
} from "shared/interfaces/credential-form-object.interface";
import { ZodError } from "zod";
import { createCredential } from "~/server/actions/create-credential";

export async function submitCredential(
  issuerId: string,
  form: PartialCredentialForm,
) {
  const createCredentialForIssuer = createCredential.bind(null, issuerId);

  try {
    const { image, ...credential } =
      await CredentialFormSchema.parseAsync(form);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("credential", JSON.stringify(credential));

    const newCredential = await createCredentialForIssuer(formData);

    return newCredential;
  } catch (error) {
    console.log("In form submit error");
    if (error instanceof ZodError) {
      console.error(error.flatten());
    } else {
      console.error(error);
    }
  }
}
