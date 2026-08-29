"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { upload } from "@vercel/blob/client";

const emptyForm = {
  problemDescription: "",
  additionalDetails: "",
  timeline: "",
};

export default function LeadClient() {
  const params = useParams();
  const id = params.id as string;
  const [lead, setLead] = useState<any>(null);
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [responding, setResponding] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch(`/api/leads/${id}`);
    if (res.status === 404) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    const data = await res.json();
    setLead(data.lead);
    setMedia(data.media);
    setLoading(false);

    if (data.lead.status === "link_sent") {
      fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "mark_started" }),
      });
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    // Upload any selected media directly to storage (bypasses server upload size limits)
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setUploadStatus(`Uploading ${i + 1} of ${files.length}...`);
      try {
        await upload(file.name, file, {
          access: "public",
          handleUploadUrl: `/api/leads/${id}/media`,
        });
      } catch (err) {
        console.error("Upload failed for", file.name, err);
      }
    }
    setUploadStatus("");

    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "submit_form", ...form }),
    });

    setSubmitting(false);
    load();
  }

  async function respond(response: "approved" | "declined") {
    setResponding(true);
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "client_response", response }),
    });
    setResponding(false);
    load();
  }

  if (loading) {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="container">
        <div className="card">
          <h1>Link not found</h1>
          <p>This link doesn't match a lead on file. Please contact Franklin Excavation directly.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="header">
        <div className="brand"><span className="dot" /> Franklin Excavation — Ballpark Estimator</div>
      </div>
      <div className="container">
        <div className="card">
          <h1>Hi {lead.name.split(" ")[0]}, let's get you a ballpark price</h1>
          <p className="subtitle">
            Tell us about the project below. The more detail (and photos/video) you share, the
            more accurate your ballpark estimate will be — and the faster we can get it to you
            without needing to schedule a site visit first.
          </p>

          {(lead.status === "link_sent" || lead.status === "started") && (
            <form onSubmit={handleSubmit}>
              <label>What's the problem you're having, or what are you hoping to get done?</label>
              <textarea
                required
                value={form.problemDescription}
                onChange={(e) => setForm({ ...form, problemDescription: e.target.value })}
                placeholder="e.g. water pools in the backyard after every rain and it's creeping toward the foundation — OR — I want to level out the side yard for a patio"
              />

              <label>Anything else we should know? <span style={{ fontWeight: 400, color: "#7a7361" }}>(optional)</span></label>
              <textarea
                value={form.additionalDetails}
                onChange={(e) => setForm({ ...form, additionalDetails: e.target.value })}
                placeholder="e.g. what you think is causing it, any damage you've noticed, access notes, etc."
              />

              <label>What's your timeline?</label>
              <input
                type="text"
                value={form.timeline}
                onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                placeholder="e.g. ASAP, within a month, just getting quotes"
              />

              <label>Photos / video (strongly recommended)</label>
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={(e) => setFiles(Array.from(e.target.files || []))}
              />
              <div className="hint">
                Without at least a couple of photos or a short video, we may not be able to give
                you an accurate ballpark. Good shots to include: one wide shot of the whole area,
                one close-up of the problem spot, and a video walking around it if you can.
              </div>
              {files.length > 0 && (
                <div className="hint">{files.length} file(s) selected</div>
              )}

              <div style={{ marginTop: 20 }}>
                <button className="btn" type="submit" disabled={submitting}>
                  {submitting ? (uploadStatus || "Submitting...") : "Submit for Ballpark Estimate"}
                </button>
              </div>
            </form>
          )}

          {lead.status !== "link_sent" && lead.status !== "started" && (
            <div>
              <h2>Your submitted info</h2>
              <h3>Problem / what you're hoping to get done</h3>
              <p>{lead.problemDescription || "—"}</p>
              {lead.additionalDetails && (
                <>
                  <h3>Additional details</h3>
                  <p>{lead.additionalDetails}</p>
                </>
              )}
              <h3>Timeline</h3>
              <p>{lead.timeline || "—"}</p>

              {media.length > 0 && (
                <>
                  <h3>Your photos/video</h3>
                  <div className="media-grid">
                    {media.map((m) => (
                      <a key={m.id} href={m.url} target="_blank" rel="noreferrer">
                        {m.mediaType === "video" ? (
                          <video src={m.url} muted />
                        ) : (
                          <img src={m.url} alt="Uploaded" />
                        )}
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {lead.status === "form_completed" && (
            <div className="card" style={{ marginTop: 20, background: "#faf6ee" }}>
              <p style={{ margin: 0 }}>
                Thanks — we've got everything we need. Brandon will review this and send your
                ballpark estimate right here as soon as it's ready.
              </p>
            </div>
          )}

          {(lead.status === "estimate_sent" || lead.status === "approved" || lead.status === "declined") && (
            <div className="estimate-box">
              <div>Your ballpark estimate</div>
              <div className="amount">
                ${Number(lead.estimateLow).toLocaleString()}–${Number(lead.estimateHigh).toLocaleString()}
              </div>
              {lead.estimateNote && <p style={{ color: "#e7dcc8" }}>{lead.estimateNote}</p>}
              <p style={{ fontSize: "0.8rem", color: "#c7bfae" }}>
                This is a rough ballpark based on what you shared — the final price is confirmed
                after an on-site visit.
              </p>

              {lead.status === "estimate_sent" && (
                <div className="stack center" style={{ justifyContent: "center", marginTop: 16 }}>
                  <button className="btn" disabled={responding} onClick={() => respond("approved")}>
                    Approve Site Visit
                  </button>
                  <button className="btn ghost" style={{ color: "#fff", borderColor: "#666" }} disabled={responding} onClick={() => respond("declined")}>
                    Not Right Now
                  </button>
                </div>
              )}

              {lead.status === "approved" && (
                <p style={{ marginTop: 16, fontWeight: 700 }}>
                  Thanks! We'll be in touch to schedule your site visit.
                </p>
              )}
              {lead.status === "declined" && (
                <p style={{ marginTop: 16 }}>
                  No problem — reach out anytime if that changes.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
