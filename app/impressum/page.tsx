import type { Metadata } from "next";
import Link from "next/link";
import { Impressum } from "@/components/legal/impressum";
import { site } from "@/config/site";

// Eigene Seite für /impressum: bei direktem Aufruf, Neuladen und für Suchmaschinen.
// Ein Klick auf den Impressum-Link öffnet stattdessen das Modal (app/@modal/(.)impressum).
export const metadata: Metadata = {
  title: `Impressum – ${site.name}`,
};

export default function ImpressumPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-16 sm:py-24">
      <Link
        href="/"
        className="mb-12 inline-block text-xs tracking-[0.2em] text-champagne/80 uppercase transition-colors hover:text-champagne"
      >
        ← Zur Startseite
      </Link>
      <Impressum />
    </main>
  );
}
