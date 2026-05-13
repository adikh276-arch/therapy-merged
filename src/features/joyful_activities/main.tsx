import { createRoot } from "react-dom/client";
import { Suspense } from "react";
import App from "./App.tsx";
import "./index.css";
import "./i18n";
import { useTranslation } from "react-i18next";

createRoot(document.getElementById("root")!).render(
    <Suspense fallback={<div>{t("common.loading")}</div>}>
        <App />
    </Suspense>
);
