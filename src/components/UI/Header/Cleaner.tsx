'use client';

import { MyButton } from '../button';
import { useAppDispatch } from '../../../hooks';
import { api } from '../../../services';
import { setAllSeasons } from '../../../store';

const CacheCleaner = () => {
  const dispatch = useAppDispatch();

  const handleResetCache = () => {
    dispatch(api.util.resetApiState());
    dispatch(setAllSeasons([]));
  };

  return (
    <div>
      <MyButton onClick={handleResetCache}>Reset cache</MyButton>
    </div>
  );
};

export default CacheCleaner;
