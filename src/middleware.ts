import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n-config";

// Helper to find the best locale match
function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language');
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;

  if (cookieLocale && locales.includes(cookieLocale as any)) {
    return cookieLocale;
  }

  if (acceptLanguage) {
    const preferredLocale = acceptLanguage.split(',')[0].split('-')[0];
    if (preferredLocale === 'pt') return 'pt-br';
    if (preferredLocale === 'es') return 'es';
    if (preferredLocale === 'en') return 'en';
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Ignore internal paths and assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return;
  }

  // 2. Redirect old /home URLs to localized root
  if (pathname.endsWith('/home')) {
    const newPath = pathname.replace(/\/home$/, '') || '/';
    request.nextUrl.pathname = newPath;
    return NextResponse.redirect(request.nextUrl);
  }

  // 3. Check if pathname already has locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // 4. Redirect to locale for paths without it
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}



export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
