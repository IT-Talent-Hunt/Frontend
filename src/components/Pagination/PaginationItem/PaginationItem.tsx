import classNames from 'classnames';
import './PaginationItem.scss';

type Props = {
  page: number,
  onSelect: (page: number) => void,
  currentPage: string;
};

export const PaginationItem: React.FC<Props> = ({ page, onSelect, currentPage }) => {
  return (
    <button
      className={classNames(
        'paginationItem',
        { 'paginationItem--active': +currentPage === page },
      )}
      type="button"
      onClick={() => onSelect(page)}
    >
      {page}
    </button>
  );
};
