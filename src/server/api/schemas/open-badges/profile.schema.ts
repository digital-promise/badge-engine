import { z } from "zod";
import { imageSchema } from "./image.schema";
import { identifierEntrySchema } from "./identifier.schema";
import { isoStringFromDatetime } from "../util.schema";
import { compactJwsSchema } from "./proof.schema";
import { type EndorsementCredential, endorsementCredentialSchema } from "./credential.schema";

export const geoCoordSchema = z.object({
  type: z.string().default("GeoCoordinates"),
  latitude: z.number({ coerce: true }),
  longitude: z.number({ coerce: true }),
});

/**
 * @link https://www.imsglobal.org/spec/ob/v3p0/#address
 */
export const addressSchema = z.object({
  type: z
    .array(z.string())
    .min(1)
    .refine((t) => t.includes("Address"), {
      message: "One of the items MUST be the IRI 'Address'",
    })
    .default(["Address"]),
  addressCountry: z.string().nullish(),
  addressCountryCode: z.string().length(2).nullish(),
  addressRegion: z.string().nullish(),
  addressLocality: z.string().nullish(),
  streetAddress: z.string().nullish(),
  postOfficeBoxNumber: z.string().nullish(),
  postalCode: z.string().nullish(),
  geo: geoCoordSchema.nullish(),
});

/**
 * A Profile is a collection of information that describes the entity or organization using Open Badges.
 * Issuers must be represented as Profiles, and endorsers, or other entities may also be represented using this vocabulary.
 *
 * @link https://www.imsglobal.org/spec/ob/v3p0#profile
 */
const baseProfileSchema = z.object({
  id: z.string(),
  type: z
    .array(z.string())
    .min(1)
    .refine((t) => t.includes("Profile"), {
      message: "One of the items of type MUST be the IRI 'Profile'",
    })
    .default(["Profile"]),
  name: z.string().nullish(),
  phone: z.string().nullish(),
  description: z.string().nullish(),
  endorsementJwt: z.array(compactJwsSchema).nullish(),
  image: imageSchema.nullish(),
  email: z.string().email().nullish(),
  address: addressSchema.nullish(),
  otherIdentifier: z.array(identifierEntrySchema).nullish(),
  official: z.string().nullish(),
  familyName: z.string().nullish(),
  givenName: z.string().nullish(),
  additionalName: z.string().nullish(),
  patronymicName: z.string().nullish(),
  honorificPrefix: z.string().nullish(),
  honorificSuffix: z.string().nullish(),
  familyNamePrefix: z.string().nullish(),
  dateOfBirth: isoStringFromDatetime(z.string().date().nullish()),
});

export type Profile = z.input<typeof baseProfileSchema> & {
  endorsement?: EndorsementCredential[] | null;
};

export const profileSchema: z.ZodType<Profile> = baseProfileSchema.extend({
  endorsement: z.array(z.lazy(() => endorsementCredentialSchema)).nullish(),
});

export const profileRefSchema: z.ZodType<string | Profile> = z
  .string()
  .url()
  .or(z.lazy(() => profileSchema));
