import { z } from "zod";
import { IdentifierType, type Prisma } from "@prisma/client";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { CreateAwardSchema } from "../schemas/award.schema";
import {
  protectedAchievementCredentialInclude,
  publicAchievementCredentialSelect,
} from "~/server/db/queries";
import { env } from "~/env.mjs";
import { mongoDbObjectId } from "../schemas/util.schema";

export const awardRouter = createTRPCRouter({
  find: protectedProcedure
    .input(mongoDbObjectId)
    .query(async ({ ctx, input }) => {
      return ctx.prismaConnect.achievementCredential.findUniqueOrThrow({
        where: { docId: input },
        include: protectedAchievementCredentialInclude,
      });
    }),
  index: protectedProcedure
    .input(
      z.object({
        credentialId: mongoDbObjectId,
        query: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.prismaConnect.achievementCredential.findMany({
        include: {
          credentialStatus: true,
          credentialSubject: {
            include: {
              profile: true,
            },
          },
        },
        where: {
          credentialSubject: {
            achievementId: input.credentialId,
            ...(input.query
              ? {
                  profile: {
                    OR: ["name", "familyName", "givenName", "email"].map(
                      (f) => ({
                        [f]: { contains: input.query, mode: "insensitive" },
                      }),
                    ),
                  },
                }
              : {}),
          },
        },
        take: 10,
        orderBy: {
          awardedDate: "desc",
        },
      });
    }),

  create: protectedProcedure
    .input(CreateAwardSchema)
    .mutation(async ({ ctx, input }) => {
      const { credentialId, identifier, profile } = input;

      return ctx.prismaConnect.$transaction(async (prisma) => {
        const credential = await prisma.achievement.findUniqueOrThrow({
          where: { id: credentialId },
          select: { id: true, creatorId: true, name: true, description: true },
        });

        const identityObject = await prisma.identityObject.upsert({
          where: {
            identityHash: identifier,
          },
          update: {},
          create: {
            type: "IdentityObject",
            identityHash: identifier,
            identityType: IdentifierType.emailAddress,
            hashed: false,
          },
          select: { id: true },
        });

        const awardSubject: Prisma.AchievementSubjectCreateInput = {
          identifier: { connect: { id: identityObject.id } },
          achievement: { connect: { id: credential.id } },
          type: ["AchievementSubject"],
          source: { connect: { id: credential.creatorId! } },
          profile: {
            create: {
              ...profile,
              email: identifier,
            },
          },
        };

        const awardee = await prisma.achievementSubject.create({
          data: awardSubject,
        });

        const awardedCredential: Prisma.AchievementCredentialCreateInput = {
          name: credential.name,
          type: ["AchievementCredential"],
          description: credential.description,
          id: awardee.docId, // Temporarily assign URI until a database ID is available.
          awardedDate: new Date().toISOString(),
          validFrom: new Date().toISOString(),
          credentialSubject: { connect: { docId: awardee.docId } },
          issuer: { connect: { id: credential.creatorId! } },
        };

        const { docId } = await prisma.achievementCredential.create({
          data: awardedCredential,
          select: { docId: true },
        });

        return prisma.achievementCredential.update({
          where: { docId },
          data: {
            id: `${env.NEXTAUTH_URL.replace(/\/$/, "")}/awards/${docId}`,
          },
          select: publicAchievementCredentialSelect,
        });
      });
    }),
});
