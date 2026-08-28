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
  const [sending, setSending] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch(`/api/leads/${id}`);
    const data = await res.json();
    setLead(data.lead);
    setMedia(data.media);
    setEstLow(data.lead.estimateLow ?? "");
    setEstHigh(data.lead.estimateHigh ?? "");
    setEstNote(data.lead.estimateNote ?? "");
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [id]);

  async function sendEstimate(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
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
    setSending(false);
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

  return (
    <div className="container">
      <div className="header" style={{ margin: "-32px -20px 24px", borderRadius: 0 }}>
        <div className="brand"><span className="dot" /> Franklin Excavation — Lead Portal</div>
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
        <h3>Client link</h3>
        <div className="stack" style={{ alignItems: "center" }}>
          <input type="text" readOnly value={link} style={{ flex: 1 }} />
          <button className="btn secondary" onClick={() => navigator.clipboard.writeText(link)}>
            Copy
          </button>
        </div>
      </div>

      {lead.status === "link_sent" || lead.status === "started" ? (
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

      {lead.status !== "link_sent" && lead.status !== "started" && (
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
            <div style={{ marginTop: 16 }}>
              <button className="btn" type="submit" disabled={sending}>
                {sending
                  ? "Sending..."
                  : lead.status === "estimate_sent" || lead.status === "approved" || lead.status === "declined"
                  ? "Update Estimate"
                  : "Send Estimate to Client"}
              </button>
            </div>
          </form>

          {lead.clientResponse && (
            <div style={{ marginTop: 20 }}>
              <h3>Client response</h3>
              <span className={`badge ${lead.clientResponse}`}>
                {lead.clientResponse === "approved" ? "Approved site visit" : "Declined"}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
