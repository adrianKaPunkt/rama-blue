import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/logo/logo";

export default function Home() {
  return (
    <main className="relative flex min-h-svh flex-1 flex-col items-center justify-center overflow-hidden px-4 py-16">
      <Image src="/background.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
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
        <Link href="/impressum" className="transition-colors hover:text-champagne">
          Impressum
        </Link>
        <span aria-hidden="true">·</span>
        <Link href="/datenschutz" className="transition-colors hover:text-champagne">
          Datenschutz
        </Link>
      </footer>
    </main>
  );
}
