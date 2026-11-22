import { site } from "@/config/site";
import { CompanyAddress, EmailLink, LegalArticle, LegalSection } from "./legal-text";

/** Inhalt des Impressums (Angaben nach § 5 DDG). Liest alle Daten aus config/site.ts. */
export function Impressum({ titleId }: { titleId?: string }) {
  const { company, register, vatId } = site;

  return (
    <LegalArticle title="Impressum" titleId={titleId}>
      <LegalSection title="Angaben gemäß § 5 DDG">
        <CompanyAddress />
      </LegalSection>

      <LegalSection title="Vertreten durch">
        <p>Geschäftsführung: {company.managingDirectors.join(", ")}</p>
      </LegalSection>

      <LegalSection title="Kontakt">
        <p>
          {/* Telefon:{" "}
          <a href={`tel:${site.contact.phone.replace(/[^\d+]/g, "")}`} className="underline-offset-4 hover:underline">
            {site.contact.phone}
          </a>
          <br /> */}
          E-Mail: <EmailLink />
        </p>
      </LegalSection>

      <LegalSection title="Registereintrag">
        <p>
          Eintragung im Handelsregister
          <br />
          Registergericht: {register.court}
          <br />
          Registernummer: {register.number}
        </p>
      </LegalSection>

      {vatId && (
        <LegalSection title="Umsatzsteuer-ID">
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
            <br />
            {vatId}
          </p>
        </LegalSection>
      )}

      <LegalSection title="Verbraucherstreitbeilegung">
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </LegalSection>
    </LegalArticle>
  );
}
