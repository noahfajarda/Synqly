import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import TopBar from "@/components/shared/TopBar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import BottomBar from "@/components/shared/BottomBar";
import { appTitle } from "@/constants";

const inter = Inter({ subsets: ["latin"] });

// for SEO customization
export const metadata: Metadata = {
  title: appTitle,
  description: `A Next.js 13 Meta ${appTitle} Application`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // clerk provider wrapper for authentication
    <ClerkProvider>
      <html lang="en">
        <body className={"overscroll-none " + inter.className}>
          <TopBar />
          <main className="flex flex-row">
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RightSidebar />
          </main>
          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  );
}
