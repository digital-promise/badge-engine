import { randomUUID } from "crypto";
import { z } from "zod";
import type { RouterOutputs } from "~/trpc/shared";
import { anyUrlPattern, httpProtocol } from "~/util";
import { imageSchema } from "~/server/api/schemas/image.schema";

export const issuerProfileSchema = z.object({
  docId: z.string().default(""),
  createdAt: z.string(),
  updatedAt: z.string(),
  lastLogin: z.string().optional(),
  isActive: z.boolean().default(true),
  isPublic: z.boolean().default(false),
  hasAgreedTerms: z.boolean().optional(),
  agreedTermsVersion: z.string().optional(),
  id: z.string().optional().default(randomUUID), // Temporary unique identifier. Must be updated after resource creation.
  type: z.array(z.string()).default(["Profile"]) || z.undefined(),
  name: z.string(),
  url: z.string().regex(anyUrlPattern).max(90).transform(v => v.match(httpProtocol) ? v : 'https://' + v),
  image: imageSchema.nullish(),
  phone: z.string().optional(),
  description: z
    .string()
    .max(
      700,
      "Issuer description is limited to 700 characters (approximately 75 words).",
    )
    .optional(),
  // endorsement: // TODO: come back to this
  endorsementJwt: z.array(z.string()).optional(),
  email: z.string().email(),
  emailVerified: z.boolean().optional(),
  receiveNotifications: z.boolean().optional(),
  // address: addressSchema.optional(),
  // otherIdentifier: identifierEntrySchema.optional(),
  official: z.string().optional(),
});

export type Issuer = RouterOutputs["issuer"]["find"];

// https://github.com/colinhacks/zod?tab=readme-ov-file#recursive-types
// type Profile = z.infer<typeof baseIssuerSchema> & {
//   parentOrg?: Profile;
//   childOrgs?: Profile[];
// };

// export const profileSchema: z.ZodType<Profile> = baseIssuerSchema.extend({
//   parentOrg: z.lazy(() => profileSchema),
//   childOrgs: z.lazy(() => profileSchema.array()),
// });
