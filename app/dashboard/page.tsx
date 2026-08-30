"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { STATUS_LABELS, CATEGORY_LABELS } from "../../lib/mappers";

type Lead = {
  id: string;
  name: string;
  phone: string | null;
  address: string | null;
  status: string;
  category: string | null;
  createdAt: string;
  estimateLow: number | null;
  estimateHigh: number | null;
};

const CATEGORIES = [
  { key: "maybe_later", label: "Maybe Later" },
  { key: "not_interested", label: "Not Interested" },
  { key: "need_more_info", label: "Need More Info" },
  { key: "schedule_site_visit", label: "Schedule Site Visit" },
];

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", adminNotes: "" });
  const [creating, setCreating] = useState(false);
  const [newLink, setNewLink] = useState<string | null>(null);
  const [newLeadId, setNewLeadId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [channels, setChannels] = useState({ email: false, text: false });
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("active");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  async function loadLeads() {
    setLoading(true);
    const res = await fetch("/api/leads");
    const data = await res.json();
    setLeads(data);
    setLoading(false);
  }

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    if (!openMenuId) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  async function handleSetCategory(leadId: string, category: string | null) {
    setOpenMenuId(null);
    setBusyId(leadId);
    await fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "set_category", category }),
    });
    await loadLeads();
    setBusyId(null);
  }

  async function handleDelete(leadId: string, name: string) {
    setOpenMenuId(null);
    if (!window.confirm(`Permanently delete ${name}? This can't be undone — their link will stop working immediately.`)) {
      return;
    }
    setBusyId(leadId);
    await fetch(`/api/leads/${leadId}`, { method: "DELETE" });
    await loadLeads();
    setBusyId(null);
  }

  const visibleLeads =
    activeTab === "active"
      ? leads.filter((l) => !l.category)
      : leads.filter((l) => l.category === activeTab);
  const countFor = (key: string) => leads.filter((l) => l.category === key).length;
  const activeCount = leads.filter((l) => !l.category).length;

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setCreating(false);
    if (res.ok) {
      const link = `${window.location.origin}/lead/${data.id}`;
      setNewLink(link);
      setNewLeadId(data.id);
      setCopied(false);
      setSendResult(null);
      setChannels({ email: false, text: false });
      setForm({ name: "", phone: "", email: "", address: "", adminNotes: "" });
      loadLeads();
    }
  }

  async function handleSend() {
    if (!newLeadId) return;
    const selected = Object.entries(channels)
      .filter(([, v]) => v)
      .map(([k]) => k);
    if (selected.length === 0) return;
    setSending(true);
    setSendResult(null);
    const res = await fetch(`/api/leads/${newLeadId}/notify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ channels: selected }),
    });
    const data = await res.json();
    setSending(false);
    const parts: string[] = [];
    if (data.results?.email) {
      parts.push(data.results.email.ok ? "Emailed ✓" : `Email failed: ${data.results.email.error}`);
    }
    if (data.results?.text) {
      parts.push(data.results.text.ok ? "Texted ✓" : `Text failed: ${data.results.text.error}`);
    }
    setSendResult(parts.join(" · "));
  }

  return (
    <div className="container">
      <div className="header" style={{ margin: "-32px -20px 24px", borderRadius: 0 }}>
        <div className="brand">
          <img src="/fx-icon.png" alt="" className="brand-icon" />
          <span className="brand-text">
            <span className="brand-line1">Franklin Excavation</span>
            <span className="brand-line2">Ballpark Estimator</span>
          </span>
        </div>
        <button
          className="btn"
          onClick={() => {
            setShowNew((s) => !s);
            setNewLink(null);
            setNewLeadId(null);
            setSendResult(null);
          }}
        >
          + New Lead
        </button>
      </div>

      {showNew && (
        <div className="card">
          <h2>New Lead</h2>
          {newLink ? (
            <div>
              <p>Lead created. Send this link to the client:</p>
              <div className="stack" style={{ alignItems: "center" }}>
                <input type="text" readOnly value={newLink} style={{ flex: 1 }} />
                <button
                  className="btn secondary"
                  onClick={() => {
                    navigator.clipboard.writeText(newLink);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              <div style={{ marginTop: 20 }}>
                <label>Send it now</label>
                <div className="stack" style={{ alignItems: "center", gap: 16 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 400 }}>
                    <input
                      type="checkbox"
                      checked={channels.email}
                      onChange={(e) => setChannels({ ...channels, email: e.target.checked })}
                    />
                    Email
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 400 }}>
                    <input
                      type="checkbox"
                      checked={channels.text}
                      onChange={(e) => setChannels({ ...channels, text: e.target.checked })}
                    />
                    Text
                  </label>
                  <button
                    className="btn"
                    disabled={sending || (!channels.email && !channels.text)}
                    onClick={handleSend}
                  >
                    {sending ? "Sending..." : "Send"}
                  </button>
                </div>
                {sendResult && <div className="hint" style={{ marginTop: 8 }}>{sendResult}</div>}
              </div>

              <div style={{ marginTop: 16 }}>
                <button className="btn ghost" onClick={() => setShowNew(false)}>
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCreate}>
              <label>Client name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <div className="field-row">
                <div>
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>
              <label>Address / property location</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
              <label>Brief description (what they said on the call)</label>
              <textarea
                value={form.adminNotes}
                onChange={(e) => setForm({ ...form, adminNotes: e.target.value })}
              />
              <div style={{ marginTop: 16 }}>
                <button className="btn" type="submit" disabled={creating}>
                  {creating ? "Creating..." : "Create Lead & Get Link"}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      <div className="card">
        <h2>All Leads</h2>

        <div className="tab-bar">
          <button
            className={`tab-btn ${activeTab === "active" ? "active" : ""}`}
            onClick={() => setActiveTab("active")}
          >
            Active <span className="count">({activeCount})</span>
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              className={`tab-btn ${activeTab === c.key ? "active" : ""}`}
              onClick={() => setActiveTab(c.key)}
            >
              {c.label} <span className="count">({countFor(c.key)})</span>
            </button>
          ))}
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : visibleLeads.length === 0 ? (
          <p className="subtitle">
            {activeTab === "active"
              ? 'No active leads. Click "+ New Lead" to add one.'
              : "No leads in this category."}
          </p>
        ) : (
          visibleLeads.map((lead) => (
            <div key={lead.id} className="lead-row">
              <Link href={`/dashboard/${lead.id}`} className="lead-row-link">
                <div>
                  <div className="name">{lead.name}</div>
                  <div className="meta">
                    {lead.address || "No address"} · {lead.phone || "No phone"}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="badges">
                    <span className={`badge ${lead.status}`}>{STATUS_LABELS[lead.status]}</span>
                    {lead.category && (
                      <span className={`badge ${lead.category}`}>{CATEGORY_LABELS[lead.category]}</span>
                    )}
                  </div>
                  {lead.estimateLow && (
                    <div className="meta">
                      ${lead.estimateLow.toLocaleString()}–${lead.estimateHigh?.toLocaleString()}
                    </div>
                  )}
                </div>
              </Link>

              <div className="lead-menu" ref={openMenuId === lead.id ? menuRef : undefined}>
                <button
                  className="lead-menu-btn"
                  disabled={busyId === lead.id}
                  onClick={() => setOpenMenuId(openMenuId === lead.id ? null : lead.id)}
                  aria-label="Lead options"
                >
                  ⋮
                </button>
                {openMenuId === lead.id && (
                  <div className="lead-menu-dropdown">
                    <div className="lead-menu-label">Move to</div>
                    {CATEGORIES.map((c) => (
                      <button
                        key={c.key}
                        className="lead-menu-item"
                        disabled={lead.category === c.key}
                        onClick={() => handleSetCategory(lead.id, c.key)}
                      >
                        {c.label}
                      </button>
                    ))}
                    {lead.category && (
                      <button className="lead-menu-item" onClick={() => handleSetCategory(lead.id, null)}>
                        Back to Active
                      </button>
                    )}
                    <div className="lead-menu-divider" />
                    <button
                      className="lead-menu-item danger"
                      onClick={() => handleDelete(lead.id, lead.name)}
                    >
                      Permanently Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
