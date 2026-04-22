import { sql } from "@/lib/db";

export type EnergyLevel = "very-low" | "low" | "okay" | "good" | "high";

export interface EnergyEntry {
  date: string;
  level: EnergyLevel;
  factors: string[];
  note: string;
}

interface EnergyContextType {
  currentLevel: EnergyLevel | null;
  setCurrentLevel: (level: EnergyLevel | null) => void;
  currentFactors: string[];
  setCurrentFactors: (factors: string[]) => void;
  currentNote: string;
  setCurrentNote: (note: string) => void;
  entries: EnergyEntry[];
  saveEntry: () => void;
  refreshHistory: () => Promise<void>;
  isLoading: boolean;
}

const EnergyContext = createContext<EnergyContextType | undefined>(undefined);

export const useEnergy = () => {
  const ctx = useContext(EnergyContext);
  if (!ctx) throw new Error("useEnergy must be used within EnergyProvider");
  return ctx;
};

export const EnergyProvider = ({ children }: { children: ReactNode }) => {
  const [currentLevel, setCurrentLevel] = useState<EnergyLevel | null>(null);
  const [currentFactors, setCurrentFactors] = useState<string[]>([]);
  const [currentNote, setCurrentNote] = useState("");
  const [entries, setEntries] = useState<EnergyEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshHistory = useCallback(async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !sql) {
      console.warn("refreshHistory: No user_id or sql client found");
      return;
    }
    setIsLoading(true);
    try {
      console.log("Refreshing energy history for user:", userId);
      const rows = await (sql as any).query(
        "SELECT date, level, factors, note FROM energy_logs WHERE user_id = $1 ORDER BY date DESC",
        [userId]
      );
      
      const formattedEntries = (Array.isArray(rows) ? rows : (rows.rows || [])).map((row: any) => ({
        date: row.date instanceof Date ? row.date.toISOString().split('T')[0] : row.date,
        level: row.level as EnergyLevel,
        factors: Array.isArray(row.factors) ? row.factors : [],
        note: row.note || ""
      }));

      setEntries(formattedEntries);
    } catch (err) {
      console.error("Error refreshing energy history:", err);
      setEntries([]); 
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId) return;

    const init = async () => {
      await refreshHistory();
    };
    init();
  }, [refreshHistory]);

  const saveEntry = async () => {
    const userId = sessionStorage.getItem("user_id");
    console.log("Attempting to save energy entry. Level:", currentLevel, "User:", userId);
    
    if (!currentLevel || !userId || !sql) {
      console.error("Cannot save entry: missing level, user_id or sql client");
      return;
    }

    const dateStr = new Date().toISOString().split("T")[0];
    const entry: EnergyEntry = {
      date: dateStr,
      level: currentLevel,
      factors: currentFactors,
      note: currentNote,
    };

    setIsLoading(true);
    try {
      await (sql as any).query(
        `INSERT INTO energy_logs (user_id, date, level, factors, note) 
         VALUES ($1, $2, $3, $4, $5) 
         ON CONFLICT (user_id, date) 
         DO UPDATE SET level = EXCLUDED.level, factors = EXCLUDED.factors, note = EXCLUDED.note`,
        [userId, dateStr, currentLevel, currentFactors, currentNote]
      );

      console.log("Energy entry saved successfully to Neon");

      const updated = [entry, ...entries.filter((e) => e.date !== entry.date)];
      setEntries(updated);

      setCurrentLevel(null);
      setCurrentFactors([]);
      setCurrentNote("");
    } catch (err) {
      console.error("Saving entry to Neon failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EnergyContext.Provider
      value={{
        currentLevel,
        setCurrentLevel,
        currentFactors,
        setCurrentFactors,
        currentNote,
        setCurrentNote,
        entries,
        saveEntry,
        refreshHistory,
        isLoading,
      }}
    >
      {children}
    </EnergyContext.Provider>
  );
};
