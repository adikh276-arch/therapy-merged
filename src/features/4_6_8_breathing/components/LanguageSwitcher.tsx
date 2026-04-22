import { useTranslation } from "react-i18next";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { Globe } from "lucide-react";

const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'pt', name: 'Português' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ar', name: 'العربية' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'zh', name: '简体中文' },
    { code: 'ja', name: '日本語' },
    { code: 'id', name: 'Bahasa Indonesia' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'ko', name: '한국어' },
    { code: 'ru', name: 'Русский' },
    { code: 'it', name: 'Italiano' },
    { code: 'pl', name: 'Polski' },
    { code: 'th', name: 'ไทย' },
    { code: 'tl', name: 'Filipino' }
];

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        const url = new URL(window.location.href);
        url.searchParams.set("lang", lng);
        window.history.pushState({}, "", url.toString());
    };

    const currentLanguage = languages.find(l => l.code === i18n.language.split('-')[0]) || languages[0];

    return (
        <div className="fixed top-4 right-4 z-50">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent/80 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 ">
                        <Globe className="h-4 w-4 text-primary" />
                        <span className="hidden sm:inline">{currentLanguage.name}</span>
                        <span className="sm:hidden font-mono uppercase">{currentLanguage.code}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="max-h-[300px] overflow-y-auto bg-transparent/95 backdrop-blur-md border border-primary/10  animate-in fade-in zoom-in duration-200">
                    {languages.map((lang) => (
                        <DropdownMenuItem
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`flex items-center gap-2 cursor-pointer transition-colors duration-200 ${i18n.language.startsWith(lang.code) ? "bg-primary/10 text-primary font-semibold" : "hover:bg-primary/5"
                                }`}
                        >
                            <span className="font-mono text-xs opacity-50 uppercase">{lang.code}</span>
                            <span>{lang.name}</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
