/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PaginationItem } from './PaginationItem/PaginationItem';
import { IconButton } from '../IconButton/IconButton';
import doubleArrowLeft from '../../svg/double-arrow--left.png';
import doubleArrowRight from '../../svg/double-arrow--right.png';
import './Pagination.scss';
import { updateSeachParams } from '../../helpers/UpdateSearchParams';

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

  for (let i = startIndex; i < endIndex; i += 1) {
    pagesArray.push(i);
  }

  useEffect(() => {
    const currentPageNumber = parseInt(currentPage, 10);

    let newStartIndex = Math.max(currentPageNumber - Math.floor(range / 2), 0);
    let newEndIndex = Math.min(newStartIndex + range, pages);

    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
  }, [currentPage, pages]);

  const increase = () => {
    if (+currentPage < pages) {
      setSearchParams(updateSeachParams(searchParams, { page: String(+currentPage + 1) }));
    }
  };

  const onIncreaseMore = () => {
    setSearchParams(updateSeachParams(searchParams, { page: String(+currentPage + range) }));

    let newStartIndex = Math.max(+currentPage + range, 0);
    let newEndIndex = Math.min(newStartIndex + range, pages);

    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
  }

  const onDecreaseMore = () => {
    const newPage = Math.max(+currentPage - range, 1);
    const newStartIndex = Math.max(newPage - Math.floor(range / 2), 0);
    const newEndIndex = Math.min(newStartIndex + range, pages);
    
    setSearchParams(updateSeachParams(searchParams, { page: String(newPage) }));

    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
  }

  const decrease = () => {
    if (+currentPage > 1) {
      setSearchParams(updateSeachParams(searchParams, { page: String(+currentPage - 1) }));
    }
  };

  const onPageSelect = (page: number) => {
    setSearchParams(updateSeachParams(searchParams, { page: String(page) }));
  };

  return (
    <section className="pagination">
      <IconButton svg={doubleArrowLeft} onClick={decrease} />
      {startIndex > 0 && (
        <button onClick={onDecreaseMore}>...</button>
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
        <button onClick={onIncreaseMore}>...</button>
      )}
      <IconButton svg={doubleArrowRight} onClick={increase} />
    </section>
  );
};
