import { useTranslation, type LangCode } from '@/hooks/useTranslation';
import { Globe } from 'lucide-react';

interface Props {
  lang: LangCode;
  setLang: (code: LangCode) => void;
  languages: readonly { code: string; label: string }[];
}

export default function LanguageSelector({ lang, setLang, languages }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <select
        value={lang}
        onChange={e => setLang(e.target.value as LangCode)}
        className="bg-secondary border border-border rounded-lg px-2 py-1 text-sm text-foreground appearance-none cursor-pointer"
      >
        {languages.map(l => (
          <option key={l.code} value={l.code}>{l.label}</option>
        ))}
      </select>
    </div>
  );
}
