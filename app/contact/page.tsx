import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import PageHero from "../../components/PageHero";
import QuoteForm from "../../components/QuoteForm";
import { BUSINESS, SERVICE_AREA } from "../../data/services";
import { PhoneIcon, MailIcon, ClockIcon, PinIcon } from "../../components/icons";

export const metadata = {
  title: "Contact Franklin Excavation | Request a Free Estimate",
  description:
    "Get in touch with Franklin Excavation for a free, no-obligation estimate on grading, drainage, driveways, land clearing, and more.",
};

const CONTACT_ITEMS = [
  { icon: PhoneIcon, label: "Phone Number", value: BUSINESS.phone, href: BUSINESS.phoneHref },
  { icon: MailIcon, label: "Email", value: BUSINESS.email, href: `mailto:${BUSINESS.email}` },
  { icon: ClockIcon, label: "Hours", value: BUSINESS.hours },
  { icon: PinIcon, label: "Address", value: BUSINESS.address },
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          kicker="Contact Franklin Excavation"
          title="Get in Touch for a Free Estimate"
          subtitle="Need expert excavation work? We're ready to help with land clearing, drainage, grading, and more."
          image="/images/hero-about.jpg"
        />

        <section className="section contact-section">
          <div className="section-inner contact-grid">
            <div className="contact-info">
              <h2>We Offer Free, No-Obligation Estimates</h2>
              <p>
                We offer free, no-obligation estimates and straightforward
                communication from day one.
              </p>
              <ul className="contact-info-list">
                {CONTACT_ITEMS.map((item) => (
                  <li key={item.label}>
                    <item.icon className="contact-info-icon" />
                    <div>
                      <span className="contact-info-label">{item.label}</span>
                      {item.href ? (
                        <a href={item.href}>{item.value}</a>
                      ) : (
                        <span className="contact-info-value">{item.value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="service-area-card">
                <h3>Our Service Area Includes</h3>
                <ul className="service-area-list">
                  {SERVICE_AREA.map((area) => (
                    <li key={area}>{area}</li>
                  ))}
                  <li>Surrounding Areas</li>
                </ul>
              </div>
            </div>

            <div className="contact-form-wrap">
              <h2>Request Your Free Quote</h2>
              <p>
                Fill out the form below and we&apos;ll get back to you promptly to
                learn more about your project and how we can help.
              </p>
              <QuoteForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
