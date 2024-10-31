import { z, type ZodSchema } from "zod";

export const mongoDbObjectId = z
  .string()
  .length(24, "ID was not the correct length.")
  .regex(/[a-fA-F0-9]{2}/, "ID was not a valid hex string.");

export const isoStringFromDatetime = (schema: ZodSchema) =>
  z.preprocess((v) => {
    if (!v) return v;

    return v instanceof Date ? v.toISOString() : String(v);
  }, schema);
