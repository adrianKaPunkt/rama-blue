import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.name} – ${site.tagline}`,
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      // Solange ein Modal offen ist, scrollt die Seite dahinter nicht mit.
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased has-[dialog[open]]:overflow-hidden`}
    >
      <body className="flex min-h-full flex-col bg-midnight font-sans text-cream">
        {children}
      </body>
    </html>
  );
}
