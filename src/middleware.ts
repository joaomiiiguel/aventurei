import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n-config";
import { updateSession } from "@/utils/supabase/middleware";
import { createServerClient } from "@supabase/ssr";

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

export async function middleware(request: NextRequest) {
  // 1. Update Supabase session
  let response = await updateSession(request);
  const { pathname } = request.nextUrl;

  // 2. Ignore internal paths and assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return response;
  }

  // 3. Redirect old /home URLs to localized root
  if (pathname.endsWith('/home')) {
    const newPath = pathname.replace(/\/home$/, '') || '/';
    request.nextUrl.pathname = newPath;
    return NextResponse.redirect(request.nextUrl);
  }

  // 4. Check if pathname already has locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  let currentLocale: typeof locales[number] = defaultLocale;
  if (pathnameHasLocale) {
    currentLocale = pathname.split('/')[1] as typeof locales[number];
  } else {
    // Redirect to locale for paths without it
    currentLocale = getLocale(request) as typeof locales[number];
    const newUrl = new URL(`/${currentLocale}${pathname}`, request.url);
    // Copy search params
    request.nextUrl.searchParams.forEach((value, key) => {
      newUrl.searchParams.set(key, value);
    });
    return NextResponse.redirect(newUrl);
  }

  // 5. Route Protection
  const protectedRoutes = ['/dashboard', '/profile'];
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === `/${currentLocale}${route}` || pathname.startsWith(`/${currentLocale}${route}/`)
  );

  if (isProtectedRoute) {
    // Check auth status
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            response = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      const loginUrl = new URL(`/${currentLocale}/login`, request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
