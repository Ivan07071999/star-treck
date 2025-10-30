import { Header } from '../../components';
import { t } from '../../utils/internationalization';

const About = async ({ searchParams }: { searchParams: Promise<{ locale?: string }> }) => {
  const { locale = 'en' } = await searchParams;

  return (
    <>
      <Header locale={locale} />
      <main style={{ width: '300px', margin: '40px auto' }}>
        <h1>{t(locale, 'about.title')}</h1>
        <p>{t(locale, 'about.description')}</p>
      </main>
    </>
  );
};

export default About;
