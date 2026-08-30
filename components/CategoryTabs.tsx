"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Shared category list — used for the tab bar here and for the "Move to" menu
// on the main dashboard's lead rows.
export const LEAD_CATEGORIES = [
  { key: "maybe_later", label: "Maybe Later" },
  { key: "not_interested", label: "Not Interested" },
  { key: "need_more_info", label: "Need More Info" },
  { key: "schedule_site_visit", label: "Schedule Site Visit" },
];

type MinimalLead = { category: string | null };

// Renders the Active / Maybe Later / Not Interested / Need More Info /
// Schedule Site Visit tab bar. Used on the main dashboard (where it switches
// the visible list in place via onSelect) and on the lead detail page (where
// it's just a set of jump-links back to the dashboard, pre-filtered to
// whichever category you tap).
export default function CategoryTabs({
  activeTab,
  onSelect,
  leads,
}: {
  activeTab?: string;
  onSelect?: (key: string) => void;
  leads?: MinimalLead[];
}) {
  const [fetchedLeads, setFetchedLeads] = useState<MinimalLead[] | null>(null);

  useEffect(() => {
    if (leads) return; // caller already has the full list (the dashboard page does)
    fetch("/api/leads")
      .then((r) => r.json())
      .then(setFetchedLeads)
      .catch(() => setFetchedLeads([]));
  }, [leads]);

  const source = leads ?? fetchedLeads ?? [];
  const activeCount = source.filter((l) => !l.category).length;
  const countFor = (key: string) => source.filter((l) => l.category === key).length;

  const tabs = [{ key: "active", label: "Active" }, ...LEAD_CATEGORIES];

  return (
    <div className="tab-bar">
      {tabs.map((t) => {
        const count = t.key === "active" ? activeCount : countFor(t.key);
        const className = `tab-btn ${activeTab === t.key ? "active" : ""}`;
        const content = (
          <>
            {t.label} <span className="count">({count})</span>
          </>
        );
        return onSelect ? (
          <button key={t.key} className={className} onClick={() => onSelect(t.key)}>
            {content}
          </button>
        ) : (
          <Link
            key={t.key}
            href={t.key === "active" ? "/dashboard" : `/dashboard?tab=${t.key}`}
            className={className}
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
}
