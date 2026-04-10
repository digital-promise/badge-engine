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

  const recipientY = Math.round(height * 0.679); // ~2040 on 3004px
  const occupationY = Math.round(height * 0.722); // ~2170
  const dateY = Math.round(height * 0.766); // ~2300
  const registrationY = Math.round(height * 0.804); // ~2415

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <text
        x="${centerX}"
        y="${recipientY}"
        font-family="Arial, Helvetica, sans-serif"
        font-size="105"
        font-weight="700"
        fill="#2f3640"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        ${escapeXml(data.recipientName)}
      </text>

      <text
        x="${centerX}"
        y="${occupationY}"
        font-family="Arial, Helvetica, sans-serif"
        font-size="78"
        font-weight="700"
        fill="#2f3640"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        ${escapeXml(data.occupation)}
      </text>

      <text
        x="${centerX}"
        y="${dateY}"
        font-family="Arial, Helvetica, sans-serif"
        font-size="74"
        font-weight="700"
        fill="#2f3640"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        Date: ${escapeXml(data.date)}
      </text>

      <text
        x="${centerX}"
        y="${registrationY}"
        font-family="Arial, Helvetica, sans-serif"
        font-size="72"
        font-weight="700"
        fill="#2f3640"
        text-anchor="middle"
        dominant-baseline="middle"
      >
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
