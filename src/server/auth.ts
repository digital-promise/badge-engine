import {
  getServerSession,
  type DefaultSession,
  type DefaultUser,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import Auth0Provider from "next-auth/providers/auth0";
import { env } from "~/env.mjs";
import { prismaConnect } from "~/server/db/prismaConnect";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "~/server/db/mongoConnect";
import logger from "shared/utils/logger/createLogger";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

declare module "next-auth" {
  interface Session extends DefaultSession {
    createdAt: Date;
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    lastLogin: Date;
    createdAt: Date;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),

    // signIn: async ({ user }) => {
    //   // Use the below try block with mongoose
    //   // try {
    //   //   const { email } = user;
    //   //   const mongo = await clientPromise;
    //   //   await mongo
    //   //     .db()
    //   //     .collection("users")
    //   //     .updateOne({ email }, { $set: { lastLogin: new Date(Date.now()) } });
    //   //   return true;

    //   //Use the below try block with prisma
    //   try {
    //     const { email } = user;
    //     const prisma = await prismaConnect;
    //     await prisma.user
    //     .upsert({
    //       where: email
    //     }),

    //   }
    //   } catch (e) {
    //     console.error(e);
    //     logger.error(e);
    //     return false;
    //   }
    // },
  },
  // adapter: MongoDBAdapter(clientPromise) as Adapter, // Uncomment for use with mongo/mongoose
  adapter: PrismaAdapter(prismaConnect) as Adapter,
  debug: true,
  logger: {
    error(code, metadata) {
      logger.error(code, metadata);
    },
    warn(code) {
      logger.warn(code);
    },
    debug(code, metadata) {
      logger.debug(code, metadata);
    },
  },
  providers: [
    Auth0Provider({
      clientId: env.AUTH0_CLIENT_ID,
      clientSecret: env.AUTH0_CLIENT_SECRET,
      issuer: env.AUTH0_ISSUER,
      allowDangerousEmailAccountLinking: env.NODE_ENV === "development"
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */

export const getServerAuthSession = () => getServerSession(authOptions);
