import os
import re

features_dir = r"d:\Downloads\Therapy Merged\src\features"

for root, dirs, files in os.walk(features_dir):
    if "index.tsx" in files:
        f_path = os.path.join(root, "index.tsx")
        with open(f_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # This regex tries to find the block matching: const App = () => ( ... );
        # and replaces it with a clean version.
        new_content = re.sub(
            r'const App = \(\) => \((.*?)\);',
            r'''const App = () => (
  <>
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </>
);''',
            content,
            flags=re.DOTALL
        )
        
        # Ensure i18n import and Suspense import are present if we use them
        if 'import { Suspense }' not in new_content:
            new_content = 'import { Suspense } from "react";\n' + new_content
            
        if new_content != content:
            with open(f_path, 'w', encoding='utf-8') as f:
                f.write(new_content)

print("Features reset to a standard, balanced JSX structure.")
