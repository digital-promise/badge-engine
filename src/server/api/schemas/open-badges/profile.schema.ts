import { z } from "zod";
import { imageSchema } from "./image.schema";
import { identifierEntrySchema } from "./identifier.schema";
import { isoStringFromDatetime } from "../util.schema";
import { compactJwsSchema } from "./proof.schema";
import {
  type EndorsementCredential,
  endorsementCredentialSchema,
} from "./credential.schema";

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
  addressCountry: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  addressCountryCode: z
    .string()
    .length(2)
    .nullish()
    .transform((v) => v ?? undefined),
  addressRegion: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  addressLocality: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  streetAddress: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  postOfficeBoxNumber: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  postalCode: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  geo: geoCoordSchema.nullish().transform((v) => v ?? undefined),
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
  name: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  phone: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  description: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  endorsementJwt: z
    .array(compactJwsSchema)
    .nullish()
    .transform((v) => v ?? undefined),
  image: imageSchema.nullish().transform((v) => v ?? undefined),
  email: z
    .string()
    .email()
    .nullish()
    .transform((v) => v ?? undefined),
  address: addressSchema.nullish().transform((v) => v ?? undefined),
  otherIdentifier: z
    .array(identifierEntrySchema)
    .nullish()
    .transform((v) => v ?? undefined),
  official: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  familyName: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  givenName: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  additionalName: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  patronymicName: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  honorificPrefix: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  honorificSuffix: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  familyNamePrefix: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  dateOfBirth: isoStringFromDatetime(
    z
      .string()
      .date()
      .nullish()
      .transform((v) => v ?? undefined),
  ),
});

export type Profile = z.input<typeof baseProfileSchema> & {
  endorsement?: EndorsementCredential[] | null;
};

export const profileSchema: z.ZodType<Profile> = baseProfileSchema.extend({
  endorsement: z
    .array(z.lazy(() => endorsementCredentialSchema))
    .nullish()
    .transform((v) => v ?? undefined),
});

export const profileRefSchema: z.ZodType<string | Profile> = z
  .string()
  .url()
  .or(z.lazy(() => profileSchema));
