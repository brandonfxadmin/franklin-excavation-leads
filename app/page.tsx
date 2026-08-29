"use client";

import { useState } from "react";

const SERVICES = [
  {
    title: "Excavation & Grading",
    desc: "Precise cut-and-fill grading for building pads, yards, and drainage — done right the first time.",
  },
  {
    title: "Land Clearing",
    desc: "Trees, brush, and stumps cleared and hauled so your site is ready to build on.",
  },
  {
    title: "Site Preparation",
    desc: "Base prep, compaction, and layout work for new construction, additions, and outbuildings.",
  },
  {
    title: "Demolition",
    desc: "Structure and slab demolition with clean, responsible debris removal.",
  },
  {
    title: "Drainage & Erosion Control",
    desc: "French drains, swales, and grading solutions that keep water away from your property.",
  },
  {
    title: "Driveways & Road Base",
    desc: "Gravel and base work for driveways, access roads, and equipment pads.",
  },
];

const TRUST_ITEMS = [
  "Licensed & Insured",
  "Free On-Site Estimates",
  "Locally Owned & Operated",
  "Prompt, Reliable Crews",
];

const TIMELINE_OPTIONS = [
  "As soon as possible",
  "Within the next month",
  "Just getting quotes for now",
];

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots tend to fill every field, real visitors never see this one.
    if (String(data.get("company") || "").trim() !== "") {
      setStatus("success");
      form.reset();
      return;
    }

    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();

    if (!name || !phone) {
      setStatus("error");
      setErrorMsg("Please enter your name and phone number.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: String(data.get("email") || "").trim(),
          address: String(data.get("address") || "").trim(),
          timeline: String(data.get("timeline") || "").trim(),
          problemDescription: String(data.get("details") || "").trim(),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="card lp-success">
        <h3>Thanks — we got it!</h3>
        <p>
          Your request has been sent to Franklin Excavation. We&apos;ll reach out shortly to
          talk through your project and get you a free estimate.
        </p>
      </div>
    );
  }

  return (
    <form className="card lp-form" onSubmit={handleSubmit}>
      {/* Honeypot field — hidden from real visitors via CSS, not the `hidden` attribute, so bots still fill it in. */}
      <div className="lp-honeypot" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field-row">
        <div>
          <label htmlFor="name">Full name *</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="phone">Phone number *</label>
          <input type="tel" id="phone" name="phone" required />
        </div>
      </div>

      <div className="field-row">
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="address">Property address / city</label>
          <input type="text" id="address" name="address" />
        </div>
      </div>

      <label htmlFor="timeline">When do you need this done?</label>
      <select id="timeline" name="timeline" defaultValue="">
        <option value="" disabled>
          Select one
        </option>
        {TIMELINE_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <label htmlFor="details">Tell us about your project</label>
      <textarea
        id="details"
        name="details"
        placeholder="What do you need done? Lot size, access, anything we should know?"
      />

      {status === "error" && <p className="error-text">{errorMsg}</p>}

      <div className="lp-form-submit">
        <button type="submit" className="btn" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Request Free Estimate"}
        </button>
      </div>
    </form>
  );
}

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <header className="header">
        <div className="brand">
          <span className="dot" />
          Franklin Excavation
        </div>
        <a href="#contact" className="btn lp-nav-cta">
          Free Estimate
        </a>
      </header>

      <section className="lp-hero">
        <div className="lp-hero-inner">
          <h1 className="lp-hero-title">
            Reliable Excavation &amp; Site Work, Done Right
          </h1>
          <p className="lp-hero-sub">
            Franklin Excavation handles grading, land clearing, site prep, and demolition for
            homeowners and contractors across the area — backed by experienced operators and
            well-maintained equipment.
          </p>
          <div className="stack">
            <a href="#contact" className="btn">
              Request a Free Estimate
            </a>
            <a href="tel:+15551234567" className="btn ghost lp-ghost-on-dark">
              Call (555) 123-4567
            </a>
          </div>
        </div>
      </section>

      <div className="lp-trust-bar">
        <div className="lp-trust-inner">
          {TRUST_ITEMS.map((item) => (
            <div className="lp-trust-item" key={item}>
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <section id="services" className="lp-section">
          <h2 className="lp-section-title">What We Do</h2>
          <p className="subtitle">
            From a single afternoon of grading to a full site-prep job, we scope every project
            carefully and give you a straight answer on cost and timeline.
          </p>
          <div className="lp-services-grid">
            {SERVICES.map((s) => (
              <div className="card lp-service-card" key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="why-us" className="lp-section">
          <h2 className="lp-section-title">Why Property Owners Choose Us</h2>
          <div className="lp-why-grid">
            <div className="lp-why-item">
              <h3>Experienced Crews</h3>
              <p>Every job is run by operators who&apos;ve seen the ground conditions before.</p>
            </div>
            <div className="lp-why-item">
              <h3>Right-Sized Equipment</h3>
              <p>We bring the machines that fit your site — no wasted time, no unnecessary cost.</p>
            </div>
            <div className="lp-why-item">
              <h3>Clear Communication</h3>
              <p>You&apos;ll know the plan, the timeline, and the price before we ever break ground.</p>
            </div>
          </div>
        </section>

        <section id="area" className="lp-section lp-area">
          <h2 className="lp-section-title">Proudly Serving the Greater Franklin Area</h2>
          <p>
            We take on residential and commercial excavation projects throughout the region.
            Not sure if you&apos;re in our service area? Reach out — we&apos;re happy to take a look.
          </p>
        </section>

        <section id="contact" className="lp-section">
          <h2 className="lp-section-title">Get a Free Estimate</h2>
          <p className="subtitle">
            Tell us a bit about your project and we&apos;ll get back to you to schedule a site
            visit.
          </p>
          <ContactForm />
        </section>
      </div>

      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="brand">
            <span className="dot" />
            Franklin Excavation
          </div>
          <div className="lp-footer-contact">
            <a href="tel:+15551234567">(555) 123-4567</a>
            <a href="mailto:info@excavatefranklin.com">info@excavatefranklin.com</a>
          </div>
          <div className="lp-footer-copy">
            © {year} Franklin Excavation. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
