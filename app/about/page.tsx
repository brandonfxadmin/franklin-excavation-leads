import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import PageHero from "../../components/PageHero";
import CTASection from "../../components/CTASection";
import { SERVICE_AREA } from "../../data/services";

export const metadata = {
  title: "About Us | Franklin Excavation",
  description:
    "Franklin Excavation is a locally owned excavation contractor serving Franklin, TN and Middle Tennessee with grading, drainage, and site work.",
};

const PILLARS = [
  {
    title: "Locally owned & operated",
    desc: "We live and work in Middle Tennessee, and we understand the soil, terrain, and drainage challenges specific to this area.",
  },
  {
    title: "Experienced crews",
    desc: "Our operators bring years of hands-on excavation experience to every job, from small residential projects to larger commercial sites.",
  },
  {
    title: "Clear communication",
    desc: "You'll always know the plan, the timeline, and the cost before work begins — no surprises, no guesswork.",
  },
  {
    title: "Built to last",
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
          title={<>Excavation work you can <em>count on</em></>}
          subtitle="A locally owned contractor serving homeowners, builders, and developers across Middle Tennessee."
          image="/images/hero-about.jpg"
        />

        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="section-inner narrow">
            <p className="lede">
              Franklin Excavation was built on a simple idea: do the work right the
              first time.
            </p>
            <p style={{ marginTop: 28 }}>
              Whether we&apos;re grading a house pad, solving a drainage problem, or
              clearing land for a new build, every project gets the same attention to
              detail and honest communication. We know that excavation work is the
              foundation — literally — of everything that comes after it. A poorly
              graded lot or a drainage system installed without a plan can cause
              expensive problems for years. That&apos;s why we take the time upfront to
              evaluate each site, plan for water flow and soil conditions, and use the
              right equipment for the job.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-inner">
            <span className="section-kicker">Our Approach</span>
            <h2 className="section-title" style={{ marginBottom: 48 }}>
              What sets us apart
            </h2>
            <div className="numbered-list">
              {PILLARS.map((p, i) => (
                <div className="numbered-item" key={p.title}>
                  <span className="numbered-index">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="numbered-title">{p.title}</h3>
                    <p className="numbered-desc">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-inner who-grid">
            <div>
              <span className="section-kicker">Who We Serve</span>
              <h2 className="section-title">Homeowners, builders &amp; developers</h2>
              <p>
                We work with homeowners tackling a drainage or driveway problem,
                builders who need a house pad graded and ready, and developers
                managing larger site work. No matter the size of the project, you
                get the same responsive service and quality work.
              </p>
            </div>
            <div>
              <span className="section-kicker">Proudly Serving</span>
              <div className="slash-list">
                {SERVICE_AREA.map((area) => (
                  <span className="slash-list-item" key={area}>
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CTASection
          title={<>Let&apos;s talk about <em>your</em> project</>}
          body="Reach out for a free, no-obligation quote — we'll walk the site and give you a straight answer."
        />
      </main>
      <SiteFooter />
    </>
  );
}
