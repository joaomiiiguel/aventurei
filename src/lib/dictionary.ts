import 'server-only';
import { locales, type Locale, defaultLocale, isValidLocale } from './i18n-config';

const dictionaries = {
  'pt-br': () => import('@/dictionaries/pt-br.json').then((module) => module.default),
  'es': () => import('@/dictionaries/es.json').then((module) => module.default),
  'en': () => import('@/dictionaries/en.json').then((module) => module.default),
};

export { locales, defaultLocale, isValidLocale };
export type { Locale };

export const getDictionary = async (locale: string) => {
  // If locale isn't one of our supported locales, fallback to pt-br
  if (!isValidLocale(locale)) {
    return dictionaries[defaultLocale]();
  }
  return dictionaries[locale as Locale]();
};

