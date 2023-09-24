import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PaginationItem } from './PaginationItem/PaginationItem';
import { IconButton } from '../IconButton/IconButton';
import leftDark from '../../svg/arrow-left--dark.png';
import leftLight from '../../svg/arrow-left--light.png';
import rightDark from '../../svg/arrow-right--dark.png';
import rightLight from '../../svg/arrow-right--light.png';
import './Pagination.scss';
import { updateSeachParams } from '../../helpers/updateSearchParams';

type Props = {
  pages: number,
};

export const Pagination: React.FC<Props> = ({ pages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(0);

  const currentPage = searchParams.get('page') || '1';
  const pagesArray: number[] = [];

  const range = 3;

  const isRightEnought = +currentPage >= pages;
  const isLeftEnought = +currentPage <= 1;

  for (let i = startIndex; i < endIndex; i += 1) {
    pagesArray.push(i);
  }

  useEffect(() => {
    const currentPageNumber = parseInt(currentPage, 10);

    const newStartIndex = Math.max(currentPageNumber - Math.floor(range / 2), 0);
    const newEndIndex = Math.min(newStartIndex + range, pages);

    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
  }, [currentPage, pages]);

  const increase = () => {
    if (!isRightEnought) {
      setSearchParams(updateSeachParams(searchParams, { page: String(+currentPage + 1) }));
    }
  };

  const onIncreaseMore = () => {
    setSearchParams(updateSeachParams(searchParams, { page: String(+currentPage + range) }));

    const newStartIndex = Math.max(+currentPage + range, 0);
    const newEndIndex = Math.min(newStartIndex + range, pages);

    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
  };

  const onDecreaseMore = () => {
    const newPage = Math.max(+currentPage - range, 1);
    const newStartIndex = Math.max(newPage - Math.floor(range / 2), 0);
    const newEndIndex = Math.min(newStartIndex + range, pages);

    setSearchParams(updateSeachParams(searchParams, { page: String(newPage) }));

    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
  };

  const decrease = () => {
    if (!isLeftEnought) {
      setSearchParams(updateSeachParams(searchParams, { page: String(+currentPage - 1) }));
    }
  };

  const onPageSelect = useCallback((page: number) => {
    setSearchParams(updateSeachParams(searchParams, { page: String(page) }));
  }, []);

  return (
    <section className="pagination">
      <IconButton
        svg={isLeftEnought ? leftLight : leftDark}
        onClick={decrease}
      />

      {startIndex > 0 && (
        <button type="button" onClick={onDecreaseMore}>
          ...
        </button>
      )}

      <ul className="pagination__list">
        {pagesArray.map((page) => (
          <PaginationItem
            key={page}
            page={page + 1}
            onSelect={onPageSelect}
            currentPage={currentPage}
          />
        ))}
      </ul>

      {endIndex < pages && (
        <button type="button" onClick={onIncreaseMore}>
          ...
        </button>
      )}

      <IconButton
        svg={isRightEnought ? rightLight : rightDark}
        onClick={increase}
      />
    </section>
  );
};
