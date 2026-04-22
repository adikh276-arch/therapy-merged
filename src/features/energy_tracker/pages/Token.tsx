import { useTranslation } from "react-i18next";
import { LogIn } from "lucide-react";

const TokenPage = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-transparent p-6 text-center max-w-xl mx-auto">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <LogIn className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl font-heading font-semibold text-foreground mb-4">
                {t("token_required", "Authentication Required")}
            </h1>
            <p className="text-muted-foreground max-w-xs leading-relaxed">
                {t("token_message", "Please access this application through the official platform to log in.")}
            </p>
        </div>
    );
};

export default TokenPage;
