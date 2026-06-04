import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";
import { HeroWithIllustration } from "@/components/solutions/hero-with-illustration";
import { FeatureBlock } from "@/components/solutions/feature-block";
import { CustomersCarousel } from "@/components/solutions/customers-carousel";

const features = [
  {
    eyebrow: "Centralized dashboard",
    title: "Centralize your compliance data and easily identify gaps",
    description:
      "When it comes to compliance, knowing can be half the battle. Ditto gives you a central view into your company's documents and activities, so you can identify gaps and areas for improvement.",
    image: "/images/features/management-system.avif",
    imageAlt: "Centralized dashboard preview",
  },
  {
    eyebrow: "Progress tracking",
    title: "Set big goals and track your progress toward them",
    description:
      "Set measurable goals and realistic deadlines, then mobilize your team to make it happen. With Ditto, you'll have a clear view of each objective's status to keep you on track.",
    image: "/images/features/management-system.avif",
    imageAlt: "Progress tracking preview",
  },
  {
    eyebrow: "Knowledge base",
    title: "Keep a record of all your important information",
    description:
      "Ditto is your living history of past assessments and actions. Need to know when a policy changed or a process was implemented? Just ask Ditto.",
    image: "/images/features/management-system.avif",
    imageAlt: "Knowledge base preview",
  },
];

export default function ManagementSystemPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroWithIllustration />

        <section className="pt-24 pb-8 md:pt-32 md:pb-10">
          <div className="container-page">
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl max-w-2xl mx-auto text-center">
              See the full picture and step toward your goals with confidence
            </h2>
          </div>
        </section>

        {features.map((feature, i) => (
          <FeatureBlock
            key={feature.eyebrow}
            eyebrow={feature.eyebrow}
            title={feature.title}
            description={feature.description}
            image={feature.image}
            imageAlt={feature.imageAlt}
            reverse={i % 2 === 1}
            eager={i === 0}
          />
        ))}

        <CustomersCarousel />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
