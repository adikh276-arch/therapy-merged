import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEnergy, EnergyLevel } from "../context/EnergyContext";
import { Home, History } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { format, subDays } from "date-fns";

const levelToNum: Record<EnergyLevel, number> = {
  "very-low": 1,
  low: 2,
  okay: 3,
  good: 4,
  high: 5,
};

const WeeklyOverview = () => {
  const { entries } = useEnergy();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const numToLabel: Record<number, string> = {
    1: t("very_low"),
    2: t("low"),
    3: t("okay"),
    4: t("good"),
    5: t("high"),
  };

  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(today, 6 - i);
    const dateStr = format(date, "yyyy-MM-dd");
    const entry = entries.find((e) => e.date === dateStr);
    return {
      day: format(date, "EEE"),
      date: dateStr,
      value: entry ? levelToNum[entry.level] : null,
    };
  });

  const filledDays = days.filter((d) => d.value !== null);
  const avgValue = filledDays.length
    ? Math.round(filledDays.reduce((s, d) => s + (d.value || 0), 0) / filledDays.length)
    : null;

  const hasEnoughData = filledDays.length >= 3;

  return (
    <PremiumLayout 
      title={t("weekly_title")}
      icon={<History className="h-6 w-6" />}
    >
      <div className="w-full">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-xl font-bold text-slate-900"
        >
          {t("your_weekly")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border-2 border-slate-100 mb-6 p-6 shadow-sm"
        >
          {filledDays.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-400 font-medium">
              {t("no_entries")}
            </p>
          ) : (
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={days}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 11, fill: "#94A3B8", fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[1, 5]}
                    ticks={[1, 2, 3, 4, 5]}
                    tickFormatter={(v) => numToLabel[v] || ""}
                    tick={{ fontSize: 10, fill: "#94A3B8", fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                    width={60}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "20px",
                      border: "none",
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                      padding: "12px 16px"
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#10B981"
                    strokeWidth={4}
                    dot={{ r: 6, fill: "#10B981", stroke: "white", strokeWidth: 3 }}
                    connectNulls
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>

        {(hasEnoughData && avgValue) ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-primary/5 rounded-3xl p-6 border-2 border-primary/10"
          >
            <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-2">
              {t("insight")}
            </h3>
            <p className="text-slate-600 font-bold leading-relaxed">
              {avgValue >= 4
                ? t("insight_high")
                : avgValue >= 3
                  ? t("insight_okay")
                  : t("insight_low")}
            </p>
          </motion.div>
        ) : filledDays.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-50 rounded-3xl p-6 border-2 border-slate-100"
          >
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">
              {t("insight")}
            </h3>
            <p className="text-slate-500 font-bold leading-relaxed">
              {t("insight_more_data")}
            </p>
          </motion.div>
        )}
      </div>
    </PremiumLayout>
  );
};

export default WeeklyOverview;
