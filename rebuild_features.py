import os

features_dir = r"d:\Downloads\Therapy Merged\src\features"

feature_template = """import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { LanguageSelector } from "./components/LanguageSelector";
import "./i18n";

const App = () => (
  <Suspense fallback={<div className="flex items-center justify-center h-screen font-sans text-slate-500">Loading...</div>}>
    <LanguageSelector />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default App;
"""

# Exceptions for features with complex routes
complex_features = {
  "stress_tips": """import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TipDetail from "./pages/TipDetail";
import NotFound from "./pages/NotFound";
import { LanguageSelector } from "./components/LanguageSelector";
import "./i18n";

const App = () => (
  <Suspense fallback={<div className="flex items-center justify-center h-screen font-sans text-slate-500">Loading...</div>}>
    <LanguageSelector />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/tip/:slug" element={<TipDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default App;
""",
  # Add others if I find them, but most are simple index/notfound.
}

for feature_name in os.listdir(features_dir):
    f_path = os.path.join(features_dir, feature_name, "index.tsx")
    if not os.path.exists(f_path):
        continue
    
    # Check if we have a complex template
    template = complex_features.get(feature_name, feature_template)
    
    # Read original to check for special imports we might need
    with open(f_path, 'r', encoding='utf-8', errors='ignore') as f:
        original = f.read()
        
    # If the feature has "TipDetail", it's complex
    if "TipDetail" in original and feature_name not in complex_features:
        # We'll skip for now or handle manually
        continue

    with open(f_path, 'w', encoding='utf-8') as f:
        f.write(template)

print("Feature entry points REBUILT from clean templates.")
