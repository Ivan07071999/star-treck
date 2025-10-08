import './Pagination.css';

export const Pagination = ({ seasonsPerPage, totalPages, handlePageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPages / seasonsPerPage); i += 1) {
    pageNumbers.push(i);
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
