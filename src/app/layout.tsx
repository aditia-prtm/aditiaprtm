import type { Metadata, Viewport } from 'next';
import { Outfit, JetBrains_Mono } from 'next/font/google';
import { AppShell } from '@/components/layout';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aditia Pratama | Portfolio',
  description:
    'Aditia Pratama – Informatics Engineering student & Developer. Building clean, elegant, high-performance web applications.',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Aditia Pratama | Portfolio',
    description:
      'Informatics Engineering student & Developer. Building clean, elegant, high-performance web applications.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#080808',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased selection:bg-[#b8860b]/20 dark:selection:bg-[#d4af37]/20">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
