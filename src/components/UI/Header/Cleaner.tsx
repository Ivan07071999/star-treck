'use client';

import { MyButton } from '../button';
import { useAppDispatch } from '../../../hooks';
import { api } from '../../../services';
import { t } from '../../../utils/internationalization';
import { setSelectedSeasonUid } from '../../../store';

const CacheCleaner = ({ locale }: { locale: string }) => {
  const dispatch = useAppDispatch();

  const handleResetCache = () => {
    dispatch(setSelectedSeasonUid(null));
    dispatch(api.util.resetApiState());
  };

  return (
    <div>
      <MyButton onClick={handleResetCache}>{t(locale, 'buttons.resetCache')}</MyButton>
    </div>
  );
};

export default CacheCleaner;
