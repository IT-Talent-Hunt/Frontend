import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { updateSeachParams } from '../../helpers/UpdateSearchParams';
import crossImg from '../../svg/cross-icon.svg';
import loop from '../../svg/search-loop--icon.svg';
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
  const [appliedQuery, setAppliedQuery] = useState<string | null>('');

  const [isMove, setIsMove] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const appliedDebouncedQuery = useCallback(debounce(setAppliedQuery, 1000), []);

  const updateQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);

    appliedDebouncedQuery(value);
  };

  useEffect(() => {
    setSearchParams(updateSeachParams(searchParams, { queryParam: appliedQuery }));
  }, [appliedQuery]);

  const onQueryReset = () => {
    setQuery('');
    setAppliedQuery(null);
  };

  return (
    <div className="search">
      <label htmlFor="" className="search__label">
        <input
          className={classNames('search__input', { 'search__input-move': isMove })}
          placeholder="Try 'Coffee shop project'..."
          value={query}
          onChange={(event) => updateQuery(event)}
        />
      </label>

      {!query.length ? (
        <IconButton svg={loop} onClick={() => setIsMove(!isMove)} />
      ) : (
        <div className="search__cross">
          <IconButton svg={crossImg} onClick={onQueryReset} />
        </div>
      )}
    </div>
  );
};
