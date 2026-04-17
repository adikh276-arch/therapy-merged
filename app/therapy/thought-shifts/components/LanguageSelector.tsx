import { useTranslation } from "react-i18next";
import { Button } from "@/app/therapy/thought-shifts/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/app/therapy/thought-shifts/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

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
    { code: "id", name: "Indonesia" },
    { code: "tr", name: "Türkçe" },
    { code: "vi", name: "Tiếng Việt" },
    { code: "ko", name: "한국어" },
    { code: "ru", name: "Русский" },
    { code: "it", name: "Italiano" },
    { code: "pl", name: "Polski" },
    { code: "th", name: "ไทย" },
    { code: "tl", name: "Filipino" },
];

export function LanguageSelector() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("language", lng);
    };

    return (
        <div className="fixed top-4 right-4 z-50">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm border-border/50 shadow-sm">
                        <Globe className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="max-h-[300px] overflow-y-auto">
                    {languages.map((lang) => (
                        <DropdownMenuItem
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={i18n.language === lang.code ? "bg-accent font-medium" : ""}
                        >
                            {lang.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
