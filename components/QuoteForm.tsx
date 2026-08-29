"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      address: String(data.get("address") || ""),
      timeline: String(data.get("timeline") || ""),
      problemDescription: String(data.get("problemDescription") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMsg(json?.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setErrorMsg("Something went wrong. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="quote-form-success">
        <h3>Thanks — we got it.</h3>
        <p>
          Your request has been received. We&apos;ll reach out shortly to talk through your
          project and next steps.
        </p>
      </div>
    );
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <div className="quote-form-grid">
        <div className="quote-form-field">
          <label htmlFor="qf-name">Full Name *</label>
          <input id="qf-name" name="name" type="text" required maxLength={200} />
        </div>
        <div className="quote-form-field">
          <label htmlFor="qf-phone">Phone *</label>
          <input id="qf-phone" name="phone" type="tel" required maxLength={50} />
        </div>
        <div className="quote-form-field">
          <label htmlFor="qf-email">Email</label>
          <input id="qf-email" name="email" type="email" maxLength={200} />
        </div>
        <div className="quote-form-field">
          <label htmlFor="qf-address">Project Address</label>
          <input id="qf-address" name="address" type="text" maxLength={300} />
        </div>
        <div className="quote-form-field">
          <label htmlFor="qf-timeline">Desired Timeline</label>
          <select id="qf-timeline" name="timeline" defaultValue="">
            <option value="">Select an option</option>
            <option value="ASAP">As soon as possible</option>
            <option value="Within 1 month">Within 1 month</option>
            <option value="1-3 months">1–3 months</option>
            <option value="Just planning ahead">Just planning ahead</option>
          </select>
        </div>
        <div className="quote-form-field quote-form-field-full">
          <label htmlFor="qf-details">Tell Us About Your Project</label>
          <textarea
            id="qf-details"
            name="problemDescription"
            rows={5}
            maxLength={4000}
            placeholder="What are you looking to get done? Grading, drainage, a driveway, land clearing..."
          />
        </div>
      </div>

      {status === "error" ? <p className="quote-form-error">{errorMsg}</p> : null}

      <button type="submit" className="btn-primary quote-form-submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Request My Free Quote"}
      </button>
    </form>
  );
}
