import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './../globals.css';
import SideNav from '@/components/side-nav';
import Header from '@/components/header';
import SideMenu from '@/components/side-menu';
import Footer from '@/components/footer';
import PageTab from '@/components/page-tab';
import { ThemeProvider } from './helper/theme-provider';
import Script from 'next/script';
import { Theme } from '@/types/enum/theme';
import { languages } from '@/i18n/settings';
import TranslationsProvider from '@/components/translations-provider';
import initTranslations from '@/i18n';
import { Locales } from '@/types/enum/locales';
import { i18nNamespaces } from '@/i18n/settings';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IRIS Studio',
  description: 'Iris 的前端開發筆記',
  manifest: '/manifest.json',
  openGraph: {
    images: `${process.env.NEXT_PUBLIC_HOST}/icon-512x512.png`,
  },
};

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { [key: string]: string; lang: Locales };
}) {
  const { t, resources } = await initTranslations(lang, i18nNamespaces);

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
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={lang}
          resources={resources}
        >
          <ThemeProvider attribute="class" defaultTheme="dark">
            <div className="flex">
              <SideNav lang={lang} />
              <div className="hidden md:block">
                <SideMenu />
              </div>
              <Header />
              <main className="w-full border-l border-border pb-20 font-rbtm">
                <PageTab />
                <div className="h-full px-4 pt-12 md:px-6 md:pt-0">
                  {children}
                </div>
              </main>
            </div>
            <Footer />
          </ThemeProvider>
        </TranslationsProvider>
      </body>
    </html>
  );
}
