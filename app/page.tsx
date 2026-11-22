import Image from "next/image";
import { Logo } from "@/components/logo/logo";

export default function Home() {
  return (
    <main className="relative flex min-h-svh flex-1 items-center justify-center overflow-hidden px-4 py-16">
      <Image src="/background.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
      <h1 className="relative w-full max-w-xl">
        <Logo
          variant="gold"
          animated
          className="h-auto w-full drop-shadow-[2px_4px_4px_rgb(0_0_0/0.6)]"
        />
      </h1>
    </main>
  );
}
