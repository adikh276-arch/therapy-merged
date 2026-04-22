import glob, os, re

def safe_replace(fpath, replacements):
    try:
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
    except: return

    orig = content
    for pattern, repl in replacements:
        content = re.sub(pattern, repl, content)
    
    if content != orig:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

# 1. Energy Tracker Fix
energy_idx = 'src/features/energy_tracker/index.tsx'
energy_repls = [
    (r'import React from \'react\';', 'import React from \'react\';\nimport { TooltipProvider } from "./components/ui/tooltip";\nimport { UniversalBackButton } from "../../components/UniversalBackButton";\nimport { Toaster } from "./components/ui/toaster";\nimport { Toaster as Sonner } from "./components/ui/sonner";')
]
safe_replace(energy_idx, energy_repls)

# 2. Care Tracker JSON Fix
care_db = 'src/features/care_tracker/lib/selfcare-data.ts'
care_repls = [
    (r'\${entry\.activities}', r'${JSON.stringify(entry.activities)}'),
    (r'\${entry\.preventionReasons}', r'${JSON.stringify(entry.preventionReasons)}')
]
safe_replace(care_db, care_repls)

# 3. Gratitude Tracker Auth Fix
grat_auth = 'src/features/daily_gratitude_diary/components/AuthGuard.tsx'
grat_repls = [
    (r'if \(existingUser && existingUser\.length === 0\)', r'if (!existingUser || existingUser.length === 0)'),
    (r'if \(res && res\.length === 0\)', r'if (!res || res.length === 0)')
]
safe_replace(grat_auth, grat_repls)

# 4. Global visibility fix (White text to slate-900)
# Use a more selective approach for features
for f in glob.glob('src/features/**/*.tsx', recursive=True):
    safe_replace(f, [(r'\btext-(?:white|slate-50|blue-50)\b', 'text-slate-900')])

# 5. Global length check fix
for f in glob.glob('src/features/**/*.tsx', recursive=True):
    # Only replace if not already guarded
    safe_replace(f, [(r'(?<!&& )(\w+)\.length\b', r'(\1 && \1.length)')])

print("Safe Multi-Fix completed.")
