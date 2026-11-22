import Link from "next/link";
import type { ReactNode } from "react";

/** Rahmen für Rechtstexte als eigene Seite (bei direktem Aufruf statt Modal). */
export function LegalPage({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-16 sm:py-24">
      <Link
        href="/"
        className="mb-12 inline-block text-xs tracking-[0.2em] text-champagne/80 uppercase transition-colors hover:text-champagne"
      >
        ← Zur Startseite
      </Link>
      {children}
    </main>
  );
}
