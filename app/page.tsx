import Image from "next/image";
import { Datenschutz } from "@/components/legal/datenschutz";
import { Impressum } from "@/components/legal/impressum";
import { LegalModalLink } from "@/components/legal/legal-modal-link";
import { Logo } from "@/components/logo/logo";

export default function Home() {
  return (
    <main className="relative flex min-h-svh flex-1 flex-col items-center justify-center overflow-hidden px-4 py-16">
      <Image src="/background.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
      {/* Türkiser Lichtschleier: färbt die Wand von oben her sanft ein und schwillt langsam
          an und ab (animate-tide). mix-blend-color übernimmt nur den Farbton, die Textur
          bleibt erhalten. Animiert wird nur die Deckkraft – das läuft auf der Grafikkarte. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 animate-tide bg-[radial-gradient(ellipse_90%_75%_at_50%_0%,color-mix(in_oklab,var(--color-turquoise)_55%,transparent)_0%,transparent_100%)] opacity-0 mix-blend-color motion-reduce:animate-none"
      />
      <h1 className="relative w-full max-w-xl">
        <Logo
          variant="gold"
          animated
          intro
          spin
          className="h-auto w-full drop-shadow-[2px_4px_4px_rgb(0_0_0/0.6)]"
        />
      </h1>

      {/* Blendet nach dem Logo-Intro ein (Tailwind starting: = CSS @starting-style, kein JavaScript).
          pl-[0.5em] gleicht die Laufweite hinter dem letzten Buchstaben aus, damit der Text mittig sitzt. */}
      <p className="relative mt-10 bg-linear-to-b from-[#f5dcc0] to-[#b9875f] bg-clip-text pl-[0.5em] text-sm tracking-[0.5em] text-transparent uppercase drop-shadow-[1px_2px_2px_rgb(0_0_0/0.6)] transition-opacity delay-[2200ms] duration-1000 ease-out starting:opacity-0 motion-reduce:transition-none sm:mt-14 sm:text-base">
        Coming Soon
      </p>

      <footer className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-4 pb-6 text-xs tracking-[0.2em] text-champagne/70 uppercase">
        <LegalModalLink
          href="/impressum"
          label="Impressum"
          labelledBy="impressum-title"
          className="transition-colors hover:text-champagne"
        >
          <Impressum titleId="impressum-title" />
        </LegalModalLink>
        <span aria-hidden="true">·</span>
        <LegalModalLink
          href="/datenschutz"
          label="Datenschutz"
          labelledBy="datenschutz-title"
          className="transition-colors hover:text-champagne"
        >
          <Datenschutz titleId="datenschutz-title" />
        </LegalModalLink>
      </footer>
    </main>
  );
}
