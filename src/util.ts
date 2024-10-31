import { randomUUID } from "crypto";

export const convertFileToDataURL = (blob: Blob): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
};

export const ellipsis = (string: string, length = 160) =>
  string.length < length ? string : string.substring(0, length).trim() + "...";

export const httpProtocol = new RegExp(/^https?:/);

export const anyUrlPattern = new RegExp(
  /^(https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
);

export const uuidUri = () => `urn:uuid:${randomUUID()}`;

export const pascalCaseToSpaced = (string: string) =>
  string.replace(/([A-Z])/g, " $1").trim();

export const capitalize = (s: string | null) =>
  s && s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

export const deepUriToId = (c: object) =>
  Object.fromEntries(
    Object.entries(c).map(([key, value]) => {
      let finalKey = key;
      let finalValue = value as unknown;

      if (key === "uri") finalKey = "id";
      if (Array.isArray(value)) {
        finalValue = value.map((e) =>
          Object(e) === e ? deepUriToId(e as object) : (e as unknown),
        );

        if ((finalValue as Array<unknown>).length === 0) finalValue = null;
      } else if (Object(value) === value) {
        finalValue = deepUriToId(value as object);
      }
      return [finalKey, finalValue ?? undefined];
    }),
  );
