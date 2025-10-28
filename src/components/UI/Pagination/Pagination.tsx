'use client';
import './Pagination.css';

export const Pagination = ({
  seasonsPerPage,
  totalPages,
  handlePageChange,
}: {
  seasonsPerPage: number;
  totalPages: number;
  handlePageChange: (pageNumber: number) => void;
}) => {
  const pageNumbers = [];
  const totalItems = Math.ceil(totalPages / seasonsPerPage);

  for (let i = 1; i <= totalItems; i += 1) {
    pageNumbers.push(i);
  }

  if (totalItems <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <button className="pagination-button" key={number} onClick={() => handlePageChange(number)}>
          {number}
        </button>
      ))}
    </div>
  );
};
