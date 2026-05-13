import { Buffer } from "buffer";
if (typeof window !== "undefined") {
    window.Buffer = Buffer;
}

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n";
import { initDb } from "./lib/db";
import { useTranslation } from "react-i18next";

// Initialize database schema on startup
initDb();

createRoot(document.getElementById("root")!).render(<App />);
