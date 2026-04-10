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

async function getEmbeddedFontCss(): Promise<string> {
  const fontPath = path.join(
    process.cwd(),
    "public",
    "fonts",
    "Inter-Bold.ttf"
  );

  const fontBuffer = await fs.readFile(fontPath);
  const fontBase64 = fontBuffer.toString("base64");

  return `
    @font-face {
      font-family: "BadgeSans";
      src: url("data:font/ttf;base64,${fontBase64}") format("truetype");
      font-weight: 700;
      font-style: normal;
    }
  `;
}

async function buildBadgeTextSvg(
  data: BadgeTextData,
  width: number,
  height: number
): Promise<string> {
  const fontCss = await getEmbeddedFontCss();

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
      <defs>
        <style>
          <![CDATA[
            ${fontCss}
            .badge-text {
              font-family: "BadgeSans";
              fill: #2f3640;
              text-anchor: middle;
            }
          ]]>
        </style>
      </defs>

      <text
        class="badge-text"
        x="${centerX}"
        y="${recipientY}"
        font-size="105"
        font-weight="700"
      >${escapeXml(data.recipientName)}</text>

      <text
        class="badge-text"
        x="${centerX}"
        y="${occupationY}"
        font-size="78"
        font-weight="700"
      >${escapeXml(data.occupation)}</text>

      <text
        class="badge-text"
        x="${centerX}"
        y="${dateY}"
        font-size="74"
        font-weight="700"
      >Date: ${escapeXml(data.date)}</text>

      <text
        class="badge-text"
        x="${centerX}"
        y="${registrationY}"
        font-size="72"
        font-weight="700"
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

  const svgOverlay = await buildBadgeTextSvg(data, width, height);

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
