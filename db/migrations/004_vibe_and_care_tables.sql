
-- vibe_tracker
CREATE TABLE IF NOT EXISTS vibe_tracker.vibe_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES core.users(id),
  vibe TEXT,
  reflections JSONB,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- care_tracker
CREATE TABLE IF NOT EXISTS care_tracker.selfcare_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES core.users(id),
  date DATE,
  did_self_care BOOLEAN,
  activities TEXT[],
  duration TEXT,
  prevention_reasons TEXT[],
  helpful_type TEXT,
  mood TEXT,
  mood_emoji TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- physical_activity_log
CREATE TABLE IF NOT EXISTS physical_activity_log.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES core.users(id),
  date DATE,
  emoji TEXT,
  name TEXT,
  duration INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
