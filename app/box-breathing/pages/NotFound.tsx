"use client";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{t("box_breathing.not_found_404")}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t("box_breathing.page_not_found")}</p>
        <a href="/therapy/box-breathing" className="text-primary underline hover:text-primary/90">
          {t("box_breathing.return_home")}
        </a>
      </div>
    </div>
  );
};

export default NotFound;

