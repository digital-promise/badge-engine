import { z } from "zod";

export const geoCoordinatesSchema = z
  .object({
    id: z.string().default(""),
    type: z.array(z.string()).default(["GeoCoordinates"]) || z.undefined(),
    //   Lat and lon need to be type Float.  Hopefully this workaround will suffice, being that zod doesn't have an out-of-the-box validation for checking of decimal numbers.
    // https://www.prisma.io/docs/orm/reference/prisma-schema-reference#float
    // https://stackoverflow.com/questions/75285218/is-there-a-way-to-use-zod-to-validate-that-a-number-has-up-to-2-decimal-digits
    latitude: z.number().multipleOf(0.01) || z.undefined(),
    longitude: z.number().multipleOf(0.01) || z.undefined(),
  })
  .optional();
