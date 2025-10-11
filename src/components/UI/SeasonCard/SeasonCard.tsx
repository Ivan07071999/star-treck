import './SeasonCars.css';
import { useAppDispatch, useAppSelector, type Season } from '../../../index';
import { useLocation, useNavigate } from 'react-router-dom';
import { detailsSlice } from '../../../store/reducers/DetailsSlice';
import { addItem, removeItem, type SelectedItem } from '../../../store/reducers/SelectedItemsSlice';
import { useState, useEffect } from 'react';

export const SeasonCard = ({ season }: { season: Season }) => {
  const dispatch = useAppDispatch();
  const { setSeasonUid } = detailsSlice.actions;
  const [isSelected, setIsSelected] = useState(false);

  const selectedItems = useAppSelector((state) => state.selectedItemsReducer.items);

  useEffect(() => {
    // Проверяем, выбран ли текущий элемент
    const isCurrentlySelected = selectedItems.some((item) => item.uid === season.uid);
    setIsSelected(isCurrentlySelected);
  }, [selectedItems, season.uid]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    dispatch(setSeasonUid(season.uid));

    const params = new URLSearchParams(location.search);
    params.set('seasonId', season.uid);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const checked = e.target.checked;

    if (checked) {
      // Формируем URL для деталей сезона
      const url = `${window.location.origin}/seasons?seasonId=${season.uid}`;

      const newItem: SelectedItem = {
        uid: season.uid,
        title: season.title,
        seriesTitle: season.series.title,
        seasonNumber: season.seasonNumber,
        numberOfEpisodes: season.numberOfEpisodes,
        url,
      };

      dispatch(addItem(newItem));
    } else {
      dispatch(removeItem(season.uid));
    }
  };

  return (
    <div className="season-card" onClick={handleClick}>
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

// import './SeasonCars.css';
// import { useAppDispatch, type Season } from '../../../index';

// import { useLocation, useNavigate } from 'react-router-dom';
// import { detailsSlice } from '../../../store/reducers/DetailsSlice';

// export const SeasonCard = ({ season }: { season: Season }) => {
//   const dispatch = useAppDispatch();
//   const { setSeasonUid } = detailsSlice.actions;

//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleClick = () => {
//     dispatch(setSeasonUid(season.uid));

//     const params = new URLSearchParams(location.search);
//     params.set('seasonId', season.uid);
//     navigate(`${location.pathname}?${params.toString()}`);
//   };

//   return (
//     <div className="season-card" onClick={handleClick}>
//       <h3 className="season-title">{season.title}</h3>
//       <p>
//         <strong>Series: </strong> {season.series.title}{' '}
//       </p>{' '}
//       <p>
//         <strong>Season number:</strong> {season.seasonNumber}{' '}
//       </p>{' '}
//       <p>
//         <strong>Number of episodes: </strong>
//         {season.numberOfEpisodes !== null ? season.numberOfEpisodes : 'Unknown'}{' '}
//       </p>
//       <div className="card-footer">
//         <span className="click-hint">Click for details</span>
//       </div>
//     </div>
//   );
// };
