declare module "jsonld-document-loader" {
  import type { ContextDefinition, RemoteDocument } from "jsonld";

  export type ContextDocuments = Map<
    string,
    Record<"@context", ContextDefinition>
  >;

  type documentLoader = (
    url: string,
    callback: (err: Error, remoteDoc: RemoteDocument) => void,
  ) => Promise<RemoteDocument>;

  export class JsonLdDocumentLoader {
    addDocuments({ documents }: { documents: ContextDocuments }): void;
    build(): documentLoader;
  }
}

declare module "bnid" {
  export function generateSecretKeySeed(): Promise<string>;
  export function decodeSecretKeySeed({
    secretKeySeed,
  }: {
    secretKeySeed: string;
  }): Uint8Array;
}

declare module "@digitalbazaar/ed25519-multikey" {
  export default interface Ed25519Multikey {
    generate: ({
      id,
      controller,
      seed,
    }?: {
      id?: string;
      controller?: string;
      seed?: Uint8Array;
    }) => Promise<KeyPair>;

    from: (key: object) => KeyPair;
  }

  interface KeyPair {
    export: (args: KeyPairExportArgs) => Promise<Multikey>;
    signer: () => {
      sign: ({ data }: { data: NodeJS.ArrayBufferView }) => Promise<Buffer>;
    };
  }

  type KeyPairExportArgs = {
    publicKey?: boolean;
    secretKey?: boolean;
    includeContext?: boolean;
    seed?: boolean;
  };

  type Multikey = {
    type: "Multikey";
    id: string;
    controller: string;
    publicKeyMultibase: string;
    secretKeyMultibase: string;
    seed: string;
  };

  const multikey: Ed25519Multikey;

  export = multikey;
}
