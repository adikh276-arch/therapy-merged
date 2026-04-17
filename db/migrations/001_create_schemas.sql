-- 001_create_schemas.sql

-- Core (shared users + sessions)
CREATE SCHEMA IF NOT EXISTS core;
CREATE TABLE IF NOT EXISTS core.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS core.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES core.users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL
);

-- One schema per mini
CREATE SCHEMA IF NOT EXISTS daily_gratitude_diary;
CREATE SCHEMA IF NOT EXISTS breathing_4_6_8;
CREATE SCHEMA IF NOT EXISTS box_breathing;
CREATE SCHEMA IF NOT EXISTS grounding_5_4_3_2_1;
CREATE SCHEMA IF NOT EXISTS grounded_technique;
CREATE SCHEMA IF NOT EXISTS affirmations;
CREATE SCHEMA IF NOT EXISTS joyful_activities;
CREATE SCHEMA IF NOT EXISTS thought_shifts;
CREATE SCHEMA IF NOT EXISTS diffusion_technique;
CREATE SCHEMA IF NOT EXISTS brain_dump_and_sort;
CREATE SCHEMA IF NOT EXISTS doodle_burst;
CREATE SCHEMA IF NOT EXISTS personal_mission_statement;
CREATE SCHEMA IF NOT EXISTS a_letter_to_self;
CREATE SCHEMA IF NOT EXISTS know_your_values;
CREATE SCHEMA IF NOT EXISTS environment_optimization;
CREATE SCHEMA IF NOT EXISTS a_pause_for_appreciation;
CREATE SCHEMA IF NOT EXISTS what_are_your_habits;
CREATE SCHEMA IF NOT EXISTS self_care_bingo;
CREATE SCHEMA IF NOT EXISTS physical_activity_log;
CREATE SCHEMA IF NOT EXISTS gratitude_tracker;
CREATE SCHEMA IF NOT EXISTS vibe_tracker;
CREATE SCHEMA IF NOT EXISTS care_tracker;
CREATE SCHEMA IF NOT EXISTS real_stories_anxiety;
CREATE SCHEMA IF NOT EXISTS depression_tips;
CREATE SCHEMA IF NOT EXISTS stress_tips;
CREATE SCHEMA IF NOT EXISTS anxiety_tips;
CREATE SCHEMA IF NOT EXISTS sexuality_tips;
CREATE SCHEMA IF NOT EXISTS depression_articles;
CREATE SCHEMA IF NOT EXISTS depression_stories;
CREATE SCHEMA IF NOT EXISTS depression_myths;
CREATE SCHEMA IF NOT EXISTS anxiety_articles;
CREATE SCHEMA IF NOT EXISTS anxiety_stories;
CREATE SCHEMA IF NOT EXISTS anxiety_myths;
CREATE SCHEMA IF NOT EXISTS stress_articles;
CREATE SCHEMA IF NOT EXISTS stress_stories;
CREATE SCHEMA IF NOT EXISTS stress_myths;
CREATE SCHEMA IF NOT EXISTS adolescent_articles;
CREATE SCHEMA IF NOT EXISTS adolescent_tips;
CREATE SCHEMA IF NOT EXISTS adolescent_stories;
CREATE SCHEMA IF NOT EXISTS adolescent_myths;
CREATE SCHEMA IF NOT EXISTS relationship_articles;
CREATE SCHEMA IF NOT EXISTS relationship_tips;
CREATE SCHEMA IF NOT EXISTS relationship_stories;
CREATE SCHEMA IF NOT EXISTS relationship_myths;
CREATE SCHEMA IF NOT EXISTS workplace_articles;
CREATE SCHEMA IF NOT EXISTS workplace_tips;
CREATE SCHEMA IF NOT EXISTS workplace_stories;
CREATE SCHEMA IF NOT EXISTS workplace_myths;
CREATE SCHEMA IF NOT EXISTS sleep_articles;
CREATE SCHEMA IF NOT EXISTS sleep_tips;
CREATE SCHEMA IF NOT EXISTS sleep_stories;
CREATE SCHEMA IF NOT EXISTS sleep_myths;
CREATE SCHEMA IF NOT EXISTS parenting_articles;
CREATE SCHEMA IF NOT EXISTS parenting_tips;
CREATE SCHEMA IF NOT EXISTS parenting_stories;
CREATE SCHEMA IF NOT EXISTS parenting_myths;
CREATE SCHEMA IF NOT EXISTS anger_articles;
CREATE SCHEMA IF NOT EXISTS anger_tips;
CREATE SCHEMA IF NOT EXISTS anger_stories;
CREATE SCHEMA IF NOT EXISTS anger_myths;
CREATE SCHEMA IF NOT EXISTS grief_articles;
CREATE SCHEMA IF NOT EXISTS grief_tips;
CREATE SCHEMA IF NOT EXISTS grief_stories;
CREATE SCHEMA IF NOT EXISTS grief_myths;
CREATE SCHEMA IF NOT EXISTS ptsd_articles;
CREATE SCHEMA IF NOT EXISTS ptsd_tips;
CREATE SCHEMA IF NOT EXISTS ptsd_stories;
CREATE SCHEMA IF NOT EXISTS ptsd_myths;
CREATE SCHEMA IF NOT EXISTS acceptance_articles;
CREATE SCHEMA IF NOT EXISTS acceptance_tips;
CREATE SCHEMA IF NOT EXISTS acceptance_stories;
CREATE SCHEMA IF NOT EXISTS acceptance_myths;
CREATE SCHEMA IF NOT EXISTS postpartum_articles;
CREATE SCHEMA IF NOT EXISTS postpartum_tips;
CREATE SCHEMA IF NOT EXISTS postpartum_stories;
CREATE SCHEMA IF NOT EXISTS postpartum_myths;
CREATE SCHEMA IF NOT EXISTS sexuality_articles;
CREATE SCHEMA IF NOT EXISTS sexuality_stories;
CREATE SCHEMA IF NOT EXISTS sexuality_myths;
CREATE SCHEMA IF NOT EXISTS eating_disorder_articles;
CREATE SCHEMA IF NOT EXISTS eating_disorder_tips;
CREATE SCHEMA IF NOT EXISTS eating_disorder_stories;
CREATE SCHEMA IF NOT EXISTS eating_disorder_myths;
