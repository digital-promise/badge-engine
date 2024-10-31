/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */

/** @see https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.ts */

import mongoose from "mongoose";
import { env } from "~/env.mjs";
import logger from "shared/utils/logger/createLogger";

declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const uri: string = env.DATABASE_URL;

if (!uri) {
  throw new Error('Invalid/Missing environment variable: "DATABASE_URL"');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function mongooseConnect() {
  logger.info("Connecting to Mongoose.");

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    logger.error("Error connecting to Mongoose", Error);
    throw e;
  }
  return cached.conn;
}

export default mongooseConnect;
