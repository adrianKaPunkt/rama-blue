import type { Metadata } from "next";
import { Impressum } from "@/components/legal/impressum";
import { LegalPage } from "@/components/legal/legal-page";
import { site } from "@/config/site";

// Eigene Seite für /impressum: bei direktem Aufruf, Neuladen und für Suchmaschinen.
// Ein Klick auf den Impressum-Link öffnet stattdessen das Modal (app/@modal/(.)impressum).
export const metadata: Metadata = {
  title: `Impressum – ${site.name}`,
};

export default function ImpressumPage() {
  return (
    <LegalPage>
      <Impressum />
    </LegalPage>
  );
}
