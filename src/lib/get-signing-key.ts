import "server-only";
import * as Ed25519Multikey from "@digitalbazaar/ed25519-multikey";
import { prismaConnect } from "~/server/db/prismaConnect";
import { createSigningKey } from "./create-signing-key";
import { decodeSecretKeySeed } from "bnid";

export async function getSigningKey() {
  const existingKey = await prismaConnect.multikey.findFirst();

  if (existingKey) {
    const { seed } = existingKey;

    if (!seed) {
      throw new Error("No seed found in the database");
    }

    const decodedSeed = decodeSecretKeySeed({ secretKeySeed: seed });

    const signingKey = await Ed25519Multikey.generate({ seed: decodedSeed });

    return Ed25519Multikey.from(signingKey);
  } else {
    return await createSigningKey();
  }
}
