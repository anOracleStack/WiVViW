-- WiVViW Constellation — projects, entitlements, evidence, exports

CREATE TYPE subscription_tier AS ENUM ('twin', 'squad', 'empire');

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES wivviw_users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  industry TEXT,
  brand_genome JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_projects_user ON projects(user_id);
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own projects" ON projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own projects" ON projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own projects" ON projects FOR UPDATE USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS user_entitlements (
  user_id UUID PRIMARY KEY REFERENCES wivviw_users(id) ON DELETE CASCADE,
  tier subscription_tier NOT NULL DEFAULT 'twin',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE user_entitlements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own entitlements" ON user_entitlements FOR SELECT USING (auth.uid() = user_id);

ALTER TABLE odyssey_sessions
  ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES projects(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_sessions_project ON odyssey_sessions(project_id);

CREATE TABLE IF NOT EXISTS evidence_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES wivviw_users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('screenshot', 'pdf', 'link', 'other')),
  title TEXT NOT NULL,
  url TEXT,
  file_name TEXT,
  content_hash TEXT,
  claim_ids JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_evidence_project ON evidence_items(project_id);
ALTER TABLE evidence_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own evidence" ON evidence_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own evidence" ON evidence_items FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS export_bundles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES wivviw_users(id) ON DELETE CASCADE,
  format TEXT NOT NULL CHECK (format IN ('json', 'txt', 'pdf')),
  engines JSONB NOT NULL DEFAULT '[]'::jsonb,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  watermarked BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_exports_project ON export_bundles(project_id);
ALTER TABLE export_bundles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own exports" ON export_bundles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own exports" ON export_bundles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Seed dRANb 8-category scoring template
INSERT INTO scoring_templates (task_type, categories, pass_threshold)
VALUES (
  'brand_naming',
  '[
    {"key":"uniqueness","label":"Uniqueness & Distinctiveness","weight":0.20},
    {"key":"memorability","label":"Memorability & Recall","weight":0.15},
    {"key":"commercial","label":"Commercial Viability","weight":0.15},
    {"key":"phonetic","label":"Phonetic Strength","weight":0.10},
    {"key":"visual","label":"Visual & Typographic Potential","weight":0.10},
    {"key":"domain","label":"Domain & Handle Plausibility","weight":0.10},
    {"key":"cultural","label":"Cultural & Linguistic Safety","weight":0.10},
    {"key":"alignment","label":"Strategic Alignment","weight":0.10}
  ]'::jsonb,
  72.00
)
ON CONFLICT (task_type) DO NOTHING;
