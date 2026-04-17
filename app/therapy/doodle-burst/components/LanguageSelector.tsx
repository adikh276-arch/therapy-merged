import { useTranslation } from "react-i18next";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/app/therapy/doodle-burst/components/ui/dropdown-menu";
import { Button } from "@/app/therapy/doodle-burst/components/ui/button";
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
        localStorage.setItem("language", lang);

        // Update URL without reloading page
        const url = new URL(window.location.href);
        url.searchParams.set("lang", lang);
        window.history.pushState({}, "", url.toString());
    };

    return (
        <div className="fixed top-4 right-4 z-[100]">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm shadow-soft">
                        <Globe className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="max-h-[300px] overflow-y-auto bg-card/95 backdrop-blur-sm border-border">
                    {languages.map((lang) => (
                        <DropdownMenuItem
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`cursor-pointer ${i18n.language === lang.code ? "bg-accent font-bold" : ""}`}
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
