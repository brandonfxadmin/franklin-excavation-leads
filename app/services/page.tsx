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
          title={<>Excavation services for <em>every</em> project</>}
          subtitle="From site prep to finished driveways, we bring the right equipment and experience to every job."
          image="/images/grading.jpg"
        />

        <section className="section">
          <div className="section-inner">
            <div className="service-index">
              {SERVICES.map((service, i) => (
                <ServiceCard service={service} index={i + 1} key={service.slug} />
              ))}
            </div>
          </div>
        </section>

        <CTASection
          title={<>Not sure which service you <em>need</em>?</>}
          body="Tell us what's going on and we'll help you figure out the right fix."
        />
      </main>
      <SiteFooter />
    </>
  );
}
