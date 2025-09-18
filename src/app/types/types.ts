export type Series = {
  uid: string;
  title: string;
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
  clauses: any[];
};

export type ApiResponse = {
  page: Page;
  sort: Sort;
  seasons: Season[];
};

export type ContentState = {
  seasons: Season[];
  loading: boolean;
  error: null;
};
