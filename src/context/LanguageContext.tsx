'use client';
import { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';

type Language = 'en' | 'ru';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Получаем язык из URL при монтировании
    const langParam = searchParams.get('lang');
    if (langParam === 'en' || langParam === 'ru') {
      setLanguageState(langParam);
    }
  }, [searchParams]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
