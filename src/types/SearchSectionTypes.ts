import type { Season } from '../index';

export type SearchSectionType = {
  seasons: Season[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setFilteredSeasons: React.Dispatch<React.SetStateAction<Season[]>>;
};
