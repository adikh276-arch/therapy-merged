// app/therapy/layout.tsx
import React, { ReactNode, Suspense } from "react";
import { AuthGuard } from "@/lib/auth";

export default function TherapyLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthGuard>
        {children}
      </AuthGuard>
    </Suspense>
  );
}
