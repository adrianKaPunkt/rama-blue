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

      <footer className="absolute inset-x-0 bottom-0 flex justify-center pb-6">
        <Link
          href="/impressum"
          className="text-xs tracking-[0.2em] text-champagne/70 uppercase transition-colors hover:text-champagne"
        >
          Impressum
        </Link>
      </footer>
    </main>
  );
}
