"use client";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "@/app/depression-tips/i18n";
import { ChevronDown, Globe } from "lucide-react";

export default function LanguageSelector() {
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const currentLang =
        SUPPORTED_LANGUAGES.find((l) => l.code === i18n.language) ||
        SUPPORTED_LANGUAGES.find((l) => l.code === "en")!;

    // Close on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    function selectLanguage(code: string) {
        i18n.changeLanguage(code);
        setOpen(false);
        // Update URL param without page reload
        const url = new URL(window.location.href);
        url.searchParams.set("lang", code);
        window.history.replaceState({}, "", url.toString());
    }

    return (
        <div ref={ref} style={{ position: "relative", display: "inline-block", zIndex: 50 }}>
            {/* Trigger button */}
            <button
                onClick={() => setOpen((o) => !o)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 12px",
                    borderRadius: "999px",
                    border: "1.5px solid hsl(var(--border))",
                    background: "hsl(var(--card))",
                    color: "hsl(var(--foreground))",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                    transition: "all 0.15s",
                }}
                aria-label="Select language"
                aria-expanded={open}
            >
                <Globe style={{ width: 15, height: 15, opacity: 0.7 }} />
                <span>{currentLang.nativeLabel}</span>
                <ChevronDown
                    style={{
                        width: 13,
                        height: 13,
                        opacity: 0.6,
                        transform: open ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                    }}
                />
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    style={{
                        position: "absolute",
                        right: 0,
                        top: "calc(100% + 8px)",
                        width: "200px",
                        maxHeight: "320px",
                        overflowY: "auto",
                        background: "hsl(var(--card))",
                        border: "1.5px solid hsl(var(--border))",
                        borderRadius: "12px",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                        padding: "6px",
                    }}
                >
                    {SUPPORTED_LANGUAGES.map((lang) => {
                        const isActive = lang.code === i18n.language;
                        return (
                            <button
                                key={lang.code}
                                onClick={() => selectLanguage(lang.code)}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    padding: "8px 10px",
                                    borderRadius: "8px",
                                    border: "none",
                                    textAlign: "left",
                                    background: isActive ? "hsl(var(--accent))" : "transparent",
                                    cursor: "pointer",
                                    transition: "background 0.12s",
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "hsl(var(--accent)/0.5)";
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                                }}
                            >
                                <span style={{ fontSize: "13px", fontWeight: 600, color: "hsl(var(--foreground))" }}>
                                    {lang.nativeLabel}
                                </span>
                                <span style={{ fontSize: "11px", color: "hsl(var(--muted-foreground))" }}>
                                    {lang.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
