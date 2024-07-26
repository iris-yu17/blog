import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages } from "@/i18n/settings";
import { i18nRouter } from 'next-i18n-router';

acceptLanguage.languages(languages);

export const config = {
  matcher: [
    // skip if match below
    '/((?!sitemap.xml|robots.txt|markdown|manifest.json|favicon.ico|_next|.*\\.svg$|.*\\.png$).*)',
  ],
};

const i18nConfig = {
  locales: languages,
  defaultLocale: fallbackLng
};

export function middleware(request: NextRequest) {
  return i18nRouter(request, i18nConfig);
}
