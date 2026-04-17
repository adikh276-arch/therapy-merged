import { useTranslation } from "react-i18next";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/app/therapy/anxiety-tips/components/ui/dropdown-menu";
import { Button } from "@/app/therapy/anxiety-tips/components/ui/button";
import { Languages } from "lucide-react";

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

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("language", lng);

        // Update URL with the selected language
        const url = new URL(window.location.href);
        url.searchParams.set("lang", lng);
        window.history.pushState({}, "", url.toString());
    };

    return (
        <div className="absolute top-4 right-5 z-50">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/40 transition-all">
                        <Languages className="h-5 w-5 text-foreground" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 max-h-[400px] overflow-y-auto backdrop-blur-md bg-white/90 border-white/20 shadow-xl">
                    {languages.map((lang) => (
                        <DropdownMenuItem
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`cursor-pointer transition-colors ${i18n.language === lang.code ? "bg-primary/10 font-bold text-primary" : "hover:bg-primary/5"}`}
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
