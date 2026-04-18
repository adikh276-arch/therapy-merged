import { ReactNode } from "react";

interface ActivityCardProps {
  children: ReactNode;
  className?: string;
}

export function ActivityCard({ children, className = "" }: ActivityCardProps) {
  return (
    <div
      className={`bg-card rounded-lg shadow-md p-6 md:p-8 ${className}`}
      style={{ borderRadius: "16px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
    >
      {children}
    </div>
  );
}
