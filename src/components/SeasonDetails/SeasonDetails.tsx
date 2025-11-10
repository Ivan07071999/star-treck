'use client';

import {
  MyButton,
  SeasonHeader,
  EpisodeList,
  Loader,
  useAppDispatch,
  setSelectedSeasonUid,
  seasonAPI,
  useAppSelector,
} from '../../index';
import { t } from '../../utils/internationalization';
import './SeasonDetails.css';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export const SeasonDetails = ({ locale }: { locale: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const { selectedSeasonUid } = useAppSelector((state) => state.UIReducer);
  const {
    data: seasonData,
    error,
    isLoading,
  } = seasonAPI.useGetSeasonByIdQuery(selectedSeasonUid || '', {
    skip: !selectedSeasonUid,
  });

  const handleButtonClick = () => {
    dispatch(setSelectedSeasonUid(null));
    const params = new URLSearchParams(searchParams.toString());
    params.delete('seasonId');
    const url = `${pathname}?${params.toString()}`;
    router.push(url);
  };

  if (!selectedSeasonUid) {
    return (
      <aside className="details-container">
        <p>{t(locale, 'details.title')}</p>
      </aside>
    );
  }

  return (
    <aside className="details-container">
      <MyButton onClick={handleButtonClick}>{t(locale, 'details.button')}</MyButton>
      {error && <h1>An error occurred while fetching season details</h1>}
      {isLoading ? (
        <Loader />
      ) : seasonData ? (
        <>
          <SeasonHeader season={seasonData.season} />
          <EpisodeList episodes={seasonData.season.episodes} />
        </>
      ) : (
        <p>{t(locale, 'details.title')}</p>
      )}
    </aside>
  );
};
