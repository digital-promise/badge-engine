import "server-only";
import { KMSClient, EncryptCommand, DecryptCommand } from "@aws-sdk/client-kms";
import * as Ed25519Multikey from "@digitalbazaar/ed25519-multikey";
import { prismaConnect } from "~/server/db/prismaConnect";
import { env } from "~/env.mjs";

const kms = new KMSClient({
  region: env.AWS_REGION,
});

export async function getOrCreateKey() {
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
  }

  const keypair = await Ed25519Multikey.generate();

  const exportedKeypair = await keypair.export({
    publicKey: true,
    secretKey: true,
  });

  const command = new EncryptCommand({
    KeyId: env.AWS_KMS_KEY_ID,
    Plaintext: Buffer.from(btoa(exportedKeypair.secretKeyMultibase!), "base64"),
  });

  const encryptedSecretKey = await kms.send(command);

  const secretKeyMultibase = Buffer.from(
    encryptedSecretKey.CiphertextBlob!,
  ).toString("base64");

  await prismaConnect.multikey.create({
    data: {
      id: `did:key:${exportedKeypair.publicKeyMultibase}`,
      publicKeyMultibase: exportedKeypair.publicKeyMultibase,
      secretKeyMultibase,
    },
  });

  return keypair;
}

const result = await getOrCreateKey();

console.debug(result);
