import { Suspense } from 'react';
import { MainPage } from '../components/MainPage/MainPage';
import { SeasonService } from './API';
import ReduxProvider from '../providers/ReduxProvider';
import { ThemeProvider } from '../context';
import { Header } from '../components';

const page = async ({ searchParams }: { searchParams: Promise<{ locale?: string }> }) => {
  const { locale = 'en' } = await searchParams;

  const data = await SeasonService.getAll();

  return (
    <ThemeProvider>
      <Header locale={locale} />
      <ReduxProvider>
        <Suspense>
          <div className={`app`}>
            <MainPage seasons={data.seasons} locale={locale} />
          </div>
        </Suspense>
      </ReduxProvider>
    </ThemeProvider>
  );
};

export default page;
