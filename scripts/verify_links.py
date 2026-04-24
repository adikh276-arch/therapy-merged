import re

def verify_links():
    routes_file = r"D:\Downloads\Therapy Merged\src\app\routes.tsx"
    resources_file = r"D:\Downloads\Therapy Merged\src\app\components\SelfCareResources.tsx"
    
    with open(routes_file, "r", encoding="utf-8") as f:
        routes_content = f.read()
        
    with open(resources_file, "r", encoding="utf-8") as f:
        resources_content = f.read()
        
    # Extract routes
    # { path: "exercises/5-4-3-2-1-grounding/*", ... }
    routes = re.findall(r'path:\s*["\']([^"\']+)["\']', routes_content)
    # clean routes (remove /*)
    clean_routes = [r.replace("/*", "") for r in routes]
    
    # Extract links from resources
    # url: "/exercises/5-4-3-2-1-grounding"
    links = re.findall(r'url:\s*["\']([^"\']+)["\']', resources_content)
    
    print("Verifying links...")
    for link in links:
        if link.startswith("http") or link.startswith("/therapy/"):
            continue
        
        # remove leading slash for comparison
        target = link.lstrip("/")
        
        if target not in clean_routes:
            print(f"MISSING ROUTE: {link} (target: {target})")
            
            # Try to find a similar route
            basename = target.split("/")[-1]
            matches = [r for r in clean_routes if basename in r]
            if matches:
                print(f"  Suggested fix: {matches[0]}")

if __name__ == "__main__":
    verify_links()
