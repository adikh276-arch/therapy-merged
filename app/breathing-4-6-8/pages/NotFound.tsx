"use client";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{t("breathing_4_6_8.not_found_title")}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t("breathing_4_6_8.not_found_text")}</p>
        <a href="/therapy/breathing-4-6-8" className="text-primary underline hover:text-primary/90">
          {t("breathing_4_6_8.return_home")}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
