
import { useTranslation } from "react-i18next";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/therapy/environment-optimization/components/ui/select";
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

export function LanguageSelector() {
    const { i18n } = useTranslation();

    const handleLanguageChange = (value: string) => {
        i18n.changeLanguage(value);
        localStorage.setItem("language", value);
    };

    return (
        <div className="absolute top-4 right-4 z-50">
            <Select onValueChange={handleLanguageChange} defaultValue={i18n.language}>
                <SelectTrigger className="w-[180px] bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-colors">
                    <Globe className="w-4 h-4 mr-2 text-primary" />
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
}
