export type Series = {
  uid: string;
  title: string;
  abbreviation?: string;
  productionStartYear?: number;
  productionEndYear?: number;
  originalRunStartDate?: string;
  originalRunEndDate?: string;
  seasonsCount?: number;
  episodesCount?: number;
  featureLengthEpisodesCount?: number;
  productionCompany?: {
    uid: string;
    name: string;
  };
  originalBroadcaster?: {
    uid: string;
    name: string;
  };
};

export type Episode = {
  uid: string;
  title: string;
  titleGerman?: string | null;
  titleItalian?: string | null;
  titleJapanese?: string | null;
  series: Series;
  season: {
    uid: string;
    title: string;
  };
  seasonNumber: number;
  episodeNumber: number;
  productionSerialNumber: string;
  featureLength: boolean;
  stardateFrom?: number | null;
  stardateTo?: number | null;
  yearFrom: number;
  yearTo: number;
  usAirDate: string;
  finalScriptDate?: string | null;
};

export type SeasonDetail = {
  uid: string;
  title: string;
  series: Series;
  seasonNumber: number;
  numberOfEpisodes: number;
  episodes: Episode[];
};

export type Season = {
  uid: string;
  title: string;
  series: Series;
  seasonNumber: number;
  numberOfEpisodes: number | null;
};

export type Page = {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;
};

export type Sort = {
  clauses: never[];
};

export type ApiResponse = {
  page: Page;
  sort: Sort;
  seasons: Season[];
};

export type SeasonDetailsState = {
  season: SeasonDetail | null;
  loading: boolean;
  error: string | null;
};

export type ContentSectionState = {
  allSeasons: Season[];
  seasons: Season[];
  loading: boolean;
  error: string | null;
};

export type SearchSectionState = {
  searchQuery: string;
};

export type AppState = {
  searchQuery: string;
  selectedSeasonUid: string | null;
};

export type SeasonCardProps = {
  season: Season;
  onClick: (uid: string) => void;
};

export type SearchSectionProps = {
  onSearch: (query: string) => void;
};

export type SeasonsGridProps = {
  seasons: Season[];
  onSeasonSelect: (uid: string) => void;
};

export type SeasonHeaderProps = {
  season: SeasonDetail;
};

export type EpisodeListProps = {
  episodes: Episode[];
};

export type SeasonDetailsProps = {
  uid: string;
  onBack: () => void;
};

export type ContentSectionProps = {
  searchQuery?: string;
  onSeasonSelect: (uid: string) => void;
};
