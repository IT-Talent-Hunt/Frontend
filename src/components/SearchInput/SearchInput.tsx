import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { updateSeachParams } from '../../helpers/UpdateSearchParams';
import crossBlack from '../../svg/cross--icon-black.png';
import crossWhite from '../../svg/cross--icon-white.png';
// import loop from '../../svg/search-loop--icon.svg';
import loopBlack from '../../svg/loop--black.png';
import loopWhite from '../../svg/loop--white.png';
import './SearchInput.scss';
import { IconButton } from '../IconButton/IconButton';

function debounce(callBack: Function, delay: number) {
  let timer = 0;

  return (...args: any) => {
    window.clearTimeout(timer);

    timer = window.setTimeout(() => {
      callBack(...args);
    }, delay);
  };
}

export const SearchInput = () => {
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState<string | null>(null);

  const [isMove, setIsMove] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const appliedDebouncedQuery = useCallback(debounce(setAppliedQuery, 1000), []);

  const updateQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);

    appliedDebouncedQuery(value);
  };

  const updateSearchParams = (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    setSearchParams(updateSeachParams(searchParams, { queryParam: appliedQuery || null }));
  };

  useEffect(() => {
    updateSearchParams();
  }, [appliedQuery]);

  const onQueryReset = () => {
    setQuery('');
    setAppliedQuery(null);
  };

  return (
    <form method="GET" className="search" onSubmit={(event) => updateSearchParams(event)}>
      <label htmlFor="search" className="search__label">
        <input
          id="search"
          className={classNames('search__input', { 'search__input-move': isMove })}
          placeholder="Project name..."
          value={query}
          onChange={(event) => updateQuery(event)}
        />
      </label>

      <div className="search__button">
        {!query.length ? (
          <IconButton
            svg={window.innerWidth < 640 ? loopBlack : loopWhite}
            onClick={() => setIsMove(!isMove)}
          />
        ) : (
          <IconButton
            svg={window.innerWidth < 640 ? crossBlack : crossWhite}
            onClick={onQueryReset}
          />
        )}
      </div>
    </form>
  );
};
