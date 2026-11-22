// Zentrale Daten von Rama Blue. Überall nutzbar mit: import { site } from "@/config/site"
// Wird u. a. im Impressum und in den Metadaten verwendet.
//
// TODO: Alle Werte in [eckigen Klammern] durch die echten Daten ersetzen,
// bevor die Seite online geht. Bitte genau so schreiben, wie es im Handelsregister steht.

export const site = {
  name: "Rama Blue",
  tagline: "Royal Thai Cuisine",
  description: "Rama Blue – Royal Thai Cuisine. Bald für euch geöffnet.",

  company: {
    /** Vollständige Firma inkl. Rechtsform, wie im Handelsregister */
    legalName: "[Firmenname] GmbH",
    /** Vertretungsberechtigte Geschäftsführer (bei mehreren: alle aufführen) */
    managingDirectors: ["[Vorname Nachname]"],
  },

  address: {
    street: "[Straße Hausnummer]",
    zip: "[PLZ]",
    city: "[Ort]",
    country: "Deutschland",
  },

  contact: {
    /** Für die Anzeige, z. B. "+49 30 1234567" */
    phone: "[+49 …]",
    email: "[kontakt@…]",
  },

  register: {
    /** z. B. "Amtsgericht Berlin-Charlottenburg" */
    court: "[Amtsgericht …]",
    /** z. B. "HRB 123456" */
    number: "[HRB …]",
  },

  /** Umsatzsteuer-Identifikationsnummer nach § 27a UStG, null wenn (noch) keine vorhanden */
  vatId: "[DE…]" as string | null,
} as const;

export type Site = typeof site;
