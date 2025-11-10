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

export type ImageSrc = {
  src: string;
  width: number;
  height: number;
  blurWidth?: number;
  blurHeight?: number;
  blurDataURL?: string;
};

export type SeasonImage = {
  id: number;
  src: ImageSrc;
  alt: string;
};

export type Season = {
  uid: string;
  title: string;
  series: Series;
  seasonNumber: number;
  numberOfEpisodes: number | null;
  image: SeasonImage;
};

export type DataImagesType = {
  image: SeasonImage;
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

export type ApiResponse = {
  page: Page;
  sort: Sort;
  seasons: Season[];
};

export type SeasonDetail = {
  season(season: unknown): unknown;
  uid: string;
  title: string;
  series: Series;
  seasonNumber: number;
  numberOfEpisodes: number;
  episodes: Episode[];
};

export type SeasonUidContextType = {
  handleSeasonUid: (data: string) => void;
};
