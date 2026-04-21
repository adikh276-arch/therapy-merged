
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Button } from '../components/ui/button';

const languages = [
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
    { code: 'tl', name: 'Filipino' },
];

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang);
        // Update URL without refreshing if needed, or just let it be
        const url = new URL(window.location.href);
        url.searchParams.set('lang', lang);
        window.history.pushState({}, '', url);
    };

    const currentLanguage = languages.find((l) => l.code === i18n.language) || languages[0];

    return (
        <div className="fixed top-4 right-4 z-[100]">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 bg-background/80 backdrop-blur-sm border-wellness-blue-light/30 shadow-sm hover:shadow-md transition-all rounded-full px-4">
                        <Globe className="h-4 w-4 text-primary" />
                        <span className="font-medium">{currentLanguage.name}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="max-h-[300px] overflow-y-auto rounded-xl border-wellness-blue-light/20 shadow-xl p-1 bg-background/95 backdrop-blur-md">
                    {languages.map((lang) => (
                        <DropdownMenuItem
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`rounded-lg cursor-pointer transition-colors ${i18n.language === lang.code ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-accent'
                                }`}
                        >
                            {lang.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default LanguageSelector;
