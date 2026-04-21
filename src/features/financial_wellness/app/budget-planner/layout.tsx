
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Budget Planner",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return <>{children}</>;
}
