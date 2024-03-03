import QueryProvider from "@/providers/QueryProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ContextProvider from "@/providers/ContextProvider";
import AlertContainer from "@/components/alerts/AlertContainer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/router";
import { Suspense } from "react";
import Loading from "./loading";
import NextTopLoader from "nextjs-toploader";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KIFGO",
  description: "lorem ipsum dolor.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <SpeedInsights />
      <Analytics />

      <ContextProvider>
        <QueryProvider>
          <body className={`overflow-hidden`}>
            <NextTopLoader
              color="#cd0a5d"
              zIndex={99999999999999999}
              crawl={true}
              showSpinner={false}
              height={4}
            />
            <Suspense fallback={<Loading />}>
              <div className="relative z-[9999999999999999999]">
                <AlertContainer />
              </div>
              <div
                id="global-modal-container"
                className="relative z-[9999999999999999]"
              ></div>
              <div
                id="global-menu-container"
                className="relative z-[9999999999999999]"
              ></div>
              <div
                id="global-select-container"
                className="relative z-[999999999999999999]"
              ></div>
              <div className="">{children}</div>
            </Suspense>
          </body>
        </QueryProvider>
      </ContextProvider>
    </html>
  );
}
