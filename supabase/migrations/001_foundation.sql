-- ═══════════════════════════════════════════════════════════
-- WiVViW Phase 0.5 + dRANb Foundation
-- Run via: npx supabase db push
-- ═══════════════════════════════════════════════════════════

-- ENUMS
CREATE TYPE user_status AS ENUM ('pending', 'pending_review', 'accepted', 'suspended', 'rejected');
CREATE TYPE standing_state AS ENUM ('accepted', 'limbo', 'banished');
CREATE TYPE truth_state AS ENUM ('verified', 'unverified', 'conflicted', 'queued', 'error');
CREATE TYPE package_type AS ENUM ('deliverable', 'audit', 'thought');
CREATE TYPE package_status AS ENUM ('active', 'superseded', 'rolled_back');
CREATE TYPE advance_mode AS ENUM ('full_auto', 'single_approval', 'manual_precision');
CREATE TYPE provider_status AS ENUM ('healthy', 'degraded', 'down');

-- ═══════════════════════════════════════════════════════════
-- USERS
-- ═══════════════════════════════════════════════════════════
CREATE TABLE wivviw_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  status user_status DEFAULT 'pending',
  standing standing_state DEFAULT 'accepted',
  standing_history JSONB DEFAULT '[]'::jsonb,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE wivviw_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own data" ON wivviw_users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own data" ON wivviw_users FOR UPDATE USING (auth.uid() = id);

-- ═══════════════════════════════════════════════════════════
-- SESSIONS (Odyssey state continuity)
-- ═══════════════════════════════════════════════════════════
CREATE TABLE odyssey_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES wivviw_users(id) ON DELETE CASCADE,
  engine_key TEXT NOT NULL,
  state JSONB DEFAULT '{}'::jsonb,
  parent_session_id UUID REFERENCES odyssey_sessions(id),
  fork_point_step INT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_sessions_user ON odyssey_sessions(user_id);
CREATE INDEX idx_sessions_engine ON odyssey_sessions(engine_key);
ALTER TABLE odyssey_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own sessions" ON odyssey_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own sessions" ON odyssey_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own sessions" ON odyssey_sessions FOR UPDATE USING (auth.uid() = user_id);

-- ═══════════════════════════════════════════════════════════
-- RECEIPTS LEDGER (Truth Kernel memory)
-- ═══════════════════════════════════════════════════════════
CREATE TABLE receipts_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id TEXT NOT NULL,
  source TEXT NOT NULL,
  evidence JSONB NOT NULL,
  confidence NUMERIC(4,3) CHECK (confidence >= 0 AND confidence <= 1),
  truth_state truth_state DEFAULT 'queued',
  content_hash TEXT,
  session_id UUID REFERENCES odyssey_sessions(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_receipts_claim ON receipts_ledger(claim_id);
CREATE INDEX idx_receipts_session ON receipts_ledger(session_id);
ALTER TABLE receipts_ledger ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own receipts" ON receipts_ledger FOR SELECT
  USING (session_id IN (SELECT id FROM odyssey_sessions WHERE user_id = auth.uid()));

-- ═══════════════════════════════════════════════════════════
-- MOIRAI PACKAGES
-- ═══════════════════════════════════════════════════════════
CREATE TABLE moirai_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES odyssey_sessions(id) ON DELETE CASCADE,
  step_number INT NOT NULL,
  provider TEXT NOT NULL,
  package_type package_type NOT NULL,
  status package_status DEFAULT 'active',
  content JSONB NOT NULL,
  score NUMERIC(5,2),
  pass_threshold NUMERIC(5,2) DEFAULT 70.00,
  passed BOOLEAN,
  tokens_used INT,
  cost_estimate NUMERIC(8,4),
  latency_ms INT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (session_id, step_number, package_type)
);

CREATE INDEX idx_packages_session ON moirai_packages(session_id);
ALTER TABLE moirai_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own packages" ON moirai_packages FOR SELECT
  USING (session_id IN (SELECT id FROM odyssey_sessions WHERE user_id = auth.uid()));

-- ═══════════════════════════════════════════════════════════
-- PROMPT REGISTRY
-- ═══════════════════════════════════════════════════════════
CREATE TABLE prompt_registry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  engine_key TEXT NOT NULL,
  moirai_stage TEXT NOT NULL,
  task_type TEXT NOT NULL DEFAULT 'default',
  version INT NOT NULL DEFAULT 1,
  prompt_text TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  performance_score NUMERIC(5,2),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (engine_key, moirai_stage, task_type, version)
);

CREATE INDEX idx_prompts_active ON prompt_registry(engine_key, moirai_stage, task_type) WHERE is_active = true;

