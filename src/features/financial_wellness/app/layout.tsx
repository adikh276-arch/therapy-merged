
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { I18nProvider } from '@/components/I18nProvider';
import AuthGuard from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: {
    default: 'Financial Wellness — Master Your Money',
    template: '%s | Financial Wellness'
  },
  description: 'A premium financial wellness platform with tools, education, and insights to transform your financial health.',
  keywords: 'financial wellness, budget planner, investment planner, EMI calculator, goal planner',
  icons: {
    icon: [
      { url: '/financial_wellbeing/favicon.png' },
    ],
    apple: [
      { url: '/financial_wellbeing/favicon.png' },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#F7F8FC" />
      </head>
      <body className="antialiased">
        <I18nProvider>
          <AuthGuard>
            <div className="app-shell">
              {children}
            </div>
          </AuthGuard>
        </I18nProvider>
      </body>
    </html>
  );
}
