import React from 'react';
import { useTranslation } from "react-i18next";
const Token: React.FC = () => {
    return (
        <div className=" flex items-center justify-center bg-transparent text-foreground text-center p-4">
            <div>
                <h1 className="text-2xl font-bold text-destructive mb-2">{t("authentication_failed")}</h1>
                <p className="text-muted-foreground">{t("please_access_the_application_using_a_valid_token")}</p>
            </div>
        </div>
    );
};
export default Token;
