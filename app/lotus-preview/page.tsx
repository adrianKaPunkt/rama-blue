import type { Metadata } from "next";
import Image from "next/image";
import { Logo } from "@/components/logo/logo";
import { Lotus } from "@/components/logo/lotus";
import { Wordmark } from "@/components/logo/wordmark";

// Temporäre Vorschau der Logo-Komponenten. Kann gelöscht werden, sobald alles sitzt.
export const metadata: Metadata = {
  title: "Logo – Vorschau",
  robots: { index: false, follow: false },
};

const SHADOW = "drop-shadow-[2px_4px_4px_rgb(0_0_0/0.6)]";

export default function LogoPreview() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Wie im Entwurf: komplettes Logo in Gold auf dem Hintergrund */}
      <section className="relative flex min-h-svh items-center justify-center overflow-hidden bg-midnight px-4">
        <Image src="/background.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        <Logo variant="gold" animated className={`relative h-auto w-full max-w-xl ${SHADOW}`} />
      </section>

      {/* Einzelteile in Gold */}
      <section className="relative flex flex-col items-center justify-center gap-12 overflow-hidden bg-midnight px-4 py-20">
        <Image src="/background.jpg" alt="" fill sizes="100vw" className="object-cover" />
        <div className="relative flex items-end gap-10">
          <Lotus variant="gold" animated className={`h-32 w-auto ${SHADOW}`} />
          <Lotus variant="gold" className={`h-16 w-auto ${SHADOW}`} />
          <Lotus variant="gold" animated className="h-8 w-auto" />
        </div>
        <Wordmark variant="gold" animated className={`relative h-auto w-full max-w-lg ${SHADOW}`} />
        <Wordmark variant="gold" animated tagline={false} className={`relative h-auto w-full max-w-xs ${SHADOW}`} />
      </section>

      {/* Einfarbig, wie das Original-Logo */}
      <section className="flex flex-col items-center justify-center gap-12 bg-cream px-4 py-20">
        <Logo
          className="h-auto w-full max-w-md text-navy"
          lotusClassName="text-wine"
          taglineClassName="text-wine"
        />
        <div className="flex items-end gap-10">
          <Lotus className="h-16 w-auto text-wine" />
          <Lotus className="h-16 w-auto text-navy" />
          <Wordmark tagline={false} className="h-8 w-auto text-navy" />
        </div>
      </section>
    </main>
  );
}
