/** @see https://github.com/vercel/next.js/tree/canary/examples/with-mongodb */

/** @see https://authjs.dev/getting-started/adapters/mongodb?_gl=1*1fhl0pz*_gcl_au*MjcwNTk3MDIuMTcxNTM3NDIwMC4xOTk1NjI4OTYwLjE3MTc0NTQzNzAuMTcxNzQ1NDM3MA.. */

import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "~/env.mjs";
import logger from "shared/utils/logger/createLogger";

if (!env.DATABASE_URL) {
  throw new Error('Invalid/Missing environment variable: "DATABASE_URL"');
}

const uri = env.DATABASE_URL;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise: Promise<MongoClient>;

if (env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    logger.info("Creating new dev Mongo Client.");

    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }

  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  logger.info("Creating new prod Mongo Client.");
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a separate module, the client can be shared across functions.
export default clientPromise;
