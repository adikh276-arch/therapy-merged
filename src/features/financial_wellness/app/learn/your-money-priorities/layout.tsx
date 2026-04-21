
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Your Money Priorities",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return <>{children}</>;
}
