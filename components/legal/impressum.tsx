import type { ReactNode } from "react";
import { site } from "@/config/site";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-2">
      <h3 className="text-xs tracking-[0.2em] text-champagne uppercase">{title}</h3>
      <div className="leading-relaxed text-cream/85">{children}</div>
    </section>
  );
}

/** Inhalt des Impressums (Angaben nach § 5 DDG). Liest alle Daten aus config/site.ts. */
export function Impressum({ titleId }: { titleId?: string }) {
  const { company, address, contact, register, vatId } = site;

  return (
    <article className="space-y-8">
      <h2 id={titleId} className="text-2xl tracking-[0.25em] text-champagne uppercase">
        Impressum
      </h2>

      <Section title="Angaben gemäß § 5 DDG">
        <p>
          {company.legalName}
          <br />
          {address.street}
          <br />
          {address.zip} {address.city}
          <br />
          {address.country}
        </p>
      </Section>

      <Section title="Vertreten durch">
        <p>Geschäftsführung: {company.managingDirectors.join(", ")}</p>
      </Section>

      <Section title="Kontakt">
        <p>
          Telefon:{" "}
          <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="underline-offset-4 hover:underline">
            {contact.phone}
          </a>
          <br />
          E-Mail:{" "}
          <a href={`mailto:${contact.email}`} className="underline-offset-4 hover:underline">
            {contact.email}
          </a>
        </p>
      </Section>

      <Section title="Registereintrag">
        <p>
          Eintragung im Handelsregister
          <br />
          Registergericht: {register.court}
          <br />
          Registernummer: {register.number}
        </p>
      </Section>

      {vatId && (
        <Section title="Umsatzsteuer-ID">
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
            <br />
            {vatId}
          </p>
        </Section>
      )}

      <Section title="Verbraucherstreitbeilegung">
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </Section>
    </article>
  );
}
