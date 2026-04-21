import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
    { code: 'zh-CN', name: '简体中文' },
    { code: 'ja', name: '日本語' },
    { code: 'id', name: 'Bahasa Indonesia' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'ko', name: '한국어' },
    { code: 'ru', name: 'Русский' },
    { code: 'it', name: 'Italiano' },
    { code: 'pl', name: 'Polski' },
    { code: 'th', name: 'ไทย' },
    { code: 'tl', name: 'Tagalog' }
];

export function LanguageSelector() {
    const { i18n } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const lang = searchParams.get('lang');
        if (lang && languages.some(l => l.code === lang)) {
            i18n.changeLanguage(lang);
        }
    }, [searchParams, i18n]);

    const handleLanguageChange = (value: string) => {
        i18n.changeLanguage(value);
        setSearchParams({ lang: value });
    };

    return (
        <div className="fixed top-4 right-4 z-50">
            <Select value={i18n.language.split('-')[0]} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[180px] bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all shadow-sm">
                    <Globe className="w-4 h-4 mr-2 text-primary" />
                    <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                    {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
