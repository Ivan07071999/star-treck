import { LocaleMessages } from '../types/localization';
import en from '../locales/en.json';
import ru from '../locales/ru.json';

const messages: Record<string, LocaleMessages> = { en, ru };

export const t = (locale: string, key: keyof LocaleMessages | string): string => {
  const keys = key.split('.');
  let translation: unknown = messages[locale as keyof typeof messages];

  keys.forEach((k) => {
    if (translation && typeof translation === 'object') {
      translation = (translation as Record<string, unknown>)[k];
    }
  });

  return typeof translation === 'string' ? translation : key;
};
