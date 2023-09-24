import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { updateSeachParams } from '../../helpers/updateSearchParams';
import crossBlack from '../../svg/cross--icon-black.png';
import crossWhite from '../../svg/cross--icon-white.png';
import loopBlack from '../../svg/loop--black.png';
import loopWhite from '../../svg/loop--white.png';
import { IconButton } from '../IconButton/IconButton';
import { debounce } from '../../helpers/helpers';
import './SearchInput.scss';

export const SearchInput = () => {
  const [query, setQuery] = useState<string>('');
  const [appliedQuery, setAppliedQuery] = useState<string | null>(null);

  const [isMove, setIsMove] = useState<boolean>(false);
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
    <form
      method="POST"
      className="search"
      onSubmit={(event) => updateSearchParams(event)}
    >
      <label htmlFor="search" className="search__label">
        <input
          id="search"
          className={classNames(
            'search__input',
            { 'search__input-move': isMove },
          )}
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
