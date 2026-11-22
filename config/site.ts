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
    legalName: "Rama Blue GmbH",
    /** Vertretungsberechtigte Geschäftsführer (bei mehreren: alle aufführen) */
    managingDirectors: ["Astrit Hajzeraj"],
  },

  address: {
    street: "Four Frankfurt\nDistrikt Marquet\nJunghofstraße 5",
    zip: "60315",
    city: "Frankfurt am Main",
    country: "Deutschland",
  },

  contact: {
    /** Für die Anzeige, z. B. "+49 30 1234567" */
    phone: "[+49 …]",
    email: "info@ramablue.de",
  },

  register: {
    /** z. B. "Amtsgericht Berlin-Charlottenburg" */
    court: "Amtsgericht Frankfurt am Main",
    /** z. B. "HRB 123456" */
    number: "HRB145403",
  },

  /**
   * Umsatzsteuer-Identifikationsnummer nach § 27a UStG.
   * "beantragt", solange sie noch nicht zugeteilt ist; danach die Nummer eintragen (z. B. "DE123456789").
   * null blendet den Abschnitt im Impressum ganz aus.
   */
  vatId: "beantragt" as string | null,

  /** Angaben für die Datenschutzerklärung */
  privacy: {
    /** Datum der letzten Änderung der Datenschutzerklärung */
    updated: "November 2026",
    hosting: {
      name: "Vercel Inc.",
      address: "340 S Lemon Ave #4133, Walnut, CA 91789, USA",
      /**
       * Anbieter sitzt in den USA: blendet in der Datenschutzerklärung den Absatz zur
       * Übermittlung in die USA ein (EU-US Data Privacy Framework + Standardvertragsklauseln).
       * Bei einem Hoster in der EU auf false setzen.
       */
      transfersToUsa: true,
    },
    /** Nach wie vielen Tagen der Hoster die Server-Logfiles löscht (steht im Vertrag bzw. AV-Vertrag) */
    logRetentionDays: "30",
    /** Zuständige Aufsichtsbehörde (Sitz der GmbH in Hessen) */
    supervisoryAuthority: {
      name: "Der Hessische Beauftragte für Datenschutz und Informationsfreiheit",
      address: "Gustav-Stresemann-Ring 1, 65189 Wiesbaden",
    },
  },
} as const;

export type Site = typeof site;
