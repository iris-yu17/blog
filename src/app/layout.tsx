import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SideNav from '@/components/side-nav';
import Header from '@/components/header';
import { ThemeProvider } from './helper/theme-provider';

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
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="bg-slate-600 sm:flex">
            <SideNav />
            <Header />
            <main className="m-2 rounded-xl bg-black-100 p-4 mt-16 sm:mt-0 md:w-full md:p-6 lg:p-12 xl:p-20">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
