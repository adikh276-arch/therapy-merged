
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "50/30/20 Rule",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return <>{children}</>;
}
