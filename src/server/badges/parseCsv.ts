export type ParsedBadgeCsvRow = {
  recipientName: string;
  recipientEmail: string;
  occupation: string;
  date: string;
  badgeTitle?: string;
};

const REQUIRED_HEADERS = [
  "recipientName",
  "recipientEmail",
  "occupation",
  "date",
] as const;

const OPTIONAL_HEADERS = ["badgeTitle"] as const;

function normalizeLineEndings(value: string): string {
  return value.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function splitCsvLine(line: string): string[] {
  return line.split(",").map((cell) => cell.trim());
}

export function parseCsv(csvText: string): ParsedBadgeCsvRow[] {
  const normalized = normalizeLineEndings(csvText).trim();

  if (!normalized) {
    throw new Error("CSV file is empty.");
  }

  const lines = normalized
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length < 2) {
    throw new Error("CSV must include a header row and at least one data row.");
  }

  const headers = splitCsvLine(lines[0] ?? "");
  const missingHeaders = REQUIRED_HEADERS.filter(
    (header) => !headers.includes(header)
  );

  if (missingHeaders.length > 0) {
    throw new Error(
      `CSV is missing required header(s): ${missingHeaders.join(", ")}`
    );
  }

  const rows: ParsedBadgeCsvRow[] = [];

  for (let i = 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line) continue;

    const values = splitCsvLine(line);

    const rowObject = headers.reduce<Record<string, string>>((acc, header, index) => {
      acc[header] = values[index] ?? "";
      return acc;
    }, {});

    const parsedRow: ParsedBadgeCsvRow = {
      recipientName: rowObject.recipientName ?? "",
      recipientEmail: rowObject.recipientEmail ?? "",
      occupation: rowObject.occupation ?? "",
      date: rowObject.date ?? "",
      badgeTitle: rowObject.badgeTitle || undefined,
    };

    if (
      !parsedRow.recipientName ||
      !parsedRow.recipientEmail ||
      !parsedRow.occupation ||
      !parsedRow.date
    ) {
      throw new Error(`CSV row ${i + 1} is missing one or more required values.`);
    }

    rows.push(parsedRow);
  }

  return rows;
}
