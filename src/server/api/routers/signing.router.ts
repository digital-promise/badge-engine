import jsonld from "jsonld";
import n3 from "n3";
import { RDFC10, type Quads, type InputQuads } from "rdfjs-c14n";
import { ed25519 as ed } from "@noble/curves/ed25519";
import { base58btc } from "multiformats/bases/base58";
import documentLoader from "~/lib/document-loader";
import { getSigningKey } from "~/lib/get-signing-key";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createVerifiableAchievementCredentialSchema } from "~/server/api/schemas/open-badges/credential.schema";

type ProofConfig = {
  type: "DataIntegrityProof";
  cryptosuite: "eddsa-rdfc-2022";
  created: string;
  verificationMethod: string;
  proofPurpose: "assertionMethod";
  "@context"?: string[];
};

type Proof = ProofConfig & {
  proofValue: string;
};

const rdfc10 = new RDFC10(n3.DataFactory);

const toQuads = async (input: object) =>
  jsonld.toRDF(input, {
    format: "application/n-quads",
    documentLoader,
  }) as unknown as InputQuads;

const normalize = async (input: InputQuads) =>
  (await rdfc10.c14n(input)).canonicalized_dataset;

const hash = async (input: Quads) => rdfc10.hash(input);

const transformAndHash = async (input: object) => {
  const quads = await toQuads(input);
  const normalizedQuads = await normalize(quads);

  return hash(normalizedQuads);
};

export const signingRouter = createTRPCRouter({
  createProof: protectedProcedure
    .input(createVerifiableAchievementCredentialSchema)
    .mutation(async ({ ctx, input }) => {
      const { docId, context, ...unsecuredCredential } = input;

      const { publicKeyMultibase, secretKeyMultibase } = await (
        await getSigningKey()
      ).export({ publicKey: true, secretKey: true, seed: true });

      const sign = (hexString: string) => {
        const privateKey = base58btc.decode(secretKeyMultibase).slice(2, 34);
        return base58btc.encode(ed.sign(hexString, privateKey));
      };

      const credentialWithoutProof = {
        "@context": context,
        ...unsecuredCredential,
      };

      const verificationMethod = `did:key:${publicKeyMultibase}`;

      /**
       * @link https://www.w3.org/TR/vc-di-eddsa/#proof-configuration-eddsa-jcs-2022
       */
      const proof: ProofConfig = {
        type: "DataIntegrityProof",
        cryptosuite: "eddsa-rdfc-2022",
        created: new Date().toISOString(),
        verificationMethod,
        proofPurpose: "assertionMethod",
        "@context": context,
      };

      /**
       * Create an eddsa-rdfc-2022 proof
       *
       * Canonicalizes the proof config and credential document by creating a hashable serialization of each document, hashes the data by applying SHA-256, and concatenates the two buffers.
       *
       * @link https://www.w3.org/TR/vc-di-eddsa/#eddsa-rdfc-2022
       */
      const proofHex = (
        await Promise.all(
          [proof, credentialWithoutProof].map((i) => transformAndHash(i)),
        )
      ).join("");

      /**
       * Create a signature from hashed bytes.
       *
       *
       * Encode signature in base-58 with Multibase header "z" and include with options and proof purpose in final proof object.
       *
       * @link https://www.w3.org/TR/vc-di-eddsa/#dataintegrityproof
       *
       * @link https://www.w3.org/TR/vc-di-eddsa/#proof-serialization-eddsa-rdfc-2022
       */
      const proofValue = sign(proofHex);

      (proof as Proof).proofValue = proofValue;
      delete proof["@context"];

      const signedCredential = Object.assign({}, credentialWithoutProof);
      signedCredential.proof = [...(input.proof ?? []), proof];

      await ctx.prismaConnect.achievementCredential.update({
        data: { claimed: true },
        where: { docId },
      });

      return signedCredential;
    }),
});
