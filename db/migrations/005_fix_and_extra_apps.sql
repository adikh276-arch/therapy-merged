
-- Fix personal_mission_statement.missions
DROP TABLE IF EXISTS personal_mission_statement.missions;
CREATE TABLE personal_mission_statement.missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES core.users(id),
  statement TEXT,
  values TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- doodle_burst
CREATE TABLE IF NOT EXISTS doodle_burst.doodles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES core.users(id),
  image_url TEXT,
  doodle_id TEXT, -- For compatibility with existing code
  created_at TIMESTAMPTZ DEFAULT NOW()
);
