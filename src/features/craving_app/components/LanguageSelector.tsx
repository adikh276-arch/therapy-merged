import type { LangCode } from '@/hooks/useTranslation';
import { Globe } from 'lucide-react';

interface Props {
  lang: LangCode;
  languages: readonly { code: string; label: string }[];
  onChange: (code: LangCode) => void;
}

export default function LanguageSelector({ lang, languages, onChange }: Props) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <select
        value={lang}
        onChange={e => onChange(e.target.value as LangCode)}
        className="rounded-lg border-none bg-transparent text-sm text-foreground focus:outline-none focus:ring-0 cursor-pointer pr-6 py-1"
      >
        {languages.map(l => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}
