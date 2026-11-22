import type { Metadata } from "next";
import { Datenschutz } from "@/components/legal/datenschutz";
import { LegalPage } from "@/components/legal/legal-page";
import { site } from "@/config/site";

// Eigene Seite für /datenschutz: bei direktem Aufruf, ohne JavaScript und für Suchmaschinen.
// Auf der Startseite öffnet der Datenschutz-Link den Text stattdessen als Modal (LegalModalLink).
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
