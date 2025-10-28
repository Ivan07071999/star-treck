import { Suspense } from 'react';
import { Navbar } from '../../../index';
import './header.css';
import ReduxProvider from '../../../providers/ReduxProvider';
import ThemeButton from './ThemeButton';
import CacheCleaner from './Cleaner';

export const Header = () => {
  return (
    <header className={`header light`}>
      <h1 className="title">Star Trek</h1>
      <Navbar />
      <Suspense>
        <ReduxProvider>
          <CacheCleaner />
          <ThemeButton />
        </ReduxProvider>
      </Suspense>
    </header>
  );
};
