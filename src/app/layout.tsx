import type { Metadata } from "next";
import {
  ClerkProvider,
  
} from '@clerk/nextjs'
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Classy Web Chat",
  description: "Send instand message",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
        {/* <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn> */}
        {children}
        </body>
      </html>
     </ClerkProvider>
  );
}
