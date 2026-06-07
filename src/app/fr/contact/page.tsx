import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";
import { ContactBreadcrumbs } from "@/components/contact/breadcrumbs";
import { ContactSection } from "@/components/contact/contact-section";
import { LogoStrip } from "@/components/logo-strip";
import { ContactNumbersSection } from "@/components/contact/numbers-section";
import { ContactCtaSection } from "@/components/contact/cta-section";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/site-config";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contactez-nous – Maroc 360 Agency",
  description:
    "Parlez-nous de votre projet. Nous répondons généralement sous 24 heures.",
};

export default function ContactPage() {
  const dict = getDict("fr");
  const url = absoluteUrl("/fr/contact");
  const schema = webPageSchema({
    id: `${url}#webpage`,
    name: metadata.title as string,
    description: metadata.description as string,
    url,
    inLanguage: "fr",
    type: "ContactPage",
  });
  const crumbs = breadcrumbSchema([
    { name: "Accueil", item: absoluteUrl("/fr") },
    { name: "Contact", item: url },
  ]);
  return (
    <>
      <Navbar dict={dict.nav} locale="fr" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <ContactBreadcrumbs dict={dict.contact} locale="fr" />
        <ContactSection dict={dict.contact} />
        <LogoStrip
          dict={{ ...dict.home.logoStrip, heading: dict.contact.logoStripHeading }}
          baseBlogHref="/fr/blog"
        />
        <ContactNumbersSection dict={dict.contact} />
        <ContactCtaSection dict={dict.contact} locale="fr" />
      </main>
      <Footer dict={dict.footer} locale="fr" />
      <JsonLd data={schema} />
      <JsonLd data={crumbs} />
    </>
  );
}
