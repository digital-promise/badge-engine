import { z } from "zod";
import { env } from "~/env.mjs";
import { issuerProfileSchema } from "../schemas/issuerProfile.schema";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { Prisma } from "@prisma/client";
import { baseQuery } from "~/server/api/schemas/search-filter.schema";

export const issuerRouter = createTRPCRouter({
  index: publicProcedure.input(baseQuery).query(async ({ input, ctx }) => {
    const where = {
      ...(input.s
        ? {
            name: {
              contains: input.s,
              mode: "insensitive",
            },
          }
        : {}),
    } satisfies Prisma.ProfileWhereInput;

    const pagination = {
      ...(input.limit
        ? {
            take: input.limit,
            skip: input.limit * (input.page - 1),
          }
        : {}),
    };

    return ctx.prismaConnect.$transaction([
      ctx.prismaConnect.profile.count(),
      ctx.prismaConnect.profile.count({
        where,
      }),
      ctx.prismaConnect.profile.findMany({
        where,
        ...pagination,
        orderBy: [{ createdAt: "desc" }],
        include: {
          image: true,
          _count: {
            select: {
              Achievement: true,
              childOrgs: true,
            },
          },
        },
      }),
    ]);
  }),

  create: protectedProcedure
    .input(issuerProfileSchema)
    .mutation(async ({ ctx, input }) => {
      const { docId, image, ...data } = input;

      let imageQuery: Prisma.ImageUpdateOneWithoutProfileNestedInput = {};

      if (null === image) {
        imageQuery.disconnect = true;
      } else if (image) {
        imageQuery = {
          connect: {
            docId: image.docId,
          },
        };
      }

      try {
        if (docId) {
          const updatedIssuer = await ctx.prismaConnect.profile.update({
            where: { docId },
            data: {
              ...data,
              image: imageQuery,
              type: ["Profile"],
              updatedAt: new Date().toJSON(),
              emailVerified: data.emailVerified ? data.emailVerified : false,
              official: data.official ? data.official : null,
            },
          });
          return updatedIssuer;
        } else {
          let newIssuer = await ctx.prismaConnect.profile.create({
            data: {
              ...data,
              createdAt: new Date().toJSON(),
              updatedAt: new Date().toJSON(),
              image: imageQuery,
              emailVerified: false,
              official: data.official ? data.official : null,
            },
          });

          newIssuer = await ctx.prismaConnect.profile.update({
            where: { docId: newIssuer.docId },
            data: {
              id: `${env.NEXTAUTH_URL.replace(/\/$/, "")}/issuers/${newIssuer.docId}`,
            },
          });

          return newIssuer;
        }
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new TRPCError({
              code: "CONFLICT",
              message: "An organization with that name already exists.",
            });
          }
        }
      }
    }),

  find: publicProcedure
    .input(z.object({ docId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const issuer = await ctx.prismaConnect.profile.findUnique({
          where: { docId: input.docId },
          include: {
            image: true,
          },
        });

        return issuer;
      } catch (_e) {
        return null;
      }
    }),
});
