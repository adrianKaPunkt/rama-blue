import type { Metadata } from "next";
import { Datenschutz } from "@/components/legal/datenschutz";
import { LegalPage } from "@/components/legal/legal-page";
import { site } from "@/config/site";

// Eigene Seite für /datenschutz: bei direktem Aufruf, Neuladen und für Suchmaschinen.
// Ein Klick auf den Datenschutz-Link öffnet stattdessen das Modal (app/@modal/(.)datenschutz).
export const metadata: Metadata = {
  title: `Datenschutz – ${site.name}`,
};

export default function DatenschutzPage() {
  return (
    <LegalPage>
      <Datenschutz />
    </LegalPage>
  );
}
