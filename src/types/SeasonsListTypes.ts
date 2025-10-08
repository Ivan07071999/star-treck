import type { Episode, Season, Series } from '../index';

export type SeasonsListProps = {
  seasons: Season[];
  seasonsPerPage: number;
  totalPages: number;
  handlePageChange: (pageNumber: number) => void;
};
