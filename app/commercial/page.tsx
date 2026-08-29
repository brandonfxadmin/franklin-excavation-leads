import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import PageHero from "../../components/PageHero";
import CTASection from "../../components/CTASection";
import { SERVICE_AREA } from "../../data/services";
import {
  LandClearingIcon,
  UtilityTrenchingIcon,
  DrainageIcon,
  GradingIcon,
  DrivewayIcon,
} from "../../components/icons";

export const metadata = {
  title: "Commercial Excavation in Franklin, TN | Site Prep & Grading",
  description:
    "Reliable commercial excavation for builders, contractors, and developers across Middle Tennessee — land clearing, utility trenching, drainage, grading, and access road prep.",
};

const SERVICES_OFFERED = [
  {
    icon: LandClearingIcon,
    title: "Land Clearing",
    desc: "Efficiently clearing brush, trees, stumps, and debris to prep your site.",
  },
  {
    icon: UtilityTrenchingIcon,
    title: "Utility Trenching",
    desc: "Install water, sewer, electrical, or storm drain lines with precision and safety.",
  },
  {
    icon: DrainageIcon,
    title: "Drainage Systems",
    desc: "Control runoff and comply with codes using swales, French drains, or culverts.",
  },
  {
    icon: GradingIcon,
    title: "Site Grading & Earthwork",
    desc: "Clear, level, and prep your site for footers, slabs, or infrastructure.",
  },
  {
    icon: DrivewayIcon,
    title: "Driveway & Access Road Prep",
    desc: "Create durable access routes for contractors and future tenants.",
  },
];

const WHY_CONTRACTORS = [
  {
    title: "On-time performance",
    desc: "We keep projects moving with realistic timelines and dependable service.",
  },
  {
    title: "Project coordination",
    desc: "We work smoothly with your team and subcontractors.",
  },
  {
    title: "Licensed & insured",
    desc: "Fully qualified to operate on commercial sites.",
  },
  {
    title: "Locally experienced",
    desc: "We know the land, weather, and permitting requirements of Middle Tennessee.",
  },
];

const CLIENTS = [
  "Home Builders & General Contractors",
  "Real Estate Developers",
  "Commercial Property Managers",
  "Municipal & Utility Subcontractors",
];

export default function CommercialPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          kicker="Commercial Excavation in Franklin, TN"
          title={<>Reliable site work for builders, contractors &amp; <em>developers</em></>}
          subtitle="Efficient excavation solutions to keep your project on track."
          image="/images/crane-commercial.jpg"
        />

        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="section-inner narrow">
            <p className="lede">
              Franklin Excavation provides dependable excavation services for
              small-to-mid scale commercial projects across Middle Tennessee.
            </p>
            <p style={{ marginTop: 28 }}>
              Whether you&apos;re prepping a site for construction, managing
              utilities for a development, or need large-scale grading and
              drainage solutions, we bring the experience and equipment to get the
              job done right. We understand that delays cost money. That&apos;s why
              we prioritize reliability, clear communication, and doing things
              right the first time — so your project keeps moving.
            </p>
          </div>
        </section>

        <section className="section commercial-clients-section">
          <div className="section-inner">
            <span className="section-kicker">Who We Work With</span>
            <div className="slash-list" style={{ marginTop: 8 }}>
              {CLIENTS.map((c) => (
                <span className="slash-list-item" key={c}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-inner">
            <span className="section-kicker">Comprehensive Excavation &amp; Site Prep</span>
            <h2 className="section-title" style={{ marginBottom: 48 }}>
              Commercial excavation services we provide
            </h2>
            <div className="spec-list">
              {SERVICES_OFFERED.map((s) => (
                <div className="spec-item" key={s.title}>
                  <span className="spec-item-title">
                    <s.icon className="spec-item-icon" />
                    {s.title}
                  </span>
                  <p className="spec-item-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-inner">
            <span className="section-kicker">Why Contractors Choose Us</span>
            <h2 className="section-title" style={{ marginBottom: 48 }}>
              Built for commercial job sites
            </h2>
            <div className="numbered-list">
              {WHY_CONTRACTORS.map((p, i) => (
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
              <span className="section-kicker">Serving Franklin and Beyond</span>
              <h2 className="section-title">Where we work</h2>
              <p>
                We take on commercial excavation projects throughout Franklin and
                the surrounding Middle Tennessee area, working alongside builders,
                developers, and municipal subcontractors.
              </p>
            </div>
            <div>
              <span className="section-kicker">Service Area</span>
              <div className="slash-list">
                {SERVICE_AREA.map((area) => (
                  <span className="slash-list-item" key={area}>
                    {area}
                  </span>
                ))}
                <span className="slash-list-item">Surrounding Areas</span>
              </div>
            </div>
          </div>
        </section>

        <CTASection
          title={<>Let&apos;s talk commercial <em>site work</em></>}
          body="If you need a reliable excavation partner who respects your timeline, budget, and jobsite standards, let's connect. We'll provide a competitive quote and clear plan tailored to your scope."
        />
      </main>
      <SiteFooter />
    </>
  );
}
