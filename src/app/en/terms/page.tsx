import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";
import { LegalBreadcrumbs } from "@/components/legal/breadcrumbs";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service – Maroc 360 Agency",
  description:
    "The terms and conditions governing your use of the Maroc 360 Agency website and services.",
};

const sections: LegalSection[] = [
  {
    title: "1. Acceptance of terms",
    content: (
      <>
        <p>
          By accessing or using the Maroc 360 Agency website
          (the &ldquo;Site&rdquo;) and the services we provide (the
          &ldquo;Services&rdquo;), you agree to be bound by these Terms of
          Service. If you do not agree, you must not use the Site or the
          Services.
        </p>
      </>
    ),
  },
  {
    title: "2. Eligibility",
    content: (
      <>
        <p>
          You must be at least 18 years old and legally able to enter into a
          binding contract to use our Services. By using the Site, you
          represent that you meet these requirements.
        </p>
      </>
    ),
  },
  {
    title: "3. Use of the site",
    content: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Site for any unlawful purpose or in violation of any applicable laws.</li>
          <li>
            Attempt to gain unauthorized access to any portion of the Site,
            other accounts, or computer systems connected to the Site.
          </li>
          <li>
            Use any robot, spider, or other automated means to access the Site
            for any purpose without our prior written consent.
          </li>
          <li>
            Interfere with or disrupt the Site, its security, or any related
            systems.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Intellectual property",
    content: (
      <>
        <p>
          All content on the Site — including text, graphics, logos, images,
          illustrations, code, and software — is the property of Maroc 360
          Agency or its licensors and is protected by Moroccan and
          international copyright and trademark laws.
        </p>
        <p>
          You may view and download a single copy of materials on the Site for
          personal, non-commercial use, provided you retain all copyright and
          proprietary notices. Any other use requires our prior written
          permission.
        </p>
      </>
    ),
  },
  {
    title: "5. User submissions",
    content: (
      <>
        <p>
          When you submit information, feedback, or materials to us (for
          example, through a contact form or email), you grant us a
          non-exclusive, royalty-free, worldwide license to use that content
          for the purpose of operating, evaluating, and improving our
          Services, provided we do so in accordance with our{" "}
          <a href="/en/privacy">Privacy Policy</a>.
        </p>
      </>
    ),
  },
  {
    title: "6. Services and engagements",
    content: (
      <>
        <p>
          Specific services are governed by a separate written agreement
          between Maroc 360 Agency and the client. In case of conflict between
          these Terms and a signed engagement letter or statement of work, the
          engagement letter or statement of work prevails.
        </p>
      </>
    ),
  },
  {
    title: "7. Third-party links",
    content: (
      <>
        <p>
          The Site may contain links to third-party websites we do not control.
          We are not responsible for the content, policies, or practices of
          those websites and encourage you to review their terms.
        </p>
      </>
    ),
  },
  {
    title: "8. Disclaimers",
    content: (
      <>
        <p>
          The Site and its content are provided on an &ldquo;as is&rdquo; and
          &ldquo;as available&rdquo; basis without warranties of any kind,
          either express or implied, including but not limited to warranties of
          merchantability, fitness for a particular purpose, or
          non-infringement.
        </p>
      </>
    ),
  },
  {
    title: "9. Limitation of liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by law, Maroc 360 Agency shall not
          be liable for any indirect, incidental, special, consequential, or
          punitive damages, or any loss of profits or revenues, whether
          incurred directly or indirectly, or any loss of data, use, or
          goodwill, resulting from your use of the Site.
        </p>
      </>
    ),
  },
  {
    title: "10. Indemnification",
    content: (
      <>
        <p>
          You agree to indemnify and hold Maroc 360 Agency, its affiliates,
          and their respective officers, directors, and employees harmless
          from any claim, demand, loss, or expense arising out of your breach
          of these Terms or your use of the Site.
        </p>
      </>
    ),
  },
  {
    title: "11. Termination",
    content: (
      <>
        <p>
          We may suspend or terminate your access to the Site at any time,
          without notice, for conduct that we believe violates these Terms or
          is otherwise harmful to other users, us, or third parties.
        </p>
      </>
    ),
  },
  {
    title: "12. Governing law",
    content: (
      <>
        <p>
          These Terms are governed by the laws of the Kingdom of Morocco. Any
          dispute arising from or related to these Terms shall be subject to
          the exclusive jurisdiction of the courts of Casablanca, Morocco.
        </p>
      </>
    ),
  },
  {
    title: "13. Changes to these terms",
    content: (
      <>
        <p>
          We may update these Terms from time to time. The latest version is
          always available on this page, with the &ldquo;Last updated&rdquo;
          date reflecting the most recent revision. Continued use of the Site
          after changes constitutes acceptance of the new Terms.
        </p>
      </>
    ),
  },
  {
    title: "14. Contact us",
    content: (
      <>
        <p>
          If you have any questions about these Terms, email us at{" "}
          <a href="mailto:hello@maroc360.agency">hello@maroc360.agency</a> or
          use the contact form on our{" "}
          <a href="/en/contact">contact page</a>.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar dict={getDict("en").nav} locale="en" multiStepForm={getDict("en").multiStepForm} />
      <main id="main" tabIndex={-1}>
        <LegalBreadcrumbs current="Terms" href="/en/terms" />
        <LegalPage
          title="Terms of Service"
          intro="These terms govern your use of the Maroc 360 Agency website. By using the site, you agree to the terms below."
          updated="June 4, 2026"
          sections={sections}
        />
      </main>
      <Footer dict={getDict("en").footer} locale="en" />
    </>
  );
}
