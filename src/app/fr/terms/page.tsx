import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { getDict } from "@/lib/i18n/dict";
import { Footer } from "@/components/footer";
import { LegalBreadcrumbs } from "@/components/legal/breadcrumbs";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Conditions d'utilisation – Maroc 360 Agency",
  description:
    "Les conditions générales qui régissent votre utilisation du site et des services de Maroc 360 Agency.",
};

const sections: LegalSection[] = [
  {
    title: "1. Acceptation des conditions",
    content: (
      <>
        <p>
          En accédant au site web de Maroc 360 Agency (le &laquo;&nbsp;Site&nbsp;&raquo;) et aux
          services que nous fournissons (les &laquo;&nbsp;Services&nbsp;&raquo;), vous acceptez
          d&apos;être lié par les présentes Conditions d&apos;utilisation. Si vous n&apos;êtes
          pas d&apos;accord, vous ne devez pas utiliser le Site ou les Services.
        </p>
      </>
    ),
  },
  {
    title: "2. Éligibilité",
    content: (
      <>
        <p>
          Vous devez avoir au moins 18 ans et être juridiquement capable de conclure un contrat
          contraignant pour utiliser nos Services. En utilisant le Site, vous déclarez remplir
          ces conditions.
        </p>
      </>
    ),
  },
  {
    title: "3. Utilisation du site",
    content: (
      <>
        <p>Vous vous engagez à ne pas&nbsp;:</p>
        <ul>
          <li>
            Utiliser le Site à des fins illégales ou en violation de toute loi applicable.
          </li>
          <li>
            Tenter d&apos;accéder sans autorisation à toute partie du Site, à d&apos;autres
            comptes ou à des systèmes informatiques connectés au Site.
          </li>
          <li>
            Utiliser un robot, un spider ou tout autre moyen automatisé pour accéder au Site à
            quelque fin que ce soit sans notre accord écrit préalable.
          </li>
          <li>
            Interférer avec ou perturber le Site, sa sécurité ou tout système connexe.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Propriété intellectuelle",
    content: (
      <>
        <p>
          L&apos;ensemble des contenus présents sur le Site — textes, graphiques, logos, images,
          illustrations, code et logiciels — est la propriété de Maroc 360 Agency ou de ses
          concédants de licence et est protégé par les lois marocaines et internationales
          relatives au droit d&apos;auteur et aux marques.
        </p>
        <p>
          Vous pouvez consulter et télécharger une copie unique des éléments du Site pour un
          usage personnel et non commercial, à condition de conserver l&apos;ensemble des
          mentions de droit d&apos;auteur et de propriété. Toute autre utilisation nécessite
          notre autorisation écrite préalable.
        </p>
      </>
    ),
  },
  {
    title: "5. Soumissions de l'utilisateur",
    content: (
      <>
        <p>
          Lorsque vous nous soumettez des informations, des commentaires ou du matériel (par
          exemple via un formulaire de contact ou un email), vous nous accordez une licence non
          exclusive, libre de redevances et mondiale pour utiliser ce contenu aux fins
          d&apos;exploitation, d&apos;évaluation et d&apos;amélioration de nos Services, dans le
          respect de notre{" "}
          <Link href="/fr/privacy">Politique de confidentialité</Link>.
        </p>
      </>
    ),
  },
  {
    title: "6. Services et prestations",
    content: (
      <>
        <p>
          Les services spécifiques sont régis par un accord écrit séparé conclu entre Maroc 360
          Agency et le client. En cas de conflit entre les présentes Conditions et une lettre
          d&apos;engagement ou un cahier des charges signé, la lettre d&apos;engagement ou le
          cahier des charges prévaut.
        </p>
      </>
    ),
  },
  {
    title: "7. Liens vers des tiers",
    content: (
      <>
        <p>
          Le Site peut contenir des liens vers des sites web tiers que nous ne contrôlons pas.
          Nous ne sommes pas responsables du contenu, des politiques ou des pratiques de ces
          sites et vous encourageons à consulter leurs conditions.
        </p>
      </>
    ),
  },
  {
    title: "8. Avertissements",
    content: (
      <>
        <p>
          Le Site et son contenu sont fournis &laquo;&nbsp;en l&apos;état&nbsp;&raquo; et
          &laquo;&nbsp;selon disponibilité&nbsp;&raquo;, sans garantie d&apos;aucune sorte,
          expresse ou implicite, y compris, sans s&apos;y limiter, les garanties de qualité
          marchande, d&apos;adéquation à un usage particulier ou d&apos;absence de
          contrefaçon.
        </p>
      </>
    ),
  },
  {
    title: "9. Limitation de responsabilité",
    content: (
      <>
        <p>
          Dans toute la mesure permise par la loi, Maroc 360 Agency ne pourra être tenue
          responsable de tout dommage indirect, incident, spécial, consécutif ou punitif, ni
          de toute perte de profits ou de revenus, qu&apos;ils soient encourus directement ou
          indirectement, ni de toute perte de données, d&apos;usage ou de clientèle, résultant
          de votre utilisation du Site.
        </p>
      </>
    ),
  },
  {
    title: "10. Indemnisation",
    content: (
      <>
        <p>
          Vous acceptez d&apos;indemniser et de tenir indemne Maroc 360 Agency, ses affiliés
          et leurs dirigeants, administrateurs et employés respectifs, de toute réclamation,
          demande, perte ou dépense découlant d&apos;une violation des présentes Conditions
          ou de votre utilisation du Site.
        </p>
      </>
    ),
  },
  {
    title: "11. Résiliation",
    content: (
      <>
        <p>
          Nous pouvons suspendre ou résilier votre accès au Site à tout moment, sans préavis,
          en cas de comportement que nous estimons en violation des présentes Conditions ou
          autrement préjudiciable aux autres utilisateurs, à nous ou à des tiers.
        </p>
      </>
    ),
  },
  {
    title: "12. Loi applicable",
    content: (
      <>
        <p>
          Les présentes Conditions sont régies par les lois du Royaume du Maroc. Tout litige
          découlant des présentes Conditions ou s&apos;y rapportant sera soumis à la
          compétence exclusive des tribunaux de Casablanca, Maroc.
        </p>
      </>
    ),
  },
  {
    title: "13. Modifications de ces conditions",
    content: (
      <>
        <p>
          Nous pouvons mettre à jour les présentes Conditions de temps à autre. La dernière
          version est toujours disponible sur cette page, la date de &laquo;&nbsp;Dernière mise
          à jour&nbsp;&raquo; reflétant la révision la plus récente. La poursuite de
          l&apos;utilisation du Site après les modifications vaut acceptation des nouvelles
          Conditions.
        </p>
      </>
    ),
  },
  {
    title: "14. Contactez-nous",
    content: (
      <>
        <p>
          Si vous avez des questions concernant les présentes Conditions, écrivez-nous à
          l&apos;adresse{" "}
          <a href="mailto:Contact@maroc360.agency">Contact@maroc360.agency</a> ou utilisez le
          formulaire sur notre{" "}
          <Link href="/fr/contact">page de contact</Link>.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  const dict = getDict("fr");
  return (
    <>
      <Navbar dict={dict.nav} locale="fr" multiStepForm={dict.multiStepForm} />
      <main id="main" tabIndex={-1}>
        <LegalBreadcrumbs
          current="Conditions"
          href="/fr/terms"
          locale="fr"
          homeLabel={dict.blogBreadcrumbs.home}
        />
        <LegalPage
          title="Conditions d'utilisation"
          intro="Ces conditions régissent votre utilisation du site web de Maroc 360 Agency. En utilisant le site, vous acceptez les conditions ci-dessous."
          updated="4 juin 2026"
          updatedLabel="Dernière mise à jour"
          sections={sections}
        />
      </main>
      <Footer dict={dict.footer} locale="fr" />
    </>
  );
}
