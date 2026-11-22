"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Modal auf Basis des nativen <dialog>: Escape, Fokus-Führung und Barrierefreiheit
 * kommen vom Browser. Gesteuert über open/onClose; jede Art des Schließens
 * (Escape, ×, Klick auf den Hintergrund) landet in onClose.
 */
export function Modal({
  open,
  onClose,
  labelledBy,
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy?: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      onClose={onClose}
      // Klick auf den abgedunkelten Hintergrund (außerhalb des Inhalts) schließt das Modal.
      onClick={(e) => e.target === e.currentTarget && close()}
      className={[
        "m-auto max-h-[85svh] w-[min(100%-2rem,36rem)] overflow-y-auto border border-champagne/30 bg-midnight p-0 text-left text-base tracking-normal text-cream normal-case shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm",
        // Schmale Scrollleiste in Champagnergold auf transparenter Spur.
        // Standard (Chrome, Edge, Firefox): Tailwinds eigene Scrollbar-Klassen (scrollbar-width / scrollbar-color)
        "scrollbar-thin scrollbar-thumb-champagne/45 scrollbar-track-transparent",
        // Safari: ::-webkit-scrollbar (wird von den anderen ignoriert, sobald scrollbar-color gesetzt ist)
        "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-champagne/45 [&::-webkit-scrollbar-thumb:hover]:bg-champagne/70",
      ].join(" ")}
    >
      <div className="relative p-8 sm:p-10">
        <button
          type="button"
          onClick={close}
          aria-label="Schließen"
          className="absolute top-4 right-4 flex size-10 items-center justify-center text-2xl text-champagne/80 transition-colors hover:text-champagne cursor-pointer"
        >
          ×
        </button>
        {children}
      </div>
    </dialog>
  );
}
