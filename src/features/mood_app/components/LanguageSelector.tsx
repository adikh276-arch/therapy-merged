import { useTranslation, LANGUAGES } from '@/contexts/TranslationContext';
import { Globe } from 'lucide-react';

export default function LanguageSelector() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center gap-1.5 bg-secondary rounded-full px-3 py-1.5">
      <Globe className="w-3.5 h-3.5 text-muted-foreground" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-transparent text-xs font-semibold text-foreground border-none outline-none cursor-pointer appearance-none pr-1"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.short}
          </option>
        ))}
      </select>
    </div>
  );
}
