import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import { Locales } from '@/types/enum/locales';
import { GoogleAnalytics } from '@next/third-parties/google';
import { ThemeProvider } from './[lang]/helper/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IRIS Studio',
  description: 'Iris 的前端開發筆記',
  manifest: '/manifest.json',
  openGraph: {
    images: `${process.env.NEXT_PUBLIC_HOST}/icon-512x512.png`,
  },
};

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { [key: string]: string; lang: Locales };
}) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* Google AdSense */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
          crossOrigin="anonymous"
        />
      </head>
      {/* GA */}
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
