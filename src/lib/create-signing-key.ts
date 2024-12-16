import "server-only";
import { prismaConnect } from "~/server/db/prismaConnect";
import { env } from "~/env.mjs";
import { generateSecretKeySeed, decodeSecretKeySeed } from "bnid";
import { KMSClient, EncryptCommand } from "@aws-sdk/client-kms";
import * as Ed25519Multikey from "@digitalbazaar/ed25519-multikey";

const kms = new KMSClient({
  region: env.AWS_REGION,
});

export async function createSigningKey() {
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const secretKeySeed = await generateSecretKeySeed(); // This needs to be awaited.
  const decodedSeed = decodeSecretKeySeed({ secretKeySeed });

  const keypair = await Ed25519Multikey.generate({ seed: decodedSeed });

  const exportedKeypair = await keypair.export({
    publicKey: true,
    secretKey: true,
    seed: true,
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
      seed: secretKeySeed,
    },
  });

  return keypair;
}
