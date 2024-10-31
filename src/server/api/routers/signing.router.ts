import { createHash } from "crypto";
import { encode } from "base58-universal";
import { getOrCreateKey } from "~/lib/get-or-create-key";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  dataIntegrityProofConfigSchema,
  dataIntegrityProofSchema,
} from "../schemas/open-badges/proof.schema";
import {
  createVerifiableAchievementCredentialSchema,
  achievementCredentialSchema,
} from "../schemas/open-badges/credential.schema";

export const signingRouter = createTRPCRouter({
  createProof: protectedProcedure
    .input(createVerifiableAchievementCredentialSchema)
    .mutation(async ({ input }) => {
      const keypair = await getOrCreateKey();

      const { sign } = keypair.signer();

      /**
       * @link https://www.w3.org/TR/vc-di-eddsa/#proof-configuration-eddsa-jcs-2022
       */
      const options = dataIntegrityProofConfigSchema.parse({
        created: new Date().toISOString(),
      });

      /**
       * Create an eddsa-jcs-2022 proof
       *
       * Canonicalizes the proof config and credential document by creating a hashable serialization of each document (JSON.stringify()), hashes the data by applying SHA-256, and concatenates the two buffers.
       *
       * @link https://www.w3.org/TR/vc-di-eddsa/#create-proof-eddsa-jcs-2022
       */
      const data = Buffer.concat(
        [options, input].map((document) =>
          createHash("sha256", { outputLength: 32 })
            .update(JSON.stringify(document))
            .digest(),
        ),
      );

      /**
       * Create a signature from hashed bytes.
       *
       * @link https://www.w3.org/TR/vc-di-eddsa/#proof-serialization-eddsa-rdfc-2022
       */
      const proofBytes = await sign({ data });

      /**
       * Encode signature in base-58 with Multibase header "z" and include with options and proof purpose in final proof object.
       *
       * @link https://www.w3.org/TR/vc-di-eddsa/#dataintegrityproof
       */
      const proofValue = "z" + encode(proofBytes);
      const { id: verificationMethod } = await keypair.export({
        publicKey: true,
      });
      const proof = dataIntegrityProofSchema.parse({
        ...options,
        proofPurpose: "assertionMethod",
        proofValue,
        verificationMethod,
      });

      const credential = achievementCredentialSchema.parse({
        ...input,
        proof: [proof],
      });

      return credential;
    }),
});
