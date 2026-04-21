import { LingoDotDevEngine } from "lingo.dev/sdk";

export const lingo = new LingoDotDevEngine({
    apiKey: import.meta.env.VITE_LINGO_API_KEY,
    project: "every-symbols-win",
});
