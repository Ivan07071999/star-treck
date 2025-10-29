'use client';

// import { MyButton } from '../button';
// import { useAppDispatch } from '../../../hooks';
// import { api } from '../../../services';
// import { setAllSeasons } from '../../../store';

// const CacheCleaner = () => {
//   const dispatch = useAppDispatch();

//   const handleResetCache = () => {
//     dispatch(api.util.resetApiState());
//     dispatch(setAllSeasons([]));
//   };

//   return (
//     <div>
//       <MyButton onClick={handleResetCache}>Reset cache</MyButton>
//     </div>
//   );
// };

// export default CacheCleaner;
import { MyButton } from '../button';
import { useAppDispatch } from '../../../hooks';
import { api } from '../../../services';
import { setAllSeasons } from '../../../store';
import en from '../../../locales/en.json';
import ru from '../../../locales/ru.json';

const messages = { en, ru };

const CacheCleaner = ({ locale }: { locale: string }) => {
  const dispatch = useAppDispatch();

  const t = (key: string): string => {
    const keys = key.split('.');
    let translation: any = messages[locale as keyof typeof messages];
    keys.forEach((k) => {
      translation = translation?.[k];
    });
    return translation || key;
  };

  const handleResetCache = () => {
    dispatch(api.util.resetApiState());
    dispatch(setAllSeasons([]));
  };

  return (
    <div>
      <MyButton onClick={handleResetCache}>{t('buttons.resetCache')}</MyButton>
    </div>
  );
};

export default CacheCleaner;
