import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import PageHero from "../../components/PageHero";
import ServiceCard from "../../components/ServiceCard";
import CTASection from "../../components/CTASection";
import { SERVICES } from "../../data/services";

export const metadata = {
  title: "Excavation Services | Franklin Excavation",
  description:
    "Grading, drainage solutions, driveways, retaining walls, land clearing, demolition, and utility trenching — serving Franklin, TN and Middle Tennessee.",
};

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          kicker="Our Services"
          title="Excavation Services for Every Project"
          subtitle="From site prep to finished driveways, we bring the right equipment and experience to every job."
          image="/images/grading.jpg"
        />

        <section className="section">
          <div className="section-inner">
            <div className="service-grid">
              {SERVICES.map((service) => (
                <ServiceCard service={service} key={service.slug} />
              ))}
            </div>
          </div>
        </section>

        <CTASection
          title="Not Sure Which Service You Need?"
          body="Tell us what's going on and we'll help you figure out the right fix."
        />
      </main>
      <SiteFooter />
    </>
  );
}
