import { Suspense } from 'react';
import { Navbar } from '../../../index';
import './header.css';
import ReduxProvider from '../../../providers/ReduxProvider';
import ThemeButton from './ThemeButton';
import CacheCleaner from './Cleaner';
import { t } from '../../../utils/internationalization';

export const Header = ({ locale }: { locale: string }) => {
  return (
    <header className={`header light`}>
      <h1 className="title">{t(locale, 'title')}</h1>
      {/* <Navbar locale={locale} /> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar locale={locale} />
        <div>
          <a href={`/?locale=en`}>En</a>
          <a href={`/?locale=ru`}>Ru</a>
        </div>
      </Suspense>
      <Suspense>
        <ReduxProvider>
          <CacheCleaner locale={locale} />
          <ThemeButton />
        </ReduxProvider>
      </Suspense>
    </header>
  );
};
