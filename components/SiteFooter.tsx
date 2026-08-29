import Link from "next/link";
import { BUSINESS, SERVICES, SERVICE_AREA } from "../data/services";
import { PhoneIcon, MailIcon, PinIcon, ClockIcon } from "./icons";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-col footer-brand-col">
          <div className="brand footer-brand">
            <span className="brand-mark">FRANKLIN</span>
            <span className="brand-sub">EXCAVATION</span>
          </div>
          <p className="footer-tagline">
            Reliable grading, drainage, and excavation work for Franklin, TN and the
            surrounding Middle Tennessee area.
          </p>
          <ul className="footer-areas">
            {SERVICE_AREA.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/commercial">Commercial Excavation</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <ul className="footer-contact">
            <li>
              <PhoneIcon className="footer-contact-icon" />
              <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a>
            </li>
            <li>
              <MailIcon className="footer-contact-icon" />
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            </li>
            <li>
              <PinIcon className="footer-contact-icon" />
              <span>{BUSINESS.address}</span>
            </li>
            <li>
              <ClockIcon className="footer-contact-icon" />
              <span>{BUSINESS.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {year} {BUSINESS.name}. All rights reserved.
        </p>
        <div className="footer-bottom-links">
          <Link href="/dashboard">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
