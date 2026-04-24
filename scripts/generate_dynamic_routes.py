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
    
    route_line = '{{ path: "{}/{}/*", element: <Suspense fallback={{<div className="p-8 text-center text-slate-500 font-sans">Loading...</div>}}><{} /></Suspense> }}'.format(path_prefix, slug, feat["camel"])
    routes_b.append(route_line)

# TEMPLATE WITHOUT DOUBLE BRACES FOR JS (using different markers)
template = """import React, { Suspense } from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { SelfCareResources } from "./components/SelfCareResources";
import { StaticContentViewer } from "../components/StaticContentViewer";
import { AuthGuard } from "../components/AuthGuard";

// Dynamic Imports
__IMPORTS__

function ProtectedLayout() {
  return (
    <AuthGuard>
      <Outlet />
    </AuthGuard>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <SelfCareResources /> },
      { path: "concerns/:concern/:type", element: <StaticContentViewer /> },
      
      {
        element: <ProtectedLayout />,
        children: [
          __ROUTES_B__
        ]
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ]
  }
], { basename: "/therapy" });
"""

final_routes = template.replace("__IMPORTS__", "\n".join(imports))
# Note: we need to handle the { } in route_line carefully.
# Our route_line already has {{ and }} in it from the previous script which was also wrong.
# Let's fix route_line here.
routes_b_fixed = [r.replace("{{", "{").replace("}}", "}") for r in routes_b]

final_routes = final_routes.replace("__ROUTES_B__", ",\n          ".join(routes_b_fixed))

with open(routes_file, 'w', encoding='utf-8') as f:
    f.write(final_routes)

print(f"Success. Fixed and generated {len(feature_list)} routes.")
