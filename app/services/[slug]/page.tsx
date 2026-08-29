import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import PageHero from "../../../components/PageHero";
import CTASection from "../../../components/CTASection";
import { SERVICES, getService, getAdjacentServices } from "../../../data/services";
import { CheckIcon, ArrowRightIcon, SERVICE_ICONS } from "../../../components/icons";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props) {
  const service = getService(params.slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
  };
}

export default function ServiceDetailPage({ params }: Props) {
  const service = getService(params.slug);
  if (!service) return notFound();

  const { prev, next } = getAdjacentServices(params.slug);
  const Icon = SERVICE_ICONS[service.slug];

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero kicker={service.heroKicker} title={service.heroTitle} image={service.image} />

        <section className="section">
          <div className="section-inner service-detail-grid">
            <div className="service-detail-main">
              {Icon ? (
                <div className="service-detail-icon">
                  <Icon />
                </div>
              ) : null}
              {service.intro.map((para, i) => (
                <p key={i} className={i === 0 ? "lede" : undefined}>
                  {para}
                </p>
              ))}

              <div className="service-detail-block">
                <span className="section-kicker">{service.offerLabel}</span>
                <div className="offer-grid">
                  {service.offerings.map((o) => (
                    <div className="offer-card" key={o.title}>
                      <h3>{o.title}</h3>
                      <p>{o.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="service-detail-block">
                <span className="section-kicker">{service.whyLabel}</span>
                <h2>{service.whyTitle}</h2>
                <ul className="check-list">
                  {service.whyItems.map((item) => (
                    <li key={item}>
                      <CheckIcon className="check-list-icon" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="service-detail-block">
                <span className="section-kicker">{service.approachLabel}</span>
                <h2>{service.approachTitle}</h2>
                <div className="approach-grid">
                  {service.approach.map((a) => (
                    <div className="approach-card" key={a.title}>
                      <h3>{a.title}</h3>
                      <p>{a.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="service-detail-sidebar">
              <div className="sidebar-card">
                <h3>All Services</h3>
                <ul className="sidebar-service-list">
                  {SERVICES.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className={s.slug === service.slug ? "is-active" : undefined}
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sidebar-card sidebar-card-cta">
                <h3>Ready to Get Started?</h3>
                <p>Get a free, no-obligation quote for your project.</p>
                <Link href="/contact" className="btn btn-orange sidebar-cta-btn">
                  Get a Free Quote
                  <ArrowRightIcon className="btn-icon" />
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <section className="section service-nav-section">
          <div className="section-inner service-nav-grid">
            <Link href={`/services/${prev.slug}`} className="service-nav-link service-nav-prev">
              <span className="service-nav-label">Previous Service</span>
              <span className="service-nav-name">{prev.name}</span>
            </Link>
            <Link href={`/services/${next.slug}`} className="service-nav-link service-nav-next">
              <span className="service-nav-label">Next Service</span>
              <span className="service-nav-name">{next.name}</span>
            </Link>
          </div>
        </section>

        <CTASection title={service.ctaTitle} body={service.ctaBody} />
      </main>
      <SiteFooter />
    </>
  );
}
