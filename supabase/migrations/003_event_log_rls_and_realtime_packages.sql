-- Secure event_log for Realtime + browser clients; live package rows for MOIRAI UI

ALTER TABLE event_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own session events" ON event_log FOR SELECT
  USING (
    session_id IS NOT NULL
    AND session_id IN (SELECT id FROM odyssey_sessions WHERE user_id = auth.uid())
  );

-- moirai_packages: stream new/updated rows into the session UI
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'moirai_packages'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE moirai_packages;
  END IF;
END $$;
