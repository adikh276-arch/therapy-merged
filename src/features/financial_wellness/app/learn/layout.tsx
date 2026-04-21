
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Financial Learn Hub",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return <>{children}</>;
}
