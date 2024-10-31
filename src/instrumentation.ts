// https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
import {
    getIssuerPrivateKey
} from "~/get_issuer_private_key"

export async function register() {
    process.env.ISSUER_PRIVATE_KEY_FROM_ORIGIN  = await getIssuerPrivateKey();
}
