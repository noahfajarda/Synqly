import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import "@/app/globals.css";
import { Metadata } from "next";
import { appTitle } from "@/constants";
import "./style.css";

// for SEO customization
export const metadata: Metadata = {
  title: appTitle,
  description: `A Next.js 13 Meta ${appTitle} Application`,
  icons: {
    icon: "/logos/logo.png",
    shortcut: "/logos/app-logo.png",
    apple: "/logos/app-logo.png",
    other: {
      rel: "/logos/logo.png",
      url: "/logos/logo.png",
    },
  },
  manifest: "/manifest.json",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignInUrl="/" afterSignUpUrl="/onboarding">
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <video
            src={
              "https://res.cloudinary.com/fajarda1storage/video/upload/v1701139083/Threads/background/background_cvsygj.mp4"
            }
            autoPlay
            muted
            loop
            className="absolute top-0 -z-10 w-full h-full object-cover"
          />
          <div className="w-full flex md:flex-row flex-col justify-around items-center min-h-screen">
            <div className="md:justify-start justify-center">
              <p className="boujee-text">{appTitle}</p>
              <p className="text-white md:text-start text-center">
                Connect And Sync Uniquely
              </p>
              <p className="created-by text-white md:text-start text-center">
                Created By <span className="created-by boujee-text">Noah</span>
              </p>
            </div>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
