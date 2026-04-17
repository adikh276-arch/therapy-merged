"use client";

import { useEffect, useRef } from "react";

interface StaticRendererProps {
  html: string;
}

export default function StaticRenderer({ html }: StaticRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Re-execute scripts
      const scripts = containerRef.current.querySelectorAll("script");
      scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach((attr) =>
          newScript.setAttribute(attr.name, attr.value)
        );
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });
    }
  }, [html]);

  // We use dangerouslySetInnerHTML for the styles and body
  // However, near-perfect isolation is better with iframe if we want to avoid CSS leakage.
  // But iframe makes it harder to share Auth state.
  // Let's try direct injection first, scoped if possible.
  
  return (
    <div 
      ref={containerRef}
      className="static-app-container w-full min-h-screen"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
