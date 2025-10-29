import en from '../../../locales/en.json';
import ru from '../../../locales/ru.json';

const messages = { en, ru };

export const createNavigation = (locale: string) => {
  const t = (key: string): string => {
    const keys = key.split('.');
    let translation: any = messages[locale as keyof typeof messages];
    keys.forEach((k) => {
      translation = translation?.[k];
    });
    return translation || key;
  };

  return [
    { href: '/about', label: t('navbar.about') },
    { href: '/', label: t('navbar.seasons') },
  ];
};
