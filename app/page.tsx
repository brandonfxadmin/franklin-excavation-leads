import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import TrustBar from "../components/TrustBar";
import ServiceCard from "../components/ServiceCard";
import TestimonialCard from "../components/TestimonialCard";
import CTASection from "../components/CTASection";
import { SERVICES, TESTIMONIALS, BUSINESS } from "../data/services";
import { ArrowRightIcon, PhoneIcon, CheckIcon } from "../components/icons";

export const metadata = {
  title: "Franklin Excavation | Excavation, Grading & Drainage in Franklin, TN",
  description:
    "Franklin Excavation provides grading, drainage, driveways, retaining walls, land clearing, demolition, and utility trenching for homeowners and builders across Middle Tennessee.",
};

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section
          className="hero"
          style={{
            backgroundImage:
              "linear-gradient(rgba(21,21,21,0.55), rgba(21,21,21,0.75)), url(/images/hero-home.jpg)",
          }}
        >
          <div className="hero-inner">
            <span className="hero-kicker">Franklin, TN &amp; Middle Tennessee</span>
            <h1>
              Excavation Work Built to
              <br />
              Last, Done Right the First Time
            </h1>
            <p>
              Grading, drainage, driveways, retaining walls, and land clearing for
              homeowners, builders, and developers who need it done right.
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="btn btn-orange">
                Get a Free Quote
                <ArrowRightIcon className="btn-icon" />
              </Link>
              <a href={BUSINESS.phoneHref} className="btn btn-outline-light">
                <PhoneIcon className="btn-icon" />
                {BUSINESS.phone}
              </a>
            </div>
          </div>
        </section>

        <TrustBar />

        <section className="section services-section">
          <div className="section-inner">
            <span className="section-kicker">What We Do</span>
            <h2>Excavation Services for Every Project</h2>
            <p className="section-lead">
              From site prep to finished driveways, we bring the equipment and
              experience to get your project done on time and built to hold up.
            </p>
            <div className="service-grid">
              {SERVICES.map((service) => (
                <ServiceCard service={service} key={service.slug} />
              ))}
            </div>
          </div>
        </section>

        <section className="section why-section">
          <div className="section-inner why-grid">
            <div className="why-image">
              <img src="/images/crew-jobsite.jpg" alt="Franklin Excavation crew on a job site" />
            </div>
            <div className="why-content">
              <span className="section-kicker">Why Franklin Excavation</span>
              <h2>Local Crews Who Take Pride in the Work</h2>
              <p>
                We&apos;re a locally owned excavation contractor serving Franklin and the
                surrounding Middle Tennessee area. Every project gets site-specific
                planning, clear communication, and equipment operators who take the
                time to get it right the first time.
              </p>
              <ul className="why-list">
                <li>
                  <CheckIcon className="why-list-icon" /> Licensed &amp; insured on every job
                </li>
                <li>
                  <CheckIcon className="why-list-icon" /> Free, no-obligation estimates
                </li>
                <li>
                  <CheckIcon className="why-list-icon" /> Site-specific grading &amp; drainage plans
                </li>
                <li>
                  <CheckIcon className="why-list-icon" /> Clear pricing and honest timelines
                </li>
              </ul>
              <Link href="/about" className="btn btn-dark">
                More About Us
                <ArrowRightIcon className="btn-icon" />
              </Link>
            </div>
          </div>
        </section>

        <section className="section testimonials-section">
          <div className="section-inner">
            <span className="section-kicker">Client Reviews</span>
            <h2>What Our Clients Say</h2>
            <div className="testimonial-grid">
              {TESTIMONIALS.map((t) => (
                <TestimonialCard quote={t.quote} name={t.name} location={t.location} key={t.name} />
              ))}
            </div>
          </div>
        </section>

        <CTASection
          title="Ready to Start Your Project?"
          body="Tell us what you need done and we'll get back to you with a free, no-obligation quote."
        />
      </main>
      <SiteFooter />
    </>
  );
}
