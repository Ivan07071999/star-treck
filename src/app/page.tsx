import { Suspense } from 'react';
import { MainPage } from '../components/MainPage/MainPage';
import { SeasonService } from './API';
import ReduxProvider from '../providers/ReduxProvider';
import { ThemeProvider } from '../context';
import { Header } from '../components';

const page = async () => {
  const data = await SeasonService.getAll();
  return (
    <ThemeProvider>
      <Header />
      <ReduxProvider>
        <Suspense>
          <div className={`app`}>
            <MainPage seasons={data.seasons} />
          </div>
        </Suspense>
      </ReduxProvider>
    </ThemeProvider>
  );
};

export default page;
