import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/app/stress-tips/components/ui/dropdown-menu";
import { Button } from "@/app/stress-tips/components/ui/button";

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
    { code: 'tl', name: 'Tagalog' },
];

export const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set("lang", lng);
        window.history.pushState({}, '', url);
        i18n.changeLanguage(lng);
    };

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    return (
        <div className="fixed top-4 right-4 z-50">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm border-muted shadow-sm gap-2 px-3">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span className="hidden sm:inline font-medium text-xs">{currentLanguage.name}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="max-h-[300px] overflow-y-auto w-[180px]">
                    {languages.map((lang) => (
                        <DropdownMenuItem
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className="flex items-center justify-between cursor-pointer"
                        >
                            <span className={i18n.language === lang.code ? "font-bold" : ""}>
                                {lang.name}
                            </span>
                            {i18n.language === lang.code && <Check className="w-4 h-4" />}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
