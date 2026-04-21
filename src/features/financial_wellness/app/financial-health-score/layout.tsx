
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Financial Health Score",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return <>{children}</>;
}
