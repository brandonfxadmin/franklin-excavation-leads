"use client";

import Link from "next/link";
import { useState } from "react";
import { BUSINESS, SERVICES } from "../data/services";
import { PhoneIcon, ArrowRightIcon } from "./icons";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">FRANKLIN</span>
          <span className="brand-sub">EXCAVATION</span>
        </Link>

        <nav className={`site-nav ${menuOpen ? "is-open" : ""}`}>
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <div
            className="nav-dropdown"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className="nav-dropdown-trigger"
              onClick={() => setServicesOpen((v) => !v)}
            >
              Services
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className={`nav-dropdown-panel ${servicesOpen ? "is-open" : ""}`}>
              {SERVICES.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  onClick={() => {
                    setMenuOpen(false);
                    setServicesOpen(false);
                  }}
                >
                  {s.name}
                </Link>
              ))}
              <Link
                href="/services"
                className="nav-dropdown-viewall"
                onClick={() => {
                  setMenuOpen(false);
                  setServicesOpen(false);
                }}
              >
                View All Services
              </Link>
            </div>
          </div>
          <Link href="/commercial" onClick={() => setMenuOpen(false)}>
            Commercial
          </Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
        </nav>

        <div className="site-header-actions">
          <a href={BUSINESS.phoneHref} className="header-phone">
            <PhoneIcon className="header-phone-icon" />
            <span>{BUSINESS.phone}</span>
          </a>
          <Link href="/contact" className="btn btn-orange header-cta">
            Get a Free Quote
            <ArrowRightIcon className="btn-icon" />
          </Link>
          <button
            type="button"
            className={`nav-toggle ${menuOpen ? "is-open" : ""}`}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
