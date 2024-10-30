import { type Metadata } from "next";
import "~/styles/globals.css";
import { museo } from "~/assets/fonts";
import { DashboardHeader } from "~/components/global/header";
import { DashboardFooter } from "~/components/global/footer";
import { NotificationProvider, Notifications } from "~/components/global/notifications";

export const metadata: Metadata = {
  title: "Placeholder Crow",
  description: "A solution for issuing verifiable credentials.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      nositelinkssearchbox: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NotificationProvider>
      <html lang="en">
        <body
          className={`bg-neutral-1 text-base text-neutral-5 ${museo.variable} font-sans font-light`}
        >
          <DashboardHeader />
            <Notifications />
            {children}
          <DashboardFooter />
        </body>
      </html>
    </NotificationProvider>
  );
}
