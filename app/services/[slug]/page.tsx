import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import PageHero from "../../../components/PageHero";
import CTASection from "../../../components/CTASection";
import { SERVICES, getService, getAdjacentServices } from "../../../data/services";
import { CheckIcon, ArrowRightIcon } from "../../../components/icons";

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
  const total = SERVICES.length;
  const position = SERVICES.findIndex((s) => s.slug === params.slug) + 1;

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          kicker={service.heroKicker}
          title={service.heroTitle}
          image={service.image}
          index={`${String(position).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
        />

        <section className="section">
          <div className="section-inner service-detail-grid">
            <div className="service-detail-main">
              {service.intro.map((para, i) => (
                <p key={i} className={i === 0 ? "lede" : undefined}>
                  {para}
                </p>
              ))}

              <div className="service-detail-block">
                <span className="section-kicker">{service.offerLabel}</span>
                <div className="spec-list">
                  {service.offerings.map((o) => (
                    <div className="spec-item" key={o.title}>
                      <span className="spec-item-title">{o.title}</span>
                      <p className="spec-item-desc">{o.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="service-detail-block">
                <span className="section-kicker">{service.whyLabel}</span>
                <h2 className="section-title">{service.whyTitle}</h2>
                <div className="numbered-list">
                  {service.whyItems.map((item) => (
                    <div className="numbered-item" key={item}>
                      <span className="numbered-index">
                        <CheckIcon className="numbered-index-icon" />
                      </span>
                      <p className="numbered-desc" style={{ fontSize: "1rem", color: "var(--fx-ink)" }}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="service-detail-block">
                <span className="section-kicker">{service.approachLabel}</span>
                <h2 className="section-title">{service.approachTitle}</h2>
                <div className="numbered-list">
                  {service.approach.map((a, i) => (
                    <div className="numbered-item" key={a.title}>
                      <span className="numbered-index">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h3 className="numbered-title">{a.title}</h3>
                        <p className="numbered-desc">{a.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside>
              <nav className="service-nav-index">
                {SERVICES.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className={`service-nav-index-item ${s.slug === service.slug ? "is-active" : ""}`}
                  >
                    {s.name}
                  </Link>
                ))}
              </nav>
              <div className="service-sidebar-cta">
                <p className="service-sidebar-cta-label">
                  Ready to get started? Get a free, no-obligation quote for your project.
                </p>
                <Link href="/contact" className="btn-text">
                  Get a Free Quote
                  <ArrowRightIcon className="btn-icon" />
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-inner">
            <div className="pager">
              <Link href={`/services/${prev.slug}`} className="pager-link pager-prev">
                <span className="pager-label">Previous Service</span>
                <span className="pager-name">{prev.name}</span>
              </Link>
              <span className="pager-divider" />
              <Link href={`/services/${next.slug}`} className="pager-link pager-next">
                <span className="pager-label">Next Service</span>
                <span className="pager-name">{next.name}</span>
              </Link>
            </div>
          </div>
        </section>

        <CTASection title={service.ctaTitle} body={service.ctaBody} />
      </main>
      <SiteFooter />
    </>
  );
}
