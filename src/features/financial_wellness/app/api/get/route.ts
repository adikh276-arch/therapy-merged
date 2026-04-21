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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const key = searchParams.get('key');

    if (!userId || !key) {
      return NextResponse.json({ error: 'Missing userId or key' }, { status: 400 });
    }

    const tableName = KEY_TO_TABLE[key];
    if (!tableName) {
      return NextResponse.json({ error: 'Invalid key' }, { status: 400 });
    }

    let query = '';
    let values = [userId];

    // History tables and Quiz tables return multiple rows
    const isMultiRow = tableName.includes('_history') || tableName.includes('quiz_results');

    if (isMultiRow) {
      if (tableName.includes('quiz_results')) {
        query = `
          SELECT data, score, quiz_type, created_at 
          FROM ${tableName} 
          WHERE user_id = $1 AND quiz_type = $2 
          ORDER BY created_at DESC 
          LIMIT 10
        `;
        values = [userId, key];
      } else {
        query = `
          SELECT data, updated_at as created_at
          FROM ${tableName} 
          WHERE user_id = $1
          ORDER BY updated_at DESC 
          LIMIT 10
        `;
      }
    } else {
      query = `SELECT data FROM ${tableName} WHERE user_id = $1`;
    }

    const res = await pool.query(query, values);

    if (res.rows.length === 0) {
      return NextResponse.json({ data: isMultiRow ? [] : null });
    }

    if (isMultiRow) {
      return NextResponse.json({ 
        data: res.rows.map(r => {
          // Flatten data if its an array (legacy format)
          const detail = Array.isArray(r.data) ? r.data[0] : (typeof r.data === 'object' ? r.data : {});
          return {
            ...detail,
            score: r.score || detail.score || detail.totalStress,
            date: r.created_at || detail.date
          };
        })
      });
    }

    return NextResponse.json({ data: res.rows[0].data });
  } catch (error: any) {
    console.error('Database fetch error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
