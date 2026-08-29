import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import TrustBar from "../components/TrustBar";
import ServiceCard from "../components/ServiceCard";
import TestimonialCard from "../components/TestimonialCard";
import CTASection from "../components/CTASection";
import { SERVICES, TESTIMONIALS, BUSINESS } from "../data/services";
import { ArrowRightIcon } from "../components/icons";

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
        <section className="hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero-media photo-treated" src="/images/hero-home.jpg" alt="" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <span className="hero-kicker">Franklin, TN &amp; Middle Tennessee</span>
            <h1 className="hero-title">
              Excavation work built to <em>last</em>, done right the first time
            </h1>
            <p className="hero-sub">
              Grading, drainage, driveways, retaining walls, and land clearing for
              homeowners, builders, and developers who need it done right.
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="btn-primary">
                Get a Free Quote
              </Link>
              <Link href="/services" className="btn-text">
                See Our Work
                <ArrowRightIcon className="btn-icon" />
              </Link>
            </div>
          </div>
          <div className="hero-chip">
            <span className="hero-chip-label">Free, No-Obligation Estimates</span>
            <span className="hero-chip-value">
              <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a>
            </span>
          </div>
        </section>

        <TrustBar />

        <section className="section">
          <div className="section-inner">
            <div className="section-head-row" style={{ marginBottom: 56 }}>
              <div>
                <span className="section-kicker">What We Do</span>
                <h2 className="section-title">
                  Excavation services for <em>every</em> project
                </h2>
              </div>
              <p className="section-lede">
                From site prep to finished driveways, we bring the equipment and
                experience to get your project done on time and built to hold up.
              </p>
            </div>
            <div className="service-index">
              {SERVICES.map((service, i) => (
                <ServiceCard service={service} index={i + 1} key={service.slug} />
              ))}
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-inner why-grid">
            <div className="why-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="photo-treated" src="/images/crew-jobsite.jpg" alt="Franklin Excavation crew on a job site" />
            </div>
            <div>
              <span className="section-kicker">Why Franklin Excavation</span>
              <h2 className="section-title">Local crews who take pride in the work</h2>
              <p style={{ color: "var(--fx-ink-dim)", marginBottom: 40, lineHeight: 1.7 }}>
                We&apos;re a locally owned excavation contractor serving Franklin and the
                surrounding Middle Tennessee area. Every project gets site-specific
                planning, clear communication, and equipment operators who take the
                time to get it right the first time.
              </p>
              <div className="numbered-list">
                <div className="numbered-item">
                  <span className="numbered-index">01</span>
                  <div>
                    <h3 className="numbered-title">Licensed &amp; insured</h3>
                    <p className="numbered-desc">Full coverage on every job, every time.</p>
                  </div>
                </div>
                <div className="numbered-item">
                  <span className="numbered-index">02</span>
                  <div>
                    <h3 className="numbered-title">Free, no-obligation estimates</h3>
                    <p className="numbered-desc">You&apos;ll know the plan and the cost before we start.</p>
                  </div>
                </div>
                <div className="numbered-item">
                  <span className="numbered-index">03</span>
                  <div>
                    <h3 className="numbered-title">Site-specific grading &amp; drainage plans</h3>
                    <p className="numbered-desc">Every job is planned around your land, not a template.</p>
                  </div>
                </div>
                <div className="numbered-item">
                  <span className="numbered-index">04</span>
                  <div>
                    <h3 className="numbered-title">Clear pricing and honest timelines</h3>
                    <p className="numbered-desc">No guesswork, no jargon — just straight answers.</p>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 40 }}>
                <Link href="/about" className="btn-text">
                  More About Us
                  <ArrowRightIcon className="btn-icon" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-inner">
            <span className="section-kicker">Client Reviews</span>
            <h2 className="section-title" style={{ marginBottom: 48 }}>
              What our clients say
            </h2>
            <div className="quote-index">
              {TESTIMONIALS.map((t) => (
                <TestimonialCard quote={t.quote} name={t.name} location={t.location} key={t.name} />
              ))}
            </div>
          </div>
        </section>

        <CTASection
          title={
            <>
              Ready to start <em>your</em> project?
            </>
          }
          body="Tell us what you need done and we'll get back to you with a free, no-obligation quote."
        />
      </main>
      <SiteFooter />
    </>
  );
}
