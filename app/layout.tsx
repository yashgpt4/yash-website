import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Yash Vijaykar',
    template: '%s — Yash Vijaykar',
  },
  description:
    'Sensemaker. Builder. Pre-founder in training. Writing about startups, mental health, and AI.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yashvijaykar.com',
    siteName: 'Yash Vijaykar',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@yashvijaykar',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
