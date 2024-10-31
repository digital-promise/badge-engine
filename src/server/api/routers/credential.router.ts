import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { anyUrlPattern, uuidUri } from "~/util";
import { CreateCredentialSchema } from "~/server/api/schemas/credential.schema";
import { baseQuery } from "~/server/api/schemas/search-filter.schema";
import { ResultType, QuestionType, type Prisma } from "@prisma/client";
import { mongoDbObjectId } from "../schemas/util.schema";
import { achievementComplete } from "~/server/db/queries";
import { env } from "~/env.mjs";

export const credentialRouter = createTRPCRouter({
  index: publicProcedure
    .input(
      baseQuery.extend({
        issuerId: z.string().optional(),
        includeAll: z.boolean().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const baseWhere = {
        ...(input.issuerId ? { creator: { docId: input.issuerId } } : {}),
      } satisfies Prisma.AchievementWhereInput;

      const pagination = {
        ...(input.limit
          ? {
              take: input.limit,
              skip: input.limit * (input.page - 1),
            }
          : {}),
      };

      const where = {
        ...baseWhere,
        ...(input.s
          ? {
              name: {
                contains: input.s,
                mode: "insensitive",
              },
            }
          : {}),
      } satisfies Prisma.AchievementWhereInput;

      const include = (
        input.includeAll
          ? achievementComplete
          : {
              image: true,
            }
      ) satisfies Prisma.AchievementInclude;

      return ctx.prismaConnect.$transaction([
        ctx.prismaConnect.achievement.count({
          where: baseWhere,
        }),
        ctx.prismaConnect.achievement.count({
          where,
        }),
        ctx.prismaConnect.achievement.findMany({
          where,
          ...pagination,
          include,
        }),
      ]);
    }),

  create: protectedProcedure
    .input(CreateCredentialSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const {
          issuer,
          image,
          criteria,
          supportingResearchAndRationale,
          resources,
          resultDescription,
          ...data
        } = input;

        const criteriaTextContent = criteria.replace(/(<([^>]+)>)/gi, ""); // Strip HTML tags for funsies to see if we've been provided a URL.

        const createCriteriaQuery = {
          ...(criteriaTextContent.match(anyUrlPattern)
            ? {
                id: criteriaTextContent,
              }
            : {
                narrative: criteria,
              }),
        } satisfies Prisma.CriteriaTypeCreateInput;

        const createResultDescriptionQuery = {
          create: resultDescription!
            .filter((r) => r !== undefined)
            .map((r) => {
              const { rubricCriterionLevel, requireFile, name, uiPlacement } =
                r;

              const resultType = rubricCriterionLevel?.length
                ? ResultType.RubricCriterion
                : ResultType.Result;

              return {
                name,
                id: uuidUri(),
                type: ["ResultDescription"],
                resultType,
                uiPlacement,
                questionType: requireFile
                  ? QuestionType.FILEQUESTION
                  : QuestionType.TEXTQUESTION,
                rubricCriterionLevel: {
                  create: rubricCriterionLevel
                    ?.filter((r) => r !== undefined)
                    .map((r) => {
                      return {
                        ...r,
                        name: r.level,
                        id: uuidUri(),
                        type: ["RubricCriterionLevel"],
                      };
                    }),
                },
              };
            }),
        } satisfies Prisma.ResultDescriptionCreateNestedManyWithoutAchievementInput;

        const newAchievement = await ctx.prismaConnect.$transaction(
          async (prisma) => {
            const { docId } = await prisma.achievement.create({
              data: {
                ...data,
                id: uuidUri(), // Required
                type: ["Achievement"],
                creator: { connect: { docId: issuer } },
                image: { connect: { docId: image.docId } },
                criteria: createCriteriaQuery,
                resultDescription: createResultDescriptionQuery,
                extensions: {},
              },
              select: { docId: true },
            });

            const achievementWithUri = await prisma.achievement.update({
              where: { docId },
              data: {
                id: `${env.NEXTAUTH_URL}/issuers/${issuer}/credentials/${docId}`,
              },
            });

            const extensions = {
              achievement: { connect: { docId } },
              assessmentExtensions: {
                create: [
                  {
                    achievement: { connect: { docId } },
                    type: [
                      "Extension",
                      "AssessmentExtension",
                      "SupportingResearch",
                      "Resources",
                    ],
                    resources,
                    supportingResearchAndRationale,
                  },
                ],
              },
            } satisfies Prisma.ExtensionsCreateInput;

            await prisma.extensions.create({ data: extensions });

            return achievementWithUri;
          },
        );

        return newAchievement;
      } catch (e) {
        console.error("An error occurred while creating this credential.");
        console.error(e);

        throw e;
      }
    }),

  find: publicProcedure
    .input(
      z.object({
        docId: mongoDbObjectId,
      }),
    )
    .query(async ({ ctx, input }) => {
      const credential = await ctx.prismaConnect.achievement.findUnique({
        where: {
          docId: input.docId,
        },
        include: achievementComplete,
      });

      return credential;
    }),
});
