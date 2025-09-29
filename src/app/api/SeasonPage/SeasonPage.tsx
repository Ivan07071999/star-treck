import { useParams, useSearchParams } from 'react-router-dom';
import {
  DetailSection,
  MasterSection,
  type ApiResponse,
  type Season,
  type SeasonsPageProps,
} from '../../../index';
import { useEffect, useState } from 'react';
import './seasonPage.css';
import { useDebounce } from '../../hooks';

const PAGE_SIZE = 20;

export function SeasonsPage({ searchQuery }: SeasonsPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();

  const pageParam = searchParams.get('page') || params.page || '1';
  const detailsParam = searchParams.get('details');

  const [allSeasons, setAllSeasons] = useState<Season[]>([]);
  const [filteredSeasons, setFilteredSeasons] = useState<Season[]>([]);
  const [displaySeasons, setDisplaySeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(parseInt(pageParam));
  const [totalPages, setTotalPages] = useState(1);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const fetchAllSeasons = async () => {
      setLoading(true);
      setError(null);

      try {
        let allData: Season[] = [];
        let page = 0;
        let hasMore = true;

        while (hasMore) {
          const url = new URL('https://stapi.co/api/v1/rest/season/search');
          url.searchParams.append('pageNumber', page.toString());
          url.searchParams.append('pageSize', '100');

          const response = await fetch(url.toString());
          if (!response.ok) {
            throw new Error('Error to load season data');
          }

          const data: ApiResponse = await response.json();
          allData = [...allData, ...data.seasons];

          hasMore = data.seasons.length === 100 && page < 10;
          page++;
        }

        setAllSeasons(allData);
        setFilteredSeasons(allData);
        setTotalPages(Math.ceil(allData.length / PAGE_SIZE));
        setLoading(false);
      } catch (err) {
        setError(`${err}`);
        setLoading(false);
      }
    };

    fetchAllSeasons();
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery && debouncedSearchQuery.trim() !== '') {
      const filtered = allSeasons.filter((season) =>
        season.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase().trim())
      );
      setFilteredSeasons(filtered);
      setTotalPages(Math.ceil(filtered.length / PAGE_SIZE));
      setCurrentPage(1);
    } else {
      setFilteredSeasons(allSeasons);
      setTotalPages(Math.ceil(allSeasons.length / PAGE_SIZE));
    }
  }, [debouncedSearchQuery, allSeasons]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    setDisplaySeasons(filteredSeasons.slice(startIndex, endIndex));
  }, [currentPage, filteredSeasons]);

  useEffect(() => {
    if (searchQuery) {
      setCurrentPage(1);
      const newParams = new URLSearchParams(searchParams);
      newParams.set('page', '1');
      setSearchParams(newParams);
    }
  }, [searchParams, searchQuery, setSearchParams]);

  const handleSeasonSelect = (uid: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('details', uid);
    setSearchParams(newParams);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
  };

  const handleBack = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('details');
    setSearchParams(newParams);
  };

  return (
    <div className="master-detail-container">
      <MasterSection
        seasons={displaySeasons}
        totalSeasons={filteredSeasons.length}
        onSeasonSelect={handleSeasonSelect}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        searchQuery={searchQuery}
      />

      <DetailSection selectedSeasonUid={detailsParam} onBack={handleBack} />
    </div>
  );
}
