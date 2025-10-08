import type { Episode } from '../index';

export type SelectSeason = {
  episodes: Episode[];
  numberOfEpisodes: number;
  seasonNumber: number;
  series: {
    abbreviation: string;
    title: string;
    productionEndYear: number | null;
    productionStartYear: number;
    originalRunEndDate: string | null;
    originalRunStartDate: string;
    productionCompany: {
      uid: string;
      name: string;
    };
    originalBroadcaster: {
      uid: string;
      name: string;
    };
  };
  episodesCount: number;
  featureLengthEpisodesCount: number;
  seasonsCount: number;
  title: string;
  uid: string;
};

export type ResponseType = {
  season: SelectSeason;
};
