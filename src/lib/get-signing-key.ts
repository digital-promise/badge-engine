import "server-only";
import { KMSClient, DecryptCommand } from "@aws-sdk/client-kms";
import * as Ed25519Multikey from "@digitalbazaar/ed25519-multikey";
import { prismaConnect } from "~/server/db/prismaConnect";
import { env } from "~/env.mjs";
import { createSigningKey } from "./create-signing-key";

const kms = new KMSClient({
  region: env.AWS_REGION,
});

export async function getSigningKey() {
  const existingKey = await prismaConnect.multikey.findFirst();

  if (existingKey) {
    const command = new DecryptCommand({
      CiphertextBlob: Buffer.from(existingKey.secretKeyMultibase, "base64"),
      KeyId: env.AWS_KMS_KEY_ID,
    });

    const decryptedPrivateKey = await kms.send(command);

    existingKey.secretKeyMultibase = atob(
      Buffer.from(decryptedPrivateKey.Plaintext!).toString("base64"),
    );

    return Ed25519Multikey.from(existingKey);
  } else {
    return await createSigningKey();
  }
}
