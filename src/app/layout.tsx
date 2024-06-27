import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SideNav from '@/components/side-nav';
import Header from '@/components/header';
import SideMenu from '@/components/side-menu';
import Footer from '@/components/footer';
import PageTab from '@/components/page-tab';
import { ThemeProvider } from './helper/theme-provider';
import { Theme } from '@/types/enum/theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IRIS Studio',
  description: 'Iris 的前端開發筆記',
  manifest: '/manifest.json',
  openGraph: {
    images: 'icon-512x512.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="flex">
            <SideNav />
            <div className="hidden md:block">
              <SideMenu />
            </div>
            <Header />
            <main className="w-full border-l border-border pb-20 font-rbtm">
              <PageTab />
              <div className="px-4 pt-10 md:px-6 md:pt-0">{children}</div>
            </main>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
