declare module "base58-universal" {
  function encode(data: Uint8Array): string;
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
      seed?: string;
    }) => Promise<KeyPair>;

    from: (key: object) => KeyPair;
  }

  interface KeyPair {
    export: (args: KeyPairExportArgs) => Promise<Multikey>;
    signer: () => {
      sign: ({ data }: { data: Uint8Array }) => Promise<Uint8Array>;
    };
  }

  type KeyPairExportArgs = {
    publicKey: boolean;
    secretKey?: boolean;
  };

  type Multikey = {
    type: "Multikey";
    id: string;
    controller: string;
    publicKeyMultibase: string;
    secretKeyMultibase?: string;
  };

  const multikey: Ed25519Multikey;

  export = multikey;
}
