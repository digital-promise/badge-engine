import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .refine(
        (str) => !str.includes("DATABASE_URL"),
        "You forgot to change the default URL",
      ),

    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),

    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url(),
    ),

    AUTH0_CLIENT_ID: z.string(),
    AUTH0_CLIENT_SECRET: z.string(),
    AUTH0_ISSUER: z.string().url(),

    // LIGHTCAST_CLIENT_ID: z.string(),
    // LIGHTCAST_SECRET: z.string()
    ISSUER_PRIVATE_KEY_SECRET_NAME: z.string(),
    ISSUER_PRIVATE_KEY_READ_ROLE_ARN: z.string(),
    ISSUER_PRIVATE_KEY_FROM_ORIGIN: z.string().optional(), // typed as optional, set by instrumentation.ts
    AWS_KMS_KEY_ID: z.string(),

    AWS_REGION: z.string(),
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_ISSUER: process.env.AUTH0_ISSUER,
    // LIGHTCAST_CLIENT_ID: process.env.LIGHTCAST_CLIENT_ID,
    // LIGHTCAST_SECRET: process.env.LIGHTCAST_SECRET

    // Secret manager secret name for IPK
    ISSUER_PRIVATE_KEY_SECRET_NAME: process.env.ISSUER_PRIVATE_KEY_SECRET_NAME,
    ISSUER_PRIVATE_KEY_READ_ROLE_ARN:
      process.env.ISSUER_PRIVATE_KEY_READ_ROLE_ARN,

    // Actual issuer private key - set by instrumentation.ts
    ISSUER_PRIVATE_KEY_FROM_ORIGIN: process.env.ISSUER_PRIVATE_KEY_FROM_ORIGIN,
    AWS_KMS_KEY_ID: process.env.AWS_KMS_KEY_ID,

    // AWS config for reading AWS secret manager secret key
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
