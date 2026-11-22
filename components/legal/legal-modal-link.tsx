"use client";

import Link from "next/link";
import { useState, type MouseEvent, type ReactNode } from "react";
import { Modal } from "@/components/ui/modal";

/**
 * Link zu einem Rechtstext (z. B. /impressum), der den Text per Klick als Modal öffnet.
 * Ohne JavaScript, bei Strg-/Cmd-Klick oder mittlerer Maustaste führt er ganz normal
 * zur eigenen Seite. Der Inhalt (children) wird auf dem Server gerendert.
 *
 * Bewusst ohne Intercepting Routes: Die funktionieren auf Cloudflare (OpenNext) nicht
 * zuverlässig, weil dort die Seiten-Varianten je nach Next-Url-Header vermischt werden.
 */
export function LegalModalLink({
  href,
  label,
  labelledBy,
  className,
  children,
}: {
  href: string;
  label: string;
  labelledBy: string;
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault(); // Link navigiert dann nicht, stattdessen öffnet das Modal
    setOpen(true);
  };

  return (
    <>
      <Link href={href} prefetch={false} onClick={handleClick} className={className}>
        {label}
      </Link>
      <Modal open={open} onClose={() => setOpen(false)} labelledBy={labelledBy}>
        {children}
      </Modal>
    </>
  );
}
