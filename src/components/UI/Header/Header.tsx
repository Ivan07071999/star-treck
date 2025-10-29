import { Suspense } from 'react';
import { Navbar } from '../../../index';
import './header.css';
import ReduxProvider from '../../../providers/ReduxProvider';
import ThemeButton from './ThemeButton';
import CacheCleaner from './Cleaner';
import en from '../../../locales/en.json';
import ru from '../../../locales/ru.json';

const messages = { en, ru };

export const Header = ({ locale }: { locale: string }) => {
  const t = (key: string): string => {
    const keys = key.split('.');
    let translation: any = messages[locale as keyof typeof messages];
    keys.forEach((k) => {
      translation = translation?.[k];
    });
    return translation || key;
  };

  return (
    <header className={`header light`}>
      <h1 className="title">{t('title')}</h1>
      <Navbar locale={locale} />
      <div>
        <a href={`/?locale=en`}>En</a>
        <a href={`/?locale=ru`}>Ru</a>
      </div>
      <Suspense>
        <ReduxProvider>
          <CacheCleaner locale={locale} />
          <ThemeButton />
        </ReduxProvider>
      </Suspense>
    </header>
  );
};
