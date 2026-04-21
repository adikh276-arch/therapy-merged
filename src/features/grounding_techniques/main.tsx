import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initI18n } from "./i18n/i18n";

// Initialize i18n before rendering so translations are ready
initI18n().then(() => {
    createRoot(document.getElementById("root")!).render(<App />);
});
