import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/therapy/affirmations/components/ui/select";

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

export const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang);

        // Update URL without refreshing
        const url = new URL(window.location.href);
        url.searchParams.set("lang", lang);
        window.history.pushState({}, '', url);
    };

    return (
        <div className="absolute right-4 top-4 z-50">
            <Select value={i18n.language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[140px] bg-background/50 backdrop-blur-sm border-none shadow-none focus:ring-0">
                    <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                    {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
