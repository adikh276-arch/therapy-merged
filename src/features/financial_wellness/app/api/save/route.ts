import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

const KEY_TO_TABLE: Record<string, string> = {
  'financial_health_score': 'financial_wellbeing.health_scores',
  'budget': 'financial_wellbeing.budgets',
  'investment_form': 'financial_wellbeing.investment_plans',
  'goals': 'financial_wellbeing.goals',
  'loan_emi_form': 'financial_wellbeing.loan_calculations',
  'emergency_fund': 'financial_wellbeing.emergency_funds',
  'loan_history': 'financial_wellbeing.loan_history',
  'budget_history': 'financial_wellbeing.budget_history',
  'emergency_fund_history': 'financial_wellbeing.emergency_fund_history',
  'spending_style_history': 'financial_wellbeing.spending_style_history',
  'invest_history': 'financial_wellbeing.investment_history',
  'health_score_history': 'financial_wellbeing.health_score_history',
  'money_stress_history': 'financial_wellbeing.quiz_results',
  'savings_checkup_history': 'financial_wellbeing.quiz_results',
  'investment_readiness_history': 'financial_wellbeing.quiz_results',
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, key, data } = body;
    const score = body.score ?? data?.score;

    if (!userId || !key) {
      return NextResponse.json({ error: 'Missing userId or key' }, { status: 400 });
    }

    const tableName = KEY_TO_TABLE[key];

    if (!tableName) {
      // Fallback or generic metric storage
      return NextResponse.json({ success: true, message: 'Key not mapped to specialized table, skipping db insert' });
    }

    let query = '';
    let values: any[] = [];

    // History tables and Quiz tables should always INSERT a new row
    const isHistoryTable = tableName.includes('_history') || tableName.includes('quiz_results');

    if (isHistoryTable) {
      query = `
        INSERT INTO ${tableName} (user_id, data, updated_at)
        VALUES ($1, $2, NOW())
      `;
      // Handle quiz_results specifically if it has a score column
      if (tableName.includes('quiz_results')) {
        query = `
          INSERT INTO ${tableName} (user_id, quiz_type, score, data, created_at)
          VALUES ($1, $2, $3, $4, NOW())
        `;
        values = [userId, key, score || 0, JSON.stringify(data)];
      } else {
        values = [userId, JSON.stringify(data)];
      }
    } else {
      // Primary state tables (Upsert)
      const tablesWithScore = ['financial_wellbeing.health_scores'];
      
      if (tablesWithScore.includes(tableName)) {
        query = `
          INSERT INTO ${tableName} (user_id, score, data, updated_at)
          VALUES ($1, $2, $3, NOW())
          ON CONFLICT (user_id) DO UPDATE SET
            score = EXCLUDED.score,
            data = EXCLUDED.data,
            updated_at = NOW()
        `;
        values = [userId, score || 0, JSON.stringify(data)];
      } else {
        query = `
          INSERT INTO ${tableName} (user_id, data, updated_at)
          VALUES ($1, $2, NOW())
          ON CONFLICT (user_id) DO UPDATE SET
            data = EXCLUDED.data,
            updated_at = NOW()
        `;
        values = [userId, JSON.stringify(data)];
      }
    }

    await pool.query(query, values);

    return NextResponse.json({ success: true, message: `Data persisted to ${tableName} successfully` });
  } catch (error: any) {
    console.error('Database persistence error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
