import "server-only";
import { prismaConnect } from "~/server/db/prismaConnect";
import { generateSecretKeySeed, decodeSecretKeySeed } from "bnid";
import * as Ed25519Multikey from "@digitalbazaar/ed25519-multikey";

export async function createSigningKey() {
  const secretKeySeed = await generateSecretKeySeed();
  const decodedSeed = decodeSecretKeySeed({ secretKeySeed });

  const keypair = await Ed25519Multikey.generate({ seed: decodedSeed });

  const exportedKeypair = await keypair.export({
    publicKey: true,
    seed: true,
  });

  await prismaConnect.multikey.create({
    data: {
      id: `did:key:${exportedKeypair.publicKeyMultibase}`,
      publicKeyMultibase: exportedKeypair.publicKeyMultibase,
      seed: secretKeySeed,
    },
  });

  return keypair;
}
