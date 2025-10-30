import { Header } from '../components';
import { t } from '../utils/internationalization';

const NotFoundPage = async ({ searchParams }: { searchParams: Promise<{ locale?: string }> }) => {
  const { locale = 'en' } = await searchParams;

  return (
    <>
      <Header locale={locale} />
      <main style={{ width: '300px', margin: '40px auto' }}>
        <h1>{t(locale, '404.title')}</h1>
        <p>{t(locale, '404.description')}</p>
      </main>
    </>
  );
};

export default NotFoundPage;
