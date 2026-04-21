
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Financial Tips",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return <>{children}</>;
}
