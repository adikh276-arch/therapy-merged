import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { languages } from "@/data/languages";

interface LanguageSwitcherProps {
  currentLang: string;
  onChangeLang: (code: string) => void;
}

export default function LanguageSwitcher({ currentLang, onChangeLang }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = languages.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.code.toLowerCase().includes(search.toLowerCase())
  );

  const current = languages.find((l) => l.code === currentLang);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
        <span className="uppercase text-xs tracking-wide">{current?.code || "EN"}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 max-h-[70vh] overflow-hidden rounded-2xl bg-white shadow-2xl border border-border/80 z-[100] flex flex-col animate-fade-in-up">
          <div className="p-3 border-b border-border/50 bg-secondary/30">
            <input
              type="text"
              placeholder="Search language..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg bg-secondary px-3 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
              autoFocus
            />
          </div>
          <div className="overflow-y-auto flex-1">
            {filtered.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onChangeLang(lang.code);
                  setOpen(false);
                  setSearch("");
                }}
                className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center justify-between border-b border-border/10 last:border-0 ${lang.code === currentLang
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-foreground bg-white hover:bg-secondary/50"
                  }`}
              >
                <span>{lang.nativeName || lang.name}</span>
                <span className="text-xs text-muted-foreground uppercase">{lang.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
