"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Modal für Routen, die per Intercepting Route über der aktuellen Seite geöffnet werden
 * (z. B. /impressum). Nutzt das native <dialog>: Escape, Fokus-Führung und
 * Barrierefreiheit kommen vom Browser. Schließen führt im Verlauf einen Schritt zurück.
 */
export function Modal({ labelledBy, children }: { labelledBy?: string; children: ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      onClose={() => router.back()}
      // Klick auf den abgedunkelten Hintergrund (außerhalb des Inhalts) schließt das Modal.
      onClick={(e) => e.target === e.currentTarget && close()}
      className={[
        "m-auto max-h-[85svh] w-[min(100%-2rem,36rem)] overflow-y-auto border border-champagne/30 bg-midnight p-0 text-cream shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm",
        // Schmale Scrollleiste in Champagnergold auf transparenter Spur.
        // Standard (Chrome, Edge, Firefox): scrollbar-width / scrollbar-color
        "[scrollbar-color:color-mix(in_oklab,var(--color-champagne)_45%,transparent)_transparent] [scrollbar-width:thin]",
        // Safari: ::-webkit-scrollbar (wird von den anderen ignoriert, sobald scrollbar-color gesetzt ist)
        "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-champagne/45 [&::-webkit-scrollbar-thumb:hover]:bg-champagne/70",
      ].join(" ")}
    >
      <div className="relative p-8 sm:p-10">
        <button
          type="button"
          onClick={close}
          aria-label="Schließen"
          className="absolute top-4 right-4 flex size-10 items-center justify-center text-2xl text-champagne/80 transition-colors hover:text-champagne"
        >
          ×
        </button>
        {children}
      </div>
    </dialog>
  );
}
