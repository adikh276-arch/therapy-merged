
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Budgeting Basics",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return <>{children}</>;
}
