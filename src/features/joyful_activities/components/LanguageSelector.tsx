import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '../i18n';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function LanguageSelector() {
    const { i18n } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const langParam = searchParams.get('lang');
        if (langParam) {
            const code = langParam.toLowerCase();
            // Handle special cases where URL case might differ but our list is exact format
            const matched = SUPPORTED_LANGUAGES.find(l => l.code.toLowerCase() === code);
            if (matched && i18n.language !== matched.code) {
                i18n.changeLanguage(matched.code);
            }
        }
    }, [searchParams, i18n]);

    const changeLanguage = (newLang: string) => {
        i18n.changeLanguage(newLang);
        // Update the URL to reflect language change without breaking other params if any
        setSearchParams(prev => {
            prev.set('lang', newLang);
            return prev;
        });
    };

    return (
        <div className="absolute top-4 right-4 z-50">
            <select
                value={i18n.resolvedLanguage || i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="bg-card text-foreground border border-primary/20 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer max-w-[200px]"
            >
                {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
