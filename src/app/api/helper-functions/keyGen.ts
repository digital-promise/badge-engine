import * as Ed25519Multikey from "@digitalbazaar/ed25519-multikey";

const keyPair = await Ed25519Multikey.generate();

// For use with keys generated in the console
console.log("New KeyPair generated: ", keyPair);

export default keyPair;