-- ═══════════════════════════════════════════════════════════
-- SCORING
-- ═══════════════════════════════════════════════════════════
CREATE TABLE scoring_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_type TEXT NOT NULL UNIQUE,
  categories JSONB NOT NULL,
  pass_threshold NUMERIC(5,2) DEFAULT 70.00,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE scoring_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES odyssey_sessions(id),
  package_id UUID REFERENCES moirai_packages(id),
  template_id UUID REFERENCES scoring_templates(id),
  scores JSONB NOT NULL,
  overall_score NUMERIC(5,2) NOT NULL,
  passed BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════
-- PROVIDER HEALTH
-- ═══════════════════════════════════════════════════════════
CREATE TABLE provider_health (
  provider_key TEXT PRIMARY KEY,
  status provider_status DEFAULT 'healthy',
  latency_ms INT,
  error_rate NUMERIC(4,3) DEFAULT 0,
  last_checked_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO provider_health (provider_key) VALUES ('openai'), ('gemini'), ('anthropic');

-- ═══════════════════════════════════════════════════════════
-- EVENT LOG
-- ═══════════════════════════════════════════════════════════
CREATE TABLE event_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES odyssey_sessions(id),
  event_type TEXT NOT NULL,
  payload JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_events_session ON event_log(session_id);

-- Enable Realtime on event_log for live UI updates
ALTER PUBLICATION supabase_realtime ADD TABLE event_log;
-- ═══════════════════════════════════════════════════
-- WiVViW Migration 002: Stack Elevation Patch
-- March 2026 model updates + audit infrastructure
-- ═══════════════════════════════════════════════════

-- Add DeepSeek to provider health
INSERT INTO provider_health (provider_key) VALUES ('deepseek')
ON CONFLICT (provider_key) DO NOTHING;

-- System-wide audit log (trust-first platform requires action traceability)
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES wivviw_users(id),
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  metadata JSONB DEFAULT '{}'::jsonb,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_audit_user ON audit_log(user_id);
CREATE INDEX idx_audit_action ON audit_log(action);
CREATE INDEX idx_audit_entity ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_created ON audit_log(created_at DESC);

-- RLS: users can read their own audit entries, service role writes all
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own audit" ON audit_log FOR SELECT
  USING (auth.uid() = user_id);

-- Model configuration table (pin versions, track upgrades)
CREATE TABLE IF NOT EXISTS model_registry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_key TEXT NOT NULL,
  model_key TEXT NOT NULL,
  model_string TEXT NOT NULL,
  tier TEXT NOT NULL DEFAULT 'flagship',
  is_active BOOLEAN DEFAULT true,
  cost_input_per_1m NUMERIC(8,4),
  cost_output_per_1m NUMERIC(8,4),
  cost_cached_per_1m NUMERIC(8,4),
  context_window INT,
  notes TEXT,
  activated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (provider_key, model_key, model_string)
);

-- Seed current March 2026 models
INSERT INTO model_registry (provider_key, model_key, model_string, tier, cost_input_per_1m, cost_output_per_1m, cost_cached_per_1m, context_window, notes) VALUES
  ('openai', 'flagship', 'gpt-5.2', 'complex', 1.75, 14.00, 0.875, 400000, 'GPT-5.2 flagship. Enterprise-grade stability.'),
  ('openai', 'fast', 'gpt-4.1-mini', 'simple', 0.40, 1.60, 0.10, 128000, 'Fast/cheap for routing & classification.'),
  ('openai', 'reasoning', 'o3', 'critical', 2.00, 16.00, NULL, 200000, 'Deep reasoning. Use sparingly.'),
  ('gemini', 'flagship', 'gemini-2.5-pro', 'complex', 1.25, 10.00, 0.3125, 1000000, '1M context. Best multimodal ingestion.'),
  ('gemini', 'fast', 'gemini-2.5-flash', 'medium', 0.15, 0.60, 0.0375, 1000000, 'Fast Gemini. Good for audit passes.'),
  ('anthropic', 'flagship', 'claude-sonnet-4-6-20250514', 'complex', 3.00, 15.00, 0.30, 200000, 'Sonnet 4.6. Best instruction adherence.'),
  ('anthropic', 'premium', 'claude-opus-4-6-20250514', 'critical', 5.00, 25.00, 0.50, 200000, 'Opus 4.6. Max quality. Critical tasks only.'),
  ('anthropic', 'fast', 'claude-haiku-4-5-20251001', 'simple', 0.80, 4.00, 0.08, 200000, 'Haiku. Budget Anthropic.'),
  ('deepseek', 'flagship', 'deepseek-chat', 'utility', 0.28, 0.42, 0.028, 128000, 'V3.2 unified. Utility layer.'),
  ('deepseek', 'reasoning', 'deepseek-reasoner', 'utility', 0.55, 2.19, NULL, 128000, 'R1 reasoning. Cheap deep thought.');
