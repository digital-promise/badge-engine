import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

import { getActiveBadgeTemplate } from "~/server/badges/getActiveBadgeTemplate";

export type BadgeTextData = {
  recipientName: string;
  occupation: string;
  date: string;
  hpscaRegistrationNumber: string;
};

type TextBlockOptions = {
  text: string;
  top: number;
  fontSize: number;
};

function escapeText(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function renderTextBlock(
  fontPath: string,
  options: TextBlockOptions
): Promise<Buffer> {
  return await sharp({
    text: {
      text: escapeText(options.text),
      font: `Inter Bold ${options.fontSize}`,
      fontfile: fontPath,
      rgba: true,
    },
  })
    .png()
    .toBuffer();
}

export async function generateBadge(data: BadgeTextData): Promise<Buffer> {
  const template = await getActiveBadgeTemplate();

  const templatePath = path.join(
    process.cwd(),
    "public",
    template.imagePath.replace(/^\//, "")
  );

  const fontPath = path.join(
    process.cwd(),
    "public",
    "fonts",
    "Inter-Bold.ttf"
  );

  await fs.access(fontPath);

  const templateImage = sharp(templatePath);
  const metadata = await templateImage.metadata();

  const width = metadata.width ?? 3004;

  const recipientTop = 1980;
  const occupationTop = 2110;
  const dateTop = 2235;
  const registrationTop = 2350;

  const recipientBlock = await renderTextBlock(fontPath, {
    text: data.recipientName,
    top: recipientTop,
    fontSize: 105,
  });

  const occupationBlock = await renderTextBlock(fontPath, {
    text: data.occupation,
    top: occupationTop,
    fontSize: 78,
  });

  const dateBlock = await renderTextBlock(fontPath, {
    text: `Date: ${data.date}`,
    top: dateTop,
    fontSize: 74,
  });

  const registrationBlock = await renderTextBlock(fontPath, {
    text: `HPSCA Reg No: ${data.hpscaRegistrationNumber}`,
    top: registrationTop,
    fontSize: 72,
  });

  const recipientMeta = await sharp(recipientBlock).metadata();
  const occupationMeta = await sharp(occupationBlock).metadata();
  const dateMeta = await sharp(dateBlock).metadata();
  const registrationMeta = await sharp(registrationBlock).metadata();

  const recipientLeft = Math.max(
    0,
    Math.round((width - (recipientMeta.width ?? 0)) / 2)
  );
  const occupationLeft = Math.max(
    0,
    Math.round((width - (occupationMeta.width ?? 0)) / 2)
  );
  const dateLeft = Math.max(
    0,
    Math.round((width - (dateMeta.width ?? 0)) / 2)
  );
  const registrationLeft = Math.max(
    0,
    Math.round((width - (registrationMeta.width ?? 0)) / 2)
  );

  return await templateImage
    .composite([
      { input: recipientBlock, top: recipientTop, left: recipientLeft },
      { input: occupationBlock, top: occupationTop, left: occupationLeft },
      { input: dateBlock, top: dateTop, left: dateLeft },
      { input: registrationBlock, top: registrationTop, left: registrationLeft },
    ])
    .png()
    .toBuffer();
}

export async function generateAndSaveBadgeImage(
  data: BadgeTextData,
  filename: string
): Promise<{ imagePath: string }> {
  const badgeBuffer = await generateBadge(data);

  const relativePath = `/generated-badges/${filename}.png`;
  const absolutePath = path.join(
    process.cwd(),
    "public",
    "generated-badges",
    `${filename}.png`
  );

  await fs.mkdir(path.dirname(absolutePath), { recursive: true });
  await fs.writeFile(absolutePath, badgeBuffer);

  return {
    imagePath: relativePath,
  };
}
