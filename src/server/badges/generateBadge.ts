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

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildBadgeTextSvg(
  data: BadgeTextData,
  width: number,
  height: number
): string {
  const centerX = 1500;

  const recipientY = 2040;
  const occupationY = 2170;
  const dateY = 2300;
  const registrationY = 2415;

  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${width}"
      height="${height}"
      viewBox="0 0 ${width} ${height}"
    >
      <text
        x="${centerX}"
        y="${recipientY}"
        font-family="Arial, Helvetica, sans-serif"
        font-size="105"
        font-weight="700"
        fill="#2f3640"
        text-anchor="middle"
      >${escapeXml(data.recipientName)}</text>

      <text
        x="${centerX}"
        y="${occupationY}"
        font-family="Arial, Helvetica, sans-serif"
        font-size="78"
        font-weight="700"
        fill="#2f3640"
        text-anchor="middle"
      >${escapeXml(data.occupation)}</text>

      <text
        x="${centerX}"
        y="${dateY}"
        font-family="Arial, Helvetica, sans-serif"
        font-size="74"
        font-weight="700"
        fill="#2f3640"
        text-anchor="middle"
      >Date: ${escapeXml(data.date)}</text>

      <text
        x="${centerX}"
        y="${registrationY}"
        font-family="Arial, Helvetica, sans-serif"
        font-size="72"
        font-weight="700"
        fill="#2f3640"
        text-anchor="middle"
      >HPSCA Reg No: ${escapeXml(data.hpscaRegistrationNumber)}</text>
    </svg>
  `;
}

export async function generateBadge(data: BadgeTextData): Promise<Buffer> {
  const template = await getActiveBadgeTemplate();

  const templatePath = path.join(
    process.cwd(),
    "public",
    template.imagePath.replace(/^\//, "")
  );

  const templateImage = sharp(templatePath);
  const metadata = await templateImage.metadata();

  const width = metadata.width ?? 3004;
  const height = metadata.height ?? 3004;

  const svgOverlay = buildBadgeTextSvg(data, width, height);

  const textOverlayPng = await sharp(Buffer.from(svgOverlay), {
    density: 300,
  })
    .resize(width, height)
    .png()
    .toBuffer();

  return await templateImage
    .composite([
      {
        input: textOverlayPng,
        top: 0,
        left: 0,
      },
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
