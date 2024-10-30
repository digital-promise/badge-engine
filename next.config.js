/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
    experimental: {
        instrumentationHook: true, // Allows use of instrumentation - https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
    },      
    transpilePackages: ['@mdxeditor/editor'],
};

if (process.env.NODE_ENV === 'development') {
    // Don't break the local front-end creating builds during development.
    config.output = 'standalone'
}

export default config;
