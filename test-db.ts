import { neon } from '@neondatabase/serverless';
import { loadEnvConfig } from '@next/env';
loadEnvConfig(process.cwd());

const sql = neon(process.env.DATABASE_URL!);
sql(`INSERT INTO sleep_window_planner_entries (id, user_id, planner_data) VALUES ('test', 'test', 'test') ON CONFLICT (id) DO UPDATE SET planner_data = EXCLUDED.planner_data`)
  .then(res => console.log('SUCCESS:', res))
  .catch(err => console.error('ERROR:', err));
