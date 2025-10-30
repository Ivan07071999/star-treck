import { t } from '../../../utils/internationalization';

export const createNavigation = (locale: string) => {
  return [
    { href: '/about', label: t(locale, 'navbar.about') },
    { href: '/', label: t(locale, 'navbar.seasons') },
  ];
};
