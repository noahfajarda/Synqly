import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import "@/app/globals.css";
import { Metadata } from "next";
import { appTitle } from "@/constants";
import "./style.css"

// for SEO customization
export const metadata: Metadata = {
  title: appTitle,
  description: `A Next.js 13 Meta ${appTitle} Application`,
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
          <div className="w-full flex flex-col justify-center items-center min-h-screen">
            <p className="text-heading1-bold boujee-text">
              {appTitle}
            </p>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
