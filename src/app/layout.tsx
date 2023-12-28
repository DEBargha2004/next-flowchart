import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import GlobalAppStateProvider from "@/providers/global-app-state-provider";

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Workflow",
  description: "A workflow manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={``}>
          <GlobalAppStateProvider>{children}</GlobalAppStateProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
