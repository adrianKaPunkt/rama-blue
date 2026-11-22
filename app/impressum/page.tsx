import type { Metadata } from "next";
import { Impressum } from "@/components/legal/impressum";
import { LegalPage } from "@/components/legal/legal-page";
import { site } from "@/config/site";

// Eigene Seite für /impressum: bei direktem Aufruf, ohne JavaScript und für Suchmaschinen.
// Auf der Startseite öffnet der Impressum-Link den Text stattdessen als Modal (LegalModalLink).
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
