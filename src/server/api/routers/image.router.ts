import "server-only";
import sharp from "sharp";

import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const resizeAndEncode = async (file: Blob) => {
  const imageBuffer = await file.arrayBuffer();

  if (imageBuffer.byteLength === 0) return undefined;

  const imageBase64 = (
    await sharp(imageBuffer).resize(168).toBuffer()
  ).toString("base64");

  return `data:${file.type};base64,${imageBase64}`;
};

export const imageRouter = createTRPCRouter({
  upload: protectedProcedure
    .input(z.instanceof(Blob))
    .mutation(async ({ ctx, input }) => {
      const image = await resizeAndEncode(input);

      if (undefined === image) return image;

      const newImage = await ctx.prismaConnect.image.create({
        data: {
          id: image,
          type: "Image",
        },
      });

      return newImage;
    }),
});
