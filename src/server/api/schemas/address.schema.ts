import { z } from "zod";
import { geoCoordinatesSchema } from "./geoCoordinates.schema";

export const addressSchema = z
  .object({
    id: z.string().default(""),
    type: z.array(z.string()).default(["Address"]) || z.undefined(),
    addressCountry: z.string().optional(),
    addressCountryCode: z.number().optional(),
    addressRegion: z.string().optional(),
    addressLocality: z.string().optional(),
    streetAddress: z.string().optional(),
    postOfficeBoxNumber: z.string().optional(),
    postalCode: z.string().optional(),
    geo: geoCoordinatesSchema.optional(),
  })
  .optional();
