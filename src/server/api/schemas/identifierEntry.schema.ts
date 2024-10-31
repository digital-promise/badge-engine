import { z } from "zod";
import { identifierTypeEnum } from "./identifierTypeEnum.schema";

export const identifierEntrySchema = z
  .object({
    id: z.string().default(""),
    type: z.array(z.string()).default(["IdentifierEntry"]) || z.undefined(),
    identifier: z.string(),
    identifierType: z.nativeEnum(identifierTypeEnum),
  })
  .optional();
