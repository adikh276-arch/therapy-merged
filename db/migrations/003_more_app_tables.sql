
-- a-letter-to-self
CREATE TABLE IF NOT EXISTS a_letter_to_self.letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES core.users(id),
  content TEXT,
  emotional_state TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- brain-dump-and-sort
CREATE TABLE IF NOT EXISTS brain_dump_and_sort.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES core.users(id),
  date TIMESTAMPTZ DEFAULT NOW(),
  reflection TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS brain_dump_and_sort.thoughts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  local_id TEXT,
  session_id UUID REFERENCES brain_dump_and_sort.sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES core.users(id),
  text TEXT,
  bucket TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- knowledge-is-power / self-care-bingo etc.
-- I'll check self-care-bingo specifically
