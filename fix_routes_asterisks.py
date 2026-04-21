import re

file_path = r"d:\Downloads\Therapy Merged\src\app\routes.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find feature paths and add /*
# example: path: "tips/stress",
# we want: path: "tips/stress/*",
# But only for features that we know have sub-routes.
# To be safe, we add it to all integrated feature paths.

# We look for lines like { path: "...", element: <... /> }
# but excluding things like ServicePage, AuthGuard, etc.
def fix_path(match):
    path = match.group(1)
    element = match.group(2)
    # Skip main app paths
    if path in ['/', 'self-care', 'concerns/:concern/:type', 'service/meditation', 'ocd', 'mindfulness-self-care', 'ocd-self-care', 'journal', 'journal-new', 'journal/:id', 'categories', 'subcategory/:subcategoryId', 'time/:timeId', 'meditation-detail/:meditationId', 'browse-by-goal-detail/:goalId', 'see-all/:section', 'collection-detail/:collectionId', 'daily-program/:programId', 'care-team', '*']:
        return match.group(0)
    
    if not path.endswith('/*'):
        return f'{{ path: "{path}/*", element: {element} }}'
    return match.group(0)

new_content = re.sub(r'\{\s*path:\s*["\']([^"\']+)["\']\s*,\s*element:\s*([^}]+)\s*\}', fix_path, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("routes.tsx updated with trailing asterisks for nested routing support.")
