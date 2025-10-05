import './SeasonsContainer.css';
import { SeasonsList } from '../../index';

const SeasonsContainer = ({ seasons }) => {
  return (
    <>
      <SeasonsList seasons={seasons} onSeasonSelect={undefined} />
    </>
  );
};

export default SeasonsContainer;
