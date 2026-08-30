"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { STATUS_LABELS } from "../../../lib/mappers";

export default function LeadDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [lead, setLead] = useState<any>(null);
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [estLow, setEstLow] = useState("");
  const [estHigh, setEstHigh] = useState("");
  const [estNote, setEstNote] = useState("");
  const [submittingEstimate, setSubmittingEstimate] = useState(false);

  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [savingEmail, setSavingEmail] = useState(false);
  const [emailSaved, setEmailSaved] = useState(false);

  const [linkChannels, setLinkChannels] = useState({ email: false, text: false });
  const [sendingLink, setSendingLink] = useState(false);
  const [linkSendResult, setLinkSendResult] = useState<string | null>(null);

  const [estimateChannels, setEstimateChannels] = useState({ email: false, text: false });
  const [estimateSendResult, setEstimateSendResult] = useState<string | null>(null);

  async function load(applyDefaultChannels = false) {
    setLoading(true);
    const res = await fetch(`/api/leads/${id}`);
    const data = await res.json();
    setLead(data.lead);
    setMedia(data.media);
    setEstLow(data.lead.estimateLow ?? "");
    setEstHigh(data.lead.estimateHigh ?? "");
    setEstNote(data.lead.estimateNote ?? "");
    setEmail(data.lead.email ?? "");
    if (applyDefaultChannels && data.lead.preferredChannels) {
      const defaults = {
        email: data.lead.preferredChannels.includes("email"),
        text: data.lead.preferredChannels.includes("text"),
      };
      setLinkChannels(defaults);
      setEstimateChannels(defaults);
    }
    setLoading(false);
  }

  useEffect(() => {
    load(true);
  }, [id]);

  async function notify(channels: string[]): Promise<string> {
    const res = await fetch(`/api/leads/${id}/notify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ channels }),
    });
    const data = await res.json();
    const parts: string[] = [];
    if (data.results?.email) {
      parts.push(data.results.email.ok ? "Emailed ✓" : `Email failed: ${data.results.email.error}`);
    }
    if (data.results?.text) {
      parts.push(data.results.text.ok ? "Texted ✓" : `Text failed: ${data.results.text.error}`);
    }
    return parts.join(" · ");
  }

  async function handleSendLink() {
    const selected = Object.entries(linkChannels)
      .filter(([, v]) => v)
      .map(([k]) => k);
    if (selected.length === 0) return;
    setSendingLink(true);
    setLinkSendResult(null);
    const summary = await notify(selected);
    setSendingLink(false);
    setLinkSendResult(summary);
  }

  async function saveEmail() {
    setSavingEmail(true);
    setEmailSaved(false);
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "update_details", email }),
    });
    setSavingEmail(false);
    setEmailSaved(true);
    setTimeout(() => setEmailSaved(false), 2000);
    load();
  }

  async function sendEstimate(e: React.FormEvent) {
    e.preventDefault();
    setSubmittingEstimate(true);
    setEstimateSendResult(null);
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "send_estimate",
        estimateLow: Number(estLow),
        estimateHigh: Number(estHigh),
        estimateNote: estNote,
      }),
    });

    const selected = Object.entries(estimateChannels)
      .filter(([, v]) => v)
      .map(([k]) => k);
    if (selected.length > 0) {
      const summary = await notify(selected);
      setEstimateSendResult(summary);
    }

    setSubmittingEstimate(false);
    load();
  }

  if (loading || !lead) {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  }

  const link = typeof window !== "undefined" ? `${window.location.origin}/lead/${id}` : "";
  const waitingOnClient = lead.status === "link_sent" || lead.status === "started";

  return (
    <div className="container">
      <div className="header" style={{ margin: "-32px -20px 24px", borderRadius: 0 }}>
        <Link href="/dashboard" className="brand">
          <img src="/fx-icon.png" alt="" className="brand-icon" />
          <span className="brand-text">
            <span className="brand-line1">Franklin Excavation</span>
            <span className="brand-line2">Ballpark Estimator</span>
          </span>
        </Link>
        <Link href="/dashboard" className="btn ghost" style={{ color: "#fff", borderColor: "#555" }}>
          ← All Leads
        </Link>
      </div>

      <div className="card">
        <div className="stack" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1>{lead.name}</h1>
            <p className="subtitle">
              {lead.address || "No address"} · {lead.phone || "No phone"}
            </p>
          </div>
          <span className={`badge ${lead.status}`}>{STATUS_LABELS[lead.status]}</span>
        </div>
        {lead.adminNotes && (
          <>
            <h3>Admin call notes</h3>
            <p>{lead.adminNotes}</p>
          </>
        )}

        <h3>Client email</h3>
        <div className="stack" style={{ alignItems: "center" }}>
          <input
            type="email"
            placeholder="client@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ flex: 1 }}
          />
          <button className="btn secondary" onClick={saveEmail} disabled={savingEmail}>
            {savingEmail ? "Saving..." : emailSaved ? "Saved!" : "Save"}
          </button>
        </div>

        <h3>Client link</h3>
        <div className="stack" style={{ alignItems: "center" }}>
          <input type="text" readOnly value={link} style={{ flex: 1 }} />
          <button
            className="btn secondary"
            onClick={() => {
              navigator.clipboard.writeText(link);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div style={{ marginTop: 16 }}>
          <label>Send this link</label>
          <div className="stack" style={{ alignItems: "center", gap: 16 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 400 }}>
              <input
                type="checkbox"
                checked={linkChannels.email}
                onChange={(e) => setLinkChannels({ ...linkChannels, email: e.target.checked })}
              />
              Email
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 400 }}>
              <input
                type="checkbox"
                checked={linkChannels.text}
                onChange={(e) => setLinkChannels({ ...linkChannels, text: e.target.checked })}
              />
              Text
            </label>
            <button
              className="btn"
              disabled={sendingLink || (!linkChannels.email && !linkChannels.text)}
              onClick={handleSendLink}
            >
              {sendingLink ? "Sending..." : "Send"}
            </button>
          </div>
          {linkSendResult && <div className="hint" style={{ marginTop: 8 }}>{linkSendResult}</div>}
        </div>
      </div>

      {waitingOnClient ? (
        <div className="card">
          <h2>Waiting on client</h2>
          <p className="subtitle">
            {lead.status === "started"
              ? "This client has opened their link but hasn't submitted the form yet."
              : "This client hasn't opened their link yet."}{" "}
            Once they submit, their answers and photos/video will show up here.
          </p>
        </div>
      ) : (
        <div className="card">
          <h2>Scope of work (from client)</h2>
          <h3>Problem / what they're hoping to get done</h3>
          <p>{lead.problemDescription || "—"}</p>
          {lead.additionalDetails && (
            <>
              <h3>Additional details</h3>
              <p>{lead.additionalDetails}</p>
            </>
          )}
          <h3>Timeline</h3>
          <p>{lead.timeline || "—"}</p>

          <h3>Photos / video</h3>
          {media.length === 0 ? (
            <p className="subtitle">No media uploaded.</p>
          ) : (
            <div className="media-grid">
              {media.map((m) => (
                <a key={m.id} href={m.url} target="_blank" rel="noreferrer">
                  {m.mediaType === "video" ? (
                    <video src={m.url} muted />
                  ) : (
                    <img src={m.url} alt="Lead media" />
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {!waitingOnClient && (
        <div className="card">
          <h2>Ballpark estimate</h2>
          <form onSubmit={sendEstimate}>
            <div className="field-row">
              <div>
                <label>Low ($)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={estLow}
                  onChange={(e) => setEstLow(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>High ($)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={estHigh}
                  onChange={(e) => setEstHigh(e.target.value)}
                  required
                />
              </div>
            </div>
            <label>Note to client (optional)</label>
            <textarea value={estNote} onChange={(e) => setEstNote(e.target.value)} />

            <div style={{ marginTop: 12 }}>
              <label>Also send via</label>
              <div className="stack" style={{ alignItems: "center", gap: 16 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 400 }}>
                  <input
                    type="checkbox"
                    checked={estimateChannels.email}
                    onChange={(e) => setEstimateChannels({ ...estimateChannels, email: e.target.checked })}
                  />
                  Email
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 400 }}>
                  <input
                    type="checkbox"
                    checked={estimateChannels.text}
                    onChange={(e) => setEstimateChannels({ ...estimateChannels, text: e.target.checked })}
                  />
                  Text
                </label>
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <button className="btn" type="submit" disabled={submittingEstimate}>
                {submittingEstimate
                  ? "Sending..."
                  : lead.status === "estimate_sent" ||
                    lead.status === "approved" ||
                    lead.status === "declined" ||
                    lead.status === "maybe_later"
                  ? "Update Estimate"
                  : "Send Estimate to Client"}
              </button>
            </div>
            {estimateSendResult && <div className="hint" style={{ marginTop: 8 }}>{estimateSendResult}</div>}
          </form>

          {lead.clientResponse && (
            <div style={{ marginTop: 20 }}>
              <h3>Client response</h3>
              <span className={`badge ${lead.clientResponse}`}>
                {lead.clientResponse === "approved"
                  ? "Approved site visit"
                  : lead.clientResponse === "maybe_later"
                  ? "Maybe later"
                  : "Declined"}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
