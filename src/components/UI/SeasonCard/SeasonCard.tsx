'use client';
import './SeasonCars.css';
import { setSelectedSeasonUid, useAppDispatch, useAppSelector, type Season } from '../../../index';
import { toggleItemSelection, type SelectedItem } from '../../../store/reducers/SelectedItemsSlice';
import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';

type SeasonCardProps = {
  season: Season;
  aboveTheFold?: boolean;
};

export const SeasonCard = ({ season, aboveTheFold = false }: SeasonCardProps) => {
  const dispatch = useAppDispatch();
  const [isSelected, setIsSelected] = useState(false);

  const selectedItems = useAppSelector((state) => state.selectedItemsReducer.items);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const isCurrentlySelected = selectedItems.some((item) => item.uid === season.uid);
    setIsSelected(isCurrentlySelected);
  }, [selectedItems, season.uid]);

  const handleClick = () => {
    dispatch(setSelectedSeasonUid(season.uid));
    const params = new URLSearchParams(searchParams.toString());
    params.set('seasonId', season.uid);
    const url = `${pathname}?${params.toString()}`;
    router.push(url);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const url = `${window.location.origin}${pathname}?seasonId=${season.uid}`;

    const newItem: SelectedItem = {
      uid: season.uid,
      title: season.title,
      seriesTitle: season.series.title,
      seasonNumber: season.seasonNumber,
      numberOfEpisodes: season.numberOfEpisodes,
      url,
    };

    dispatch(toggleItemSelection(newItem));
  };

  return (
    <div className="season-card" onClick={handleClick}>
      <Image
        src={season.image.src.src}
        alt={season.image.alt}
        width={season.image.src.width}
        height={season.image.src.height}
        loading={'eager'}
        priority={aboveTheFold}
        className="season-image"
      />
      <div className="card-header">
        <h3 className="season-title">{season.title}</h3>
        <input
          type="checkbox"
          className="season-checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <p>
        <strong>Series: </strong> {season.series.title}{' '}
      </p>{' '}
      <p>
        <strong>Season number:</strong> {season.seasonNumber}{' '}
      </p>{' '}
      <p>
        <strong>Number of episodes: </strong>
        {season.numberOfEpisodes !== null ? season.numberOfEpisodes : 'Unknown'}{' '}
      </p>
      <div className="card-footer">
        <span className="click-hint">Click for details</span>
      </div>
    </div>
  );
};
