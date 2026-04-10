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
  height: number;
  fontSize: number;
};

function escapeText(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function renderCenteredTextBlock(
  width: number,
  fontPath: string,
  options: TextBlockOptions
): Promise<Buffer> {
  return await sharp({
    text: {
      text: escapeText(options.text),
      font: "Inter Bold",
      fontfile: fontPath,
      width,
      height: options.height,
      align: "center",
      rgba: true,
      dpi: 300,
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
  const height = metadata.height ?? 3004;

  const recipientTop = 1940;
  const occupationTop = 2085;
  const dateTop = 2210;
  const registrationTop = 2325;

  const recipientBlock = await renderCenteredTextBlock(width, fontPath, {
    text: data.recipientName,
    top: recipientTop,
    height: 130,
    fontSize: 105,
  });

  const occupationBlock = await renderCenteredTextBlock(width, fontPath, {
    text: data.occupation,
    top: occupationTop,
    height: 110,
    fontSize: 78,
  });

  const dateBlock = await renderCenteredTextBlock(width, fontPath, {
    text: `Date: ${data.date}`,
    top: dateTop,
    height: 100,
    fontSize: 74,
  });

  const registrationBlock = await renderCenteredTextBlock(width, fontPath, {
    text: `HPSCA Reg No: ${data.hpscaRegistrationNumber}`,
    top: registrationTop,
    height: 100,
    fontSize: 72,
  });

  return await templateImage
    .composite([
      { input: recipientBlock, top: recipientTop, left: 0 },
      { input: occupationBlock, top: occupationTop, left: 0 },
      { input: dateBlock, top: dateTop, left: 0 },
      { input: registrationBlock, top: registrationTop, left: 0 },
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
