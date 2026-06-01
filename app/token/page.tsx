import { redirect } from 'next/navigation';

export const metadata = {
  title: "Redirecting | TherapyMantra",
  description: "Redirecting you to the authentication portal...",
};

export default function TokenPage() {
  const authPortalUrl = process.env.VITE_AUTH_PORTAL_URL || 'https://auth.mantracare.com';
  redirect(authPortalUrl);
}
