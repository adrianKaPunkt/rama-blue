import { site } from "@/config/site";
import { CompanyAddress, EmailLink, LegalArticle, LegalSection } from "./legal-text";

/**
 * Inhalt der Datenschutzerklärung. Liest alle Daten aus config/site.ts.
 * Stand: Ankündigungsseite ohne Cookies, Tracking, Formulare oder Inhalte Dritter.
 * Kommen solche Funktionen dazu (z. B. Kontaktformular, Karte, Analyse), muss der Text ergänzt werden.
 */
export function Datenschutz({ titleId }: { titleId?: string }) {
  const { privacy } = site;

  return (
    <LegalArticle title="Datenschutz" titleId={titleId}>
      <LegalSection title="Verantwortlicher">
        <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
        <CompanyAddress />
        <p>
          E-Mail: <EmailLink />
        </p>
      </LegalSection>

      <LegalSection title="Überblick">
        <p>
          Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Diese Website ist derzeit eine
          Ankündigungsseite. Wir setzen keine Cookies, verwenden keine Analyse- oder Tracking-Dienste
          und binden keine Inhalte von Drittanbietern ein. Schriftarten und Bilder werden direkt von
          unserem Server geladen; beim Besuch der Seite werden keine Verbindungen zu Servern Dritter
          (etwa Google) aufgebaut.
        </p>
      </LegalSection>

      <LegalSection title="Hosting und Server-Logfiles">
        <p>
          Diese Website wird bei {privacy.hosting.name}, {privacy.hosting.address} gehostet. Beim
          Aufruf der Seite erfasst der Server automatisch Informationen, die Ihr Browser übermittelt
          (Server-Logfiles):
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>IP-Adresse des anfragenden Geräts</li>
          <li>Datum und Uhrzeit des Zugriffs</li>
          <li>aufgerufene Seite bzw. Datei</li>
          <li>zuvor besuchte Seite (Referrer-URL)</li>
          <li>verwendeter Browser und Betriebssystem</li>
          <li>übertragene Datenmenge und Statuscode</li>
        </ul>
        <p>
          Diese Daten werden benötigt, um die Website auszuliefern, ihre Stabilität und Sicherheit zu
          gewährleisten und Fehler zu analysieren. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO;
          unser berechtigtes Interesse liegt im sicheren und fehlerfreien Betrieb der Website. Die
          Logfiles werden nach {privacy.logRetentionDays} Tagen gelöscht, sofern sie nicht zur
          Aufklärung eines Sicherheitsvorfalls länger benötigt werden.
        </p>
        <p>
          Mit dem Hosting-Anbieter besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO.
        </p>
      </LegalSection>

      {privacy.hosting.transfersToUsa && (
        <LegalSection title="Datenübermittlung in die USA">
          <p>
            Unser Hosting-Anbieter {privacy.hosting.name} hat seinen Sitz in den USA. Dabei können
            personenbezogene Daten, insbesondere die oben genannten Server-Logfiles, in die USA
            übermittelt und dort verarbeitet werden.
          </p>
          <p>
            {privacy.hosting.name} ist nach dem EU-US Data Privacy Framework (DPF) zertifiziert. Für
            zertifizierte Unternehmen hat die Europäische Kommission mit ihrem Angemessenheitsbeschluss
            vom 10. Juli 2023 ein angemessenes Datenschutzniveau festgestellt (Art. 45 DSGVO).
            Ergänzend stützt sich die Übermittlung auf die Standardvertragsklauseln der Europäischen
            Kommission (Art. 46 Abs. 2 lit. c DSGVO), die Bestandteil des Vertrags zur
            Auftragsverarbeitung sind.
          </p>
        </LegalSection>
      )}

      <LegalSection title="Kontakt per E-Mail">
        <p>
          Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir Ihre Angaben (z. B. Name,
          E-Mail-Adresse und Inhalt der Nachricht), um Ihre Anfrage zu beantworten. Rechtsgrundlage
          ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage mit einem Vertrag oder dessen
          Anbahnung zusammenhängt (z. B. eine Reservierung), andernfalls Art. 6 Abs. 1 lit. f DSGVO.
          Wir löschen die Daten, sobald sie für die Bearbeitung nicht mehr erforderlich sind und
          keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>
      </LegalSection>

      <LegalSection title="SSL- bzw. TLS-Verschlüsselung">
        <p>
          Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine
          verschlüsselte Verbindung erkennen Sie an „https://“ in der Adresszeile Ihres Browsers.
        </p>
      </LegalSection>

      <LegalSection title="Ihre Rechte">
        <p>Sie haben jederzeit das Recht auf:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
        </ul>
        <p>
          Wenden Sie sich dafür einfach per E-Mail an <EmailLink />.
        </p>
      </LegalSection>

      <LegalSection title="Beschwerderecht">
        <p>
          Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77
          DSGVO). Für uns zuständig ist:
        </p>
        <p>
          {privacy.supervisoryAuthority.name}
          <br />
          {privacy.supervisoryAuthority.address}
        </p>
      </LegalSection>

      <p className="text-sm text-cream/60">Stand: {privacy.updated}</p>
    </LegalArticle>
  );
}
