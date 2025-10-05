import { getPagesArray } from '../../../index';
import './Pagination.css';

export const Pagination = ({ totalPages, page, changePage }) => {
  const pagesArray = getPagesArray(totalPages);

  return (
    <div className="page__wrapper">
      {pagesArray.map((p) => (
        <span
          onClick={() => changePage(p)}
          key={p}
          className={page === p ? 'page__current' : 'page'}
        >
          {p}
        </span>
      ))}
    </div>
  );
};
