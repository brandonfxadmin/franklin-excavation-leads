CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    admin_notes TEXT,
    status TEXT NOT NULL DEFAULT 'link_sent',
    problem_description TEXT,
    additional_details TEXT,
    timeline TEXT,
    started_at TIMESTAMPTZ,
    form_completed_at TIMESTAMPTZ,
    estimate_low NUMERIC,
    estimate_high NUMERIC,
    estimate_note TEXT,
    estimate_sent_at TIMESTAMPTZ,
    client_response TEXT,
    client_response_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

CREATE TABLE IF NOT EXISTS lead_media (
    id SERIAL PRIMARY KEY,
    lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    media_type TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

CREATE INDEX IF NOT EXISTS idx_lead_media_lead_id ON lead_media(lead_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
