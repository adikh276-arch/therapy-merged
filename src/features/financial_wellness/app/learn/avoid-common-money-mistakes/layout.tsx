
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Common Money Mistakes",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return <>{children}</>;
}
