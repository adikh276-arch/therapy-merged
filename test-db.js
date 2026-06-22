const { neon } = require('@neondatabase/serverless');
require('dotenv').config({path: '.env.local'});
const sql = neon(process.env.DATABASE_URL);
sql(`INSERT INTO sleep_window_planner_entries (id, user_id, planner_data) VALUES ('test', 'test', 'test') ON CONFLICT (id) DO UPDATE SET planner_data = EXCLUDED.planner_data`)
  .then(console.log)
  .catch(console.error);
