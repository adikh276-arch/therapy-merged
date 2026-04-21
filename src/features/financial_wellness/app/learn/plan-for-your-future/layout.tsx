
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Plan for Your Future",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return <>{children}</>;
}
