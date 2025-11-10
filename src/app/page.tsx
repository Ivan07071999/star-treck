import { Suspense } from 'react';
import { MainPage } from '../components/MainPage/MainPage';
import { SeasonService } from './API';
import ReduxProvider from '../providers/ReduxProvider';
import { Header } from '../components';
import { images } from '../data';

const page = async ({ searchParams }: { searchParams: Promise<{ locale?: string }> }) => {
  const { locale = 'en' } = await searchParams;

  const data = await SeasonService.getAll();
  const dataOfImages = data.seasons.map((item, index) => {
    const image = images[index];

    const imageSrc =
      typeof image.src === 'string'
        ? {
            src: image.src,
            width: 300,
            height: 200,
          }
        : image.src;

    return {
      ...item,
      image: {
        ...image,
        src: imageSrc,
      },
    };
  });

  return (
    <>
      <Header locale={locale} />
      <ReduxProvider>
        <Suspense>
          <div className={`app`}>
            <MainPage seasons={dataOfImages} locale={locale} />
          </div>
        </Suspense>
      </ReduxProvider>
    </>
  );
};

export default page;
