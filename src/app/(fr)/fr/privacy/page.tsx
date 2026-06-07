import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";
import { LegalBreadcrumbs } from "@/components/legal/breadcrumbs";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/site-config";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { pageAlternates } from "@/lib/metadata-helpers";

export const metadata: Metadata = {
  title: "Politique de confidentialité – Maroc 360 Agency",
  description:
    "Comment Maroc 360 Agency collecte, utilise et protège vos données personnelles.",
  alternates: pageAlternates({ path: "/fr/privacy" }),
};

const sections: LegalSection[] = [
  {
    title: "1. Introduction",
    content: (
      <>
        <p>
          Maroc 360 Agency (&laquo;&nbsp;nous&nbsp;&raquo;, &laquo;&nbsp;notre&nbsp;&raquo;,
          &laquo;&nbsp;nos&nbsp;&raquo;) respecte votre vie privée et s&apos;engage à protéger vos
          données personnelles. La présente politique de confidentialité explique comment nous
          collectons, utilisons, divulguons et protégeons vos informations lorsque vous visitez
          notre site web ou utilisez nos services.
        </p>
        <p>
          Nous nous conformons aux lois applicables en matière de protection des données,
          notamment la loi 09-08 relative à la protection des personnes physiques à l&apos;égard
          du traitement des données à caractère personnel au Maroc, et le Règlement général
          européen sur la protection des données (RGPD) lorsqu&apos;il s&apos;applique.
        </p>
      </>
    ),
  },
  {
    title: "2. Données que nous collectons",
    content: (
      <>
        <p>Nous pouvons collecter les catégories de données personnelles suivantes&nbsp;:</p>
        <ul>
          <li>
            <strong>Données de contact</strong> — nom, adresse email, numéro de téléphone, nom
            de l&apos;entreprise et fonction lorsque vous remplissez un formulaire ou nous
            contactez.
          </li>
          <li>
            <strong>Données d&apos;usage</strong> — adresse IP, type de navigateur, pages
            visitées, temps passé sur les pages et URL de provenance, collectés via des cookies
            et des outils d&apos;analyse.
          </li>
          <li>
            <strong>Données marketing</strong> — vos préférences en matière de communications
            marketing de notre part.
          </li>
          <li>
            <strong>Données clients</strong> — informations que vous nous fournissez dans le
            cadre de notre mission lorsque vous devenez client.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Comment nous utilisons vos données",
    content: (
      <>
        <p>Nous utilisons vos données personnelles pour&nbsp;:</p>
        <ul>
          <li>Répondre à vos demandes et fournir les services sollicités.</li>
          <li>
            Délivrer, exploiter et améliorer notre site web, nos services marketing et notre
            activité d&apos;agence.
          </li>
          <li>
            Envoyer des newsletters, études de cas et autres communications marketing lorsque
            vous y avez consenti.
          </li>
          <li>
            Respecter nos obligations légales et faire appliquer nos conditions d&apos;utilisation.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Cookies et analytique",
    content: (
      <>
        <p>
          Nous utilisons des cookies et des technologies similaires pour faire fonctionner le
          site, mesurer la performance et personnaliser les contenus. Vous pouvez contrôler les
          cookies via les paramètres de votre navigateur. Désactiver certains cookies peut
          limiter certaines fonctionnalités du site.
        </p>
        <p>
          Nous utilisons des outils d&apos;analyse respectueux de la vie privée pour comprendre
          les tendances de trafic agrégées. Lorsque la loi l&apos;exige, nous recueillons votre
          consentement avant de déposer des cookies non essentiels.
        </p>
      </>
    ),
  },
  {
    title: "5. Partage de vos données",
    content: (
      <>
        <p>
          Nous ne vendons pas vos données personnelles. Nous pouvons les partager avec des
          prestataires de confiance (hébergement, email, analytique, paiement) strictement pour
          fournir nos services, et uniquement sous des obligations de confidentialité. Nous
          pouvons également divulguer des données lorsque la loi l&apos;exige.
        </p>
      </>
    ),
  },
  {
    title: "6. Conservation des données",
    content: (
      <>
        <p>
          Nous conservons les données personnelles uniquement le temps nécessaire aux fins
          décrites dans la présente politique ou conformément aux obligations légales. Les
          soumissions de formulaires de contact sont généralement conservées pendant 24 mois,
          sauf si une relation commerciale en cours nécessite un stockage plus long.
        </p>
      </>
    ),
  },
  {
    title: "7. Vos droits",
    content: (
      <>
        <p>Selon votre localisation, vous avez le droit de&nbsp;:</p>
        <ul>
          <li>Accéder aux données personnelles que nous détenons à votre sujet.</li>
          <li>Demander la rectification ou la suppression de vos données.</li>
          <li>Vous opposer à certains traitements ou en demander la limitation.</li>
          <li>Retirer votre consentement à tout moment lorsque le traitement est fondé sur celui-ci.</li>
          <li>Déposer une plainte auprès de l&apos;autorité de protection des données compétente.</li>
        </ul>
      </>
    ),
  },
  {
    title: "8. Sécurité",
    content: (
      <>
        <p>
          Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour
          protéger vos données personnelles. Cependant, aucune méthode de transmission sur
          Internet n&apos;est totalement sûre, et nous ne pouvons pas garantir une sécurité
          absolue.
        </p>
      </>
    ),
  },
  {
    title: "9. Vie privée des enfants",
    content: (
      <>
        <p>
          Nos services ne s&apos;adressent pas aux enfants de moins de 16 ans, et nous ne
          collectons pas sciemment de données personnelles les concernant.
        </p>
      </>
    ),
  },
  {
    title: "10. Modifications de cette politique",
    content: (
      <>
        <p>
          Nous pouvons mettre à jour cette politique de temps à autre. La dernière version est
          toujours disponible sur cette page, la date de &laquo;&nbsp;Dernière mise à jour&nbsp;&raquo;
          reflétant la révision la plus récente.
        </p>
      </>
    ),
  },
  {
    title: "11. Contactez-nous",
    content: (
      <>
        <p>
          Pour toute question concernant cette politique ou pour exercer vos droits, écrivez-nous à
          l&apos;adresse{" "}
          <a href="mailto:Contact@maroc360.agency">Contact@maroc360.agency</a> ou utilisez le
          formulaire sur notre{" "}
          <Link href="/fr/contact">page de contact</Link>.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  const dict = getDict("fr");
  const url = absoluteUrl("/fr/privacy");
  const schema = webPageSchema({
    id: `${url}#webpage`,
    name: metadata.title as string,
    description: metadata.description as string,
    url,
    inLanguage: "fr",
    type: "WebPage",
  });
  const crumbs = breadcrumbSchema([
    { name: "Accueil", item: absoluteUrl("/fr") },
    { name: "Politique de confidentialité", item: url },
  ]);
  return (
    <>
      <Navbar dict={dict.nav} locale="fr" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <LegalBreadcrumbs
          current="Confidentialité"
          href="/fr/privacy"
          locale="fr"
          homeLabel={dict.blogBreadcrumbs.home}
        />
        <LegalPage
          title="Politique de confidentialité"
          intro="Cette politique de confidentialité explique comment Maroc 360 Agency traite vos données personnelles — ce que nous collectons, pourquoi nous le faisons et les choix qui s'offrent à vous."
          updated="4 juin 2026"
          updatedLabel="Dernière mise à jour"
          sections={sections}
        />
      </main>
      <Footer dict={dict.footer} locale="fr" />
      <JsonLd data={schema} />
      <JsonLd data={crumbs} />
    </>
  );
}
