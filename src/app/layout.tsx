import { type Metadata } from "next";
import { DashboardHeader } from "~/components/global/header";
import { DashboardFooter } from "~/components/global/footer";
import { NotificationProvider } from "~/providers/notification-provider";
import { Notifications } from "~/components/global/notifications";
import "~/styles/globals.css";
import { museo } from "~/assets/fonts";

export const metadata: Metadata = {
  title: "Badge Engine",
  description: "A solution for issuing verifiable credentials.",
  icons: [{ rel: "icon", url: "/badge-engine-icon.svg" }],
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
