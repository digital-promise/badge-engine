import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import type { PluginUtils } from "tailwindcss/types/config";
import typography from "@tailwindcss/typography";
import { type DesignToken } from "style-dictionary/types";

import styleDictionary from "./style-dictionary/dist/tokens.js";

/**
 * A recursive generator function to flatten a Style Dictionary JS module
 *
 * @param tokenObj A DesignToken, or an object the starts a new level in the token path.
 * @param pathOffset Number of elements in the token's path to remove from its final name. Defaults to 1.
 */
const flattenTokens = function* (
  tokenObj: DesignToken | Object,
  pathOffset = 1,
): Generator<[string, string]> {
  let tokens = Object.values(tokenObj);

  for (let token of tokens) {
    if (token.path) {
      yield [token.path.slice(pathOffset).join("-"), token.value];
    } else {
      yield* flattenTokens(Object.values(token));
    }
  }
};

const colors = Object.fromEntries(flattenTokens(styleDictionary.color));
const spacing = Object.fromEntries(
  flattenTokens(styleDictionary.size.spacing, 2),
);

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    colors,
    spacing,
    fontSize: {
      sm: ["0.875rem", "1rem"],
      base: ["1rem", "1.5rem"],
      md: ["1.25rem", "1.5rem"],
      lg: ["1.5rem", "2rem"],
      xl: ["2rem", "3rem"],
      "2xl": ["3rem", "4rem"],
      "3xl": ["4rem", "5rem"],
    },
    extend: {
      typography: ({ theme }: PluginUtils) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.neutral-5"),
            "--tw-prose-headings": theme("colors.neutral-5"),
            "--tw-prose-links": theme("colors.blue-4"),
            "--tw-prose-counters": theme("colors.neutral-5"),
            "--tw-prose-bullets": theme("colors.neutral-5"),
            a: {
              "&:hover": {
                color: theme("colors.blue-5"),
              },
            },
            h2: {
              fontSize: theme("fontSize.lg"),
              fontWeight: 600,
            },
            h3: {
              fontSize: theme("fontSize.md"),
              fontWeight: 400,
            },
            li: {
              marginTop: theme("spacing.1"),
              marginBottom: 0,
            },
            "ol > li": {
              paddingInlineStart: 0,
            },
            "ul > li": {
              paddingInlineStart: 0,
            },
          },
        },
      }),
      fontFamily: {
        sans: ["var(--font-museo)", ...fontFamily.sans],
        icon: "var(--dpg-icons)",
      },
    },
  },
  plugins: [typography],
} satisfies Config;
