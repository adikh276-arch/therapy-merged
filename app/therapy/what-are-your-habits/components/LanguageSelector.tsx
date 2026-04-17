import { useTranslation } from "react-i18next";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/therapy/what-are-your-habits/components/ui/select";
import { useNavigate, useLocation } from "react-router-dom";

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
    const navigate = useNavigate();
    const location = useLocation();

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);

        // Update URL parameter
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("lang", lang);
        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    return (
        <div className="fixed top-4 right-4 z-50">
            <Select value={i18n.language} onValueChange={changeLanguage}>
                <SelectTrigger className="w-[140px] bg-background/80 backdrop-blur-sm border-border">
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

export default LanguageSelector;
