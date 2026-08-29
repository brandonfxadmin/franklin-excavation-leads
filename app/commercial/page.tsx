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
    title: "On-Time Performance",
    desc: "We keep projects moving with realistic timelines and dependable service.",
  },
  {
    title: "Project Coordination",
    desc: "We work smoothly with your team and subcontractors.",
  },
  {
    title: "Licensed & Insured",
    desc: "Fully qualified to operate on commercial sites.",
  },
  {
    title: "Locally Experienced",
    desc: "We know the land, weather, and permitting requirements of Middle Tennessee.",
  },
];

const CLIENTS = [
  "Home builders and general contractors",
  "Real estate developers",
  "Commercial property managers and investors",
  "Municipal and utility subcontractors",
];

export default function CommercialPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          kicker="Commercial Excavation in Franklin, TN"
          title="Reliable Site Work for Builders, Contractors & Developers"
          subtitle="Efficient excavation solutions to keep your project on track."
          image="/images/crane-commercial.jpg"
        />

        <section className="section">
          <div className="section-inner narrow">
            <p className="lede">
              Franklin Excavation provides dependable excavation services for
              small-to-mid scale commercial projects across Middle Tennessee.
              Whether you&apos;re prepping a site for construction, managing
              utilities for a development, or need large-scale grading and
              drainage solutions, we bring the experience and equipment to get the
              job done right.
            </p>
            <p>
              We understand that delays cost money. That&apos;s why we prioritize
              reliability, clear communication, and doing things right the first
              time — so your project keeps moving.
            </p>
          </div>
        </section>

        <section className="section commercial-clients-section">
          <div className="section-inner">
            <span className="section-kicker">Who We Work With</span>
            <h2>Our Commercial Clients Include</h2>
            <div className="clients-grid">
              {CLIENTS.map((c) => (
                <div className="clients-card" key={c}>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section commercial-services-section">
          <div className="section-inner">
            <span className="section-kicker">Comprehensive Excavation &amp; Site Prep</span>
            <h2>Commercial Excavation Services We Provide</h2>
            <div className="offer-grid offer-grid-icons">
              {SERVICES_OFFERED.map((s) => (
                <div className="offer-card" key={s.title}>
                  <s.icon className="offer-card-icon" />
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section pillars-section">
          <div className="section-inner">
            <span className="section-kicker">Why Contractors Choose Us</span>
            <h2>Built for Commercial Job Sites</h2>
            <div className="pillars-grid">
              {WHY_CONTRACTORS.map((p) => (
                <div className="pillar-card" key={p.title}>
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
              <span className="section-kicker">Serving Franklin and Beyond</span>
              <h2>Where We Work</h2>
              <p>
                We take on commercial excavation projects throughout Franklin and
                the surrounding Middle Tennessee area, working alongside builders,
                developers, and municipal subcontractors.
              </p>
            </div>
            <div className="service-area-card">
              <h3>Service Area</h3>
              <ul className="service-area-list">
                {SERVICE_AREA.map((area) => (
                  <li key={area}>{area}</li>
                ))}
                <li>Surrounding Areas</li>
              </ul>
            </div>
          </div>
        </section>

        <CTASection
          title="Let's Talk Commercial Site Work"
          body="If you need a reliable excavation partner who respects your timeline, budget, and jobsite standards, let's connect. We'll provide a competitive quote and clear plan tailored to your scope."
        />
      </main>
      <SiteFooter />
    </>
  );
}
