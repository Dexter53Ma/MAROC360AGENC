import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";
import { ContactBreadcrumbs } from "@/components/contact/breadcrumbs";
import { ContactSection } from "@/components/contact/contact-section";
import { LogoStrip } from "@/components/logo-strip";
import { ContactNumbersSection } from "@/components/contact/numbers-section";
import { ContactCtaSection } from "@/components/contact/cta-section";

export const metadata: Metadata = {
  title: "Get in touch – Maroc 360 Agency",
  description:
    "Tell us about your project. We typically reply within 24 hours.",
};

export default function ContactPage() {
  const dict = getDict("en");
  return (
    <>
      <Navbar dict={dict.nav} locale="en" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <ContactBreadcrumbs />
        <ContactSection />
        <LogoStrip
          dict={{ ...dict.home.logoStrip, heading: dict.contact.logoStripHeading }}
          baseBlogHref="/en/blog"
        />
        <ContactNumbersSection />
        <ContactCtaSection />
      </main>
      <Footer dict={dict.footer} locale="en" />
    </>
  );
}
