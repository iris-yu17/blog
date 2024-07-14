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
import { getDictionary } from '@/utils/dictionaries';

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
  params: { [key: string]: string };
}) {
  const dict = await getDictionary(lang, 'common');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* GA */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DVX887EQQJ"
        />
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-DVX887EQQJ');
        `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="flex">
            <SideNav dict={dict}/>
            <div className="hidden md:block">
              <SideMenu dict={dict}/>
            </div>
            <Header dict={dict}/>
            <main className="w-full border-l border-border pb-20 font-rbtm">
              <PageTab />
              <div className="h-full px-4 pt-12 md:px-6 md:pt-0">
                {children}
              </div>
            </main>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}