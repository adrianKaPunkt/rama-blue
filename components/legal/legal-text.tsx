import { Fragment, type ReactNode } from "react";
import { site } from "@/config/site";

/** Gemeinsame Bausteine für Impressum und Datenschutzerklärung. */

export function LegalArticle({
  title,
  titleId,
  children,
}: {
  title: string;
  titleId?: string;
  children: ReactNode;
}) {
  return (
    <article className="space-y-8">
      <h2 id={titleId} className="text-2xl tracking-[0.25em] text-champagne uppercase">
        {title}
      </h2>
      {children}
    </article>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-2">
      <h3 className="text-xs tracking-[0.2em] text-champagne uppercase">{title}</h3>
      <div className="space-y-3 leading-relaxed text-cream/85">{children}</div>
    </section>
  );
}

/** Firma mit vollständiger Anschrift (Straße darf mehrzeilig sein, mit \n getrennt). */
export function CompanyAddress() {
  const { company, address } = site;
  return (
    <p>
      {company.legalName}
      <br />
      {address.street.split("\n").map((line) => (
        <Fragment key={line}>
          {line}
          <br />
        </Fragment>
      ))}
      {address.zip} {address.city}
      <br />
      {address.country}
    </p>
  );
}

export function EmailLink() {
  return (
    <a href={`mailto:${site.contact.email}`} className="underline-offset-4 hover:underline">
      {site.contact.email}
    </a>
  );
}
