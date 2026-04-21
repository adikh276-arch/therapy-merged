import os
import re

features_dir = r"d:\Downloads\Therapy Merged\src\features"
routes_file = r"d:\Downloads\Therapy Merged\src\app\routes.tsx"

feature_list = []

for feature_name in os.listdir(features_dir):
    f_root = os.path.join(features_dir, feature_name)
    if not os.path.isdir(f_root):
        continue
    target_index = os.path.join(f_root, "index.tsx")
    
    if os.path.exists(target_index):
        with open(target_index, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # Strip all existing BrowserRouters entirely
        content = re.sub(r'<(?:BrowserRouter|HashRouter)[^>]*>', '<React.Fragment>', content)
        content = re.sub(r'</(?:BrowserRouter|HashRouter)>', '</React.Fragment>', content)
        
        # Fix relative imports
        content = content.replace('from "@/', 'from "./')
        
        if "import React" not in content and "React." in content:
            content = "import React from 'react';\n" + content
        elif "import React" not in content and "Fragment" in content:
            content = "import React from 'react';\n" + content

        with open(target_index, 'w', encoding='utf-8') as f:
            f.write(content)
            
        camel_name = "".join([x.capitalize() for x in feature_name.split("_")])
        if camel_name[0].isdigit():
             camel_name = "App" + camel_name
        
        feature_list.append({"name": feature_name, "camel": camel_name})

imports = []
routes_b = []

for feat in feature_list:
    slug = feat["name"].replace("_", "-")
    path_prefix = "tools"
    if any(k in feat["name"] for k in ["tracker", "log", "diary", "app", "consumption", "craving", "mood", "sleep", "withdrawal"]):
        path_prefix = "trackers"
    elif any(k in feat["name"] for k in ["breathing", "grounding", "technique", "exercise"]):
        path_prefix = "exercises"
    elif "tips" in feat["name"]:
        path_prefix = "tips"
    
    imports.append(f'const {feat["camel"]} = React.lazy(() => import("../features/{feat["name"]}"));')
    
    # Use triple quotes for multiline or just avoid direct f-string braces for React props
    route_line = '{{ path: "{}/{}/*", element: <Suspense fallback={{<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}}><{} /></Suspense> }}'.format(path_prefix, slug, feat["camel"])
    routes_b.append(route_line)

template = """import React, { Suspense } from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { SelfCareResources } from "./components/SelfCareResources";
import { StaticContentViewer } from "../components/StaticContentViewer";
import { AuthGuard } from "../components/AuthGuard";

// Dynamic Imports
{IMPORTS}

function ProtectedLayout() {{
  return (
    <AuthGuard>
      <Outlet />
    </AuthGuard>
  );
}}

export const router = createBrowserRouter([
  {{
    path: "/",
    children: [
      {{ index: true, element: <SelfCareResources /> }},
      {{ path: "concerns/:concern/:type", element: <StaticContentViewer /> }},
      
      {{
        element: <ProtectedLayout />,
        children: [
          {ROUTES_B}
        ]
      }},
      {{ path: "*", element: <Navigate to="/" replace /> }},
    ]
  }}
], {{ basename: "/therapy" }});
"""

final_routes = template.replace("{IMPORTS}", "\n".join(imports))
final_routes = final_routes.replace("{ROUTES_B}", ",\n          ".join(routes_b))

with open(routes_file, 'w', encoding='utf-8') as f:
    f.write(final_routes)

print(f"Success. Generated {len(feature_list)} routes.")
