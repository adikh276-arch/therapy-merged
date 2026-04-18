"use client";
import { useTranslation } from "react-i18next";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/app/a-pause-for-appreciation/components/ui/dropdown-menu";
import { Button } from "@/app/a-pause-for-appreciation/components/ui/button";
import { Globe } from "lucide-react";
import { useEffect } from "react";

const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "pt", name: "Português" },
    { code: "de", name: "Deutsch" },
    { code: "ar", name: "العربية" },
    { code: "hi", name: "हिन्दी" },
    { code: "bn", name: "বাংলা" },
    { code: "zh", name: "中文" },
    { code: "ja", name: "日本語" },
    { code: "id", name: "Bahasa Indonesia" },
    { code: "tr", name: "Türkçe" },
    { code: "vi", name: "Tiếng Việt" },
    { code: "ko", name: "한국어" },
    { code: "ru", name: "Русский" },
    { code: "it", name: "Italiano" },
    { code: "pl", name: "Polski" },
    { code: "th", name: "ไทย" },
    { code: "tl", name: "Filipino" },
];

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (code: string) => {
        i18n.changeLanguage(code);
        localStorage.setItem("language", code);

        // Update URL param
        const url = new URL(window.location.href);
        url.searchParams.set("lang", code);
        window.history.pushState({}, "", url.toString());
    };

    const currentLanguage = languages.find((l) => l.code === i18n.language) || languages[0];

    return (
        <div className="fixed top-4 right-4 z-50">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/5 transition-all duration-300">
                        <Globe className="mr-2 h-4 w-4 text-primary/60" />
                        <span className="font-body text-xs font-medium">{currentLanguage.name}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="max-h-[300px] overflow-y-auto bg-background/95 backdrop-blur-md border-primary/10">
                    {languages.map((lang) => (
                        <DropdownMenuItem
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`text-xs font-body ${i18n.language === lang.code ? "bg-primary/10 text-primary" : ""
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
