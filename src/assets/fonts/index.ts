import localFont from "next/font/local";

export const museo = localFont({
  variable: "--font-museo",
  src: [
    {
      path: "./museo-300-normal.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./museo-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./museo-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./museo-900-normal.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./museo-300-italic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./museo-500-italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./museo-700-italic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "./museo-900-italic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
});

export const dpgIcons = localFont({
  variable: "--dpg-icons",
  src: "../../../node_modules/@digitalpromise/icons/dist/dpg-icons.woff2",
});
