
export const locales = ['pt-br', 'es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pt-br';

export function isValidLocale(locale: string): locale is Locale {
  return (locales as readonly string[]).includes(locale);
}
