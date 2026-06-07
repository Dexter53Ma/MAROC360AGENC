import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";
import { LegalBreadcrumbs } from "@/components/legal/breadcrumbs";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/site-config";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Privacy Policy – Maroc 360 Agency",
  description:
    "How Maroc 360 Agency collects, uses, and protects your personal information.",
};

const sections: LegalSection[] = [
  {
    title: "1. Introduction",
    content: (
      <>
        <p>
          Maroc 360 Agency (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;)
          respects your privacy and is committed to protecting your personal
          data. This privacy policy explains how we collect, use, disclose, and
          safeguard your information when you visit our website or use our
          services.
        </p>
        <p>
          We comply with applicable data protection laws, including Law 09-08
          on the protection of individuals with regard to the processing of
          personal data in Morocco, and the EU General Data Protection
          Regulation (GDPR) where applicable.
        </p>
      </>
    ),
  },
  {
    title: "2. Data we collect",
    content: (
      <>
        <p>We may collect the following categories of personal data:</p>
        <ul>
          <li>
            <strong>Contact data</strong> — name, email address, phone number,
            company name, and job title when you fill out a form or contact us.
          </li>
          <li>
            <strong>Usage data</strong> — IP address, browser type, pages
            visited, time spent on pages, and referring URLs, collected through
            cookies and analytics tools.
          </li>
          <li>
            <strong>Marketing data</strong> — your preferences in receiving
            marketing communications from us.
          </li>
          <li>
            <strong>Client data</strong> — information you provide to us in the
            course of our engagement when you become a client.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "3. How we use your data",
    content: (
      <>
        <p>We use your personal data to:</p>
        <ul>
          <li>Respond to inquiries and provide requested services.</li>
          <li>
            Deliver, operate, and improve our website, marketing, and agency
            services.
          </li>
          <li>
            Send newsletters, case studies, and other marketing communications
            when you have opted in.
          </li>
          <li>
            Comply with legal obligations and enforce our terms of service.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Cookies and analytics",
    content: (
      <>
        <p>
          We use cookies and similar technologies to keep the site running,
          measure performance, and personalize content. You can control cookies
          through your browser settings. Disabling certain cookies may limit
          site functionality.
        </p>
        <p>
          We use privacy-friendly analytics to understand aggregate traffic
          patterns. Where required, we request your consent before setting
          non-essential cookies.
        </p>
      </>
    ),
  },
  {
    title: "5. Sharing your data",
    content: (
      <>
        <p>
          We do not sell your personal data. We may share it with trusted
          service providers (hosting, email, analytics, payment) strictly to
          deliver our services, and only under confidentiality obligations. We
          may also disclose data where required by law.
        </p>
      </>
    ),
  },
  {
    title: "6. Data retention",
    content: (
      <>
        <p>
          We keep personal data only as long as necessary for the purposes
          described in this policy or as required by law. Contact form
          submissions are typically retained for 24 months unless an ongoing
          business relationship requires longer storage.
        </p>
      </>
    ),
  },
  {
    title: "7. Your rights",
    content: (
      <>
        <p>Depending on your location, you have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you.</li>
          <li>Request correction or deletion of your data.</li>
          <li>Object to or restrict certain processing.</li>
          <li>Withdraw consent at any time where processing is consent-based.</li>
          <li>Lodge a complaint with the relevant data protection authority.</li>
        </ul>
      </>
    ),
  },
  {
    title: "8. Security",
    content: (
      <>
        <p>
          We use appropriate technical and organizational measures to protect
          your personal data. However, no method of transmission over the
          Internet is 100% secure, and we cannot guarantee absolute security.
        </p>
      </>
    ),
  },
  {
    title: "9. Children&apos;s privacy",
    content: (
      <>
        <p>
          Our services are not directed to children under 16, and we do not
          knowingly collect personal data from them.
        </p>
      </>
    ),
  },
  {
    title: "10. Changes to this policy",
    content: (
      <>
        <p>
          We may update this policy from time to time. The latest version is
          always available on this page, with the &ldquo;Last updated&rdquo;
          date reflecting the most recent revision.
        </p>
      </>
    ),
  },
  {
    title: "11. Contact us",
    content: (
      <>
        <p>
          For any questions about this policy or to exercise your rights, email
          us at{" "}
          <a href="mailto:Contact@maroc360.agency">Contact@maroc360.agency</a> or
          use the contact form on our{" "}
          <a href="/en/contact">contact page</a>.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  const dict = getDict("en");
  const url = absoluteUrl("/en/privacy");
  const schema = webPageSchema({
    id: `${url}#webpage`,
    name: metadata.title as string,
    description: metadata.description as string,
    url,
    inLanguage: "en",
    type: "WebPage",
  });
  const crumbs = breadcrumbSchema([
    { name: "Home", item: absoluteUrl("/en") },
    { name: "Privacy Policy", item: url },
  ]);
  return (
    <>
      <Navbar dict={dict.nav} locale="en" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <LegalBreadcrumbs current="Privacy" href="/en/privacy" />
        <LegalPage
          title="Privacy Policy"
          intro="This privacy policy explains how Maroc 360 Agency handles your personal data — what we collect, why we collect it, and the choices you have."
          updated="June 4, 2026"
          sections={sections}
        />
      </main>
      <Footer dict={dict.footer} locale="en" />
      <JsonLd data={schema} />
      <JsonLd data={crumbs} />
    </>
  );
}
