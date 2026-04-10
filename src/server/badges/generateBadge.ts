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
  const centerX = Math.round(width / 2);

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .field {
          font-family: Arial, Helvetica, sans-serif;
          font-weight: 700;
          fill: #2f3640;
          text-anchor: middle;
        }
      </style>

      <text x="${centerX}" y="695" class="field" font-size="46">
        ${escapeXml(data.recipientName)}
      </text>

      <text x="${centerX}" y="750" class="field" font-size="30">
        ${escapeXml(data.occupation)}
      </text>

      <text x="${centerX}" y="805" class="field" font-size="28">
        Date: ${escapeXml(data.date)}
      </text>

      <text x="${centerX}" y="850" class="field" font-size="28">
        HPSCA Reg No: ${escapeXml(data.hpscaRegistrationNumber)}
      </text>
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

  const width = metadata.width ?? 1024;
  const height = metadata.height ?? 1024;

  const svgOverlay = buildBadgeTextSvg(data, width, height);

  return await templateImage
    .composite([
      {
        input: Buffer.from(svgOverlay),
        top: 0,
        left: 0,
      },
    ])
    .png()
    .toBuffer();
}
