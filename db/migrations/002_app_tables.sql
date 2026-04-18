
-- App-specific tables inferred from code

-- daily_gratitude_diary
CREATE TABLE IF NOT EXISTS daily_gratitude_diary.gratitude_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES core.users(id),
  date TEXT,
  feeling TEXT,
  gratitudes JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- know_your_values
CREATE TABLE IF NOT EXISTS know_your_values.reflections (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES core.users(id),
  date DATE DEFAULT CURRENT_DATE,
  value_emoji TEXT,
  value_name TEXT,
  reflection TEXT,
  action TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- gratitude_tracker
CREATE TABLE IF NOT EXISTS gratitude_tracker.gratitude_entries (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES core.users(id),
  date DATE,
  gratitude1 TEXT,
  gratitude2 TEXT,
  mood_emoji TEXT,
  mood_label TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- personal_mission_statement
CREATE TABLE IF NOT EXISTS personal_mission_statement.missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES core.users(id),
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
