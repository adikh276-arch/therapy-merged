import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/therapy/self-care-bingo/components/ui/select';
import { Globe } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'pt', name: 'Português' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ar', name: 'العربية' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'id', name: 'Bahasa Indonesia' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'ko', name: '한국어' },
    { code: 'ru', name: 'Русский' },
    { code: 'it', name: 'Italiano' },
    { code: 'pl', name: 'Polski' },
    { code: 'th', name: 'ไทย' },
    { code: 'tl', name: 'Tagalog' },
];

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleLanguageChange = (value: string) => {
        i18n.changeLanguage(value);
        setSearchParams({ lang: value });
    };

    return (
        <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <Select value={i18n.language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[140px] bg-card border-none shadow-none focus:ring-0">
                    <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent align="end">
                    {LANGUAGES.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code} className="cursor-pointer">
                            {lang.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default LanguageSelector;
