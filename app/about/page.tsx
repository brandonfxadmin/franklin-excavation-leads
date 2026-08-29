import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import PageHero from "../../components/PageHero";
import CTASection from "../../components/CTASection";
import { SERVICE_AREA } from "../../data/services";
import { CheckIcon } from "../../components/icons";

export const metadata = {
  title: "About Us | Franklin Excavation",
  description:
    "Franklin Excavation is a locally owned excavation contractor serving Franklin, TN and Middle Tennessee with grading, drainage, and site work.",
};

const PILLARS = [
  {
    title: "Locally Owned & Operated",
    desc: "We live and work in Middle Tennessee, and we understand the soil, terrain, and drainage challenges specific to this area.",
  },
  {
    title: "Experienced Crews",
    desc: "Our operators bring years of hands-on excavation experience to every job, from small residential projects to larger commercial sites.",
  },
  {
    title: "Clear Communication",
    desc: "You'll always know the plan, the timeline, and the cost before work begins — no surprises, no guesswork.",
  },
  {
    title: "Built to Last",
    desc: "We don't cut corners. Proper grading, drainage, and compaction mean fewer problems and less maintenance down the road.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          kicker="About Franklin Excavation"
          title="Excavation Work You Can Count On"
          subtitle="A locally owned contractor serving homeowners, builders, and developers across Middle Tennessee."
          image="/images/hero-about.jpg"
        />

        <section className="section">
          <div className="section-inner narrow">
            <p className="lede">
              Franklin Excavation was built on a simple idea: do the work right the
              first time. Whether we&apos;re grading a house pad, solving a drainage
              problem, or clearing land for a new build, every project gets the same
              attention to detail and honest communication.
            </p>
            <p>
              We know that excavation work is the foundation — literally — of
              everything that comes after it. A poorly graded lot or a drainage
              system installed without a plan can cause expensive problems for years.
              That&apos;s why we take the time upfront to evaluate each site, plan for
              water flow and soil conditions, and use the right equipment for the
              job.
            </p>
          </div>
        </section>

        <section className="section pillars-section">
          <div className="section-inner">
            <span className="section-kicker">Our Approach</span>
            <h2>What Sets Us Apart</h2>
            <div className="pillars-grid">
              {PILLARS.map((p) => (
                <div className="pillar-card" key={p.title}>
                  <CheckIcon className="pillar-icon" />
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section who-we-serve-section">
          <div className="section-inner who-grid">
            <div>
              <span className="section-kicker">Who We Serve</span>
              <h2>Homeowners, Builders &amp; Developers</h2>
              <p>
                We work with homeowners tackling a drainage or driveway problem,
                builders who need a house pad graded and ready, and developers
                managing larger site work. No matter the size of the project, you
                get the same responsive service and quality work.
              </p>
            </div>
            <div className="service-area-card">
              <h3>Proudly Serving</h3>
              <ul className="service-area-list">
                {SERVICE_AREA.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <CTASection
          title="Let's Talk About Your Project"
          body="Reach out for a free, no-obligation quote — we'll walk the site and give you a straight answer."
        />
      </main>
      <SiteFooter />
    </>
  );
}
