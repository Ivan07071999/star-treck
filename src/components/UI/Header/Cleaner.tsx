'use client';

import { MyButton } from '../button';
import { useAppDispatch } from '../../../hooks';
import { api } from '../../../services';
import { setAllSeasons } from '../../../store';
import { t } from '../../../utils/internationalization';

const CacheCleaner = ({ locale }: { locale: string }) => {
  const dispatch = useAppDispatch();

  const handleResetCache = () => {
    dispatch(api.util.resetApiState());
    dispatch(setAllSeasons([]));
  };

  return (
    <div>
      <MyButton onClick={handleResetCache}>{t(locale, 'buttons.resetCache')}</MyButton>
    </div>
  );
};

export default CacheCleaner;
