import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Globe, Check } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";

const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "pt", name: "Português" },
    { code: "de", name: "Deutsch" },
    { code: "ar", name: "العربية" },
    { code: "hi", name: "हिन्दी" },
    { code: "bn", name: "বাংলা" },
    { code: "zh-CN", name: "简体中文" },
    { code: "ja", name: "日本語" },
    { code: "id", name: "Bahasa Indonesia" },
    { code: "tr", name: "Türkçe" },
    { code: "vi", name: "Tiếng Việt" },
    { code: "ko", name: "한국어" },
    { code: "ru", name: "Русский" },
    { code: "it", name: "Italiano" },
    { code: "pl", name: "Polski" },
    { code: "th", name: "ไทย" },
    { code: "fil", name: "Filipino" },
];

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const lang = searchParams.get("lang");
        if (lang) {
            const matchedLang = languages.find(l => l.code.toLowerCase() === lang.toLowerCase());
            if (matchedLang && i18n.language !== matchedLang.code) {
                i18n.changeLanguage(matchedLang.code);
            }
        }
    }, [searchParams, i18n]);

    const currentLanguage = languages.find((l) => l.code === i18n.language) || languages[0];

    return (
        <div className="fixed top-4 right-4 z-50">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 px-3 font-body text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                    >
                        <Globe className="mr-2 h-4 w-4" />
                        {currentLanguage.name}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="max-h-[400px] overflow-y-auto bg-background/95 backdrop-blur-sm border-border">
                    {languages.map((lang) => (
                        <DropdownMenuItem
                            key={lang.code}
                            onClick={() => i18n.changeLanguage(lang.code)}
                            className={cn(
                                "flex items-center justify-between cursor-pointer py-2 px-3 focus:bg-accent/50",
                                i18n.language === lang.code ? "bg-accent/30 text-foreground" : "text-muted-foreground"
                            )}
                        >
                            <span className="font-body text-sm">{lang.name}</span>
                            {i18n.language === lang.code && <Check className="h-4 w-4 ml-2" />}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default LanguageSelector;
