import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SideNav from '@/components/side-nav';
import Header from '@/components/header';
import { Footer } from 'flowbite-react';
import SideMenu from '@/components/side-menu';
// import { ThemeProvider } from './helper/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* <ThemeProvider attribute="class" defaultTheme="dark"> */}
        <div className="bg-slate-600 sm:flex">
          <SideNav />
          <SideMenu />
          <Header />
          <main className="w-full px-6 py-4 font-rbtm">
            {children}
            <Footer.Divider />
            <Footer.Copyright
              href="#"
              by="All Rights Reserved. IRIS YU"
              year={2024}
              className="mb-6 text-center"
            />
          </main>
        </div>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
