import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { Locales } from "./types/enum/locales";

let locales = [Locales.enUS, Locales.zhHant];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const locale = path.split('/')[1];
  const response = NextResponse.next();

  /**
   * 設置 cookie
   */
  // 檢查 cookie 是否有語系了
  const cookieLocale = request.cookies.get('locale')?.value;
  response.cookies.set('locale', locale);

  /**
   * 雙語功能
   */
  // 檢查 pathname 是否有語系了
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // 若沒有語系就 redirect
  if (!pathnameHasLocale) {
    const defaultLocale = cookieLocale || Locales.zhHant;
    request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  };


  return response;
}

export const config = {
  matcher: [
    // skip if: markdown, manifest.json, svg, png
    '/((?!markdown|manifest.json|_next|.*\\.svg$|.*\\.png$).*)',
  ],
};