import path from "path";
import sharp from "sharp";

import { getActiveBadgeTemplate } from "~/server/badges/getActiveBadgeTemplate";

export type BadgeTextData = {
  recipientName: string;
  occupation: string;
  date: string;
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildBadgeTextSvg(data: BadgeTextData): string {
  return `
    <svg width="3004" height="3004" xmlns="http://www.w3.org/2000/svg">
      <style>
        .field {
          font-family: Arial, Helvetica, sans-serif;
          font-weight: 700;
          fill: #2f3640;
          text-anchor: middle;
          dominant-baseline: middle;
        }
      </style>

      <text x="1502" y="2010" class="field" font-size="110">
        ${escapeXml(data.recipientName)}
      </text>

      <text x="1502" y="2170" class="field" font-size="82">
        ${escapeXml(data.occupation)}
      </text>

      <text x="1502" y="2330" class="field" font-size="82">
        ${escapeXml(data.date)}
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

  const svgOverlay = buildBadgeTextSvg(data);

  return await sharp(templatePath)
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
