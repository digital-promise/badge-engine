import { createTRPCRouter } from "~/server/api/trpc";
import { issuerRouter } from "~/server/api/routers/issuer.router";
import { credentialRouter } from "./routers/credential.router";
import { imageRouter } from "~/server/api/routers/image.router";
import { awardRouter } from "./routers/award.router";
import { signingRouter } from "./routers/signing.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  issuer: issuerRouter,
  credential: credentialRouter,
  image: imageRouter,
  award: awardRouter,
  signing: signingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
