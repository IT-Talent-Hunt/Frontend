import { FC, useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { IconButton } from '../IconButton/IconButton';
import search from '../../svg/search.svg';
import bell from '../../svg/bell.svg';
import profile from '../../svg/profile.svg';
import { useDebounce } from '../../hooks/useDebounce';

export const Header: FC = () => {
  const [query, setQuery] = useState('');

  const debouncedValue = useDebounce(query, 500);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setQuery('');

    // do other *important* stuff before submit
  };

  useEffect(() => {
    // search the api

    async function fetchData() {
      // fetch data from db
      // you may set loading here as well or smth like that
    }

    // do request only if debounced value is present
    if (debouncedValue) {
      fetchData();
    }
  }, [debouncedValue]);

  return (
    <div className={styles.header}>
      <div className={styles.logo} />

      <div className={styles.controls}>
        <form className={styles.form} onSubmit={(evt) => handleSubmit(evt)}>
          <input
            className={styles.input}
            placeholder="Try 'Coffee shop project'..."
            value={query}
            onChange={(evt) => setQuery(evt.target.value)}
          />
          <IconButton svg={search} submit />
        </form>

        <button type="button" className={styles.create_button}>
          Create +
        </button>

        <IconButton svg={bell} />

        <IconButton svg={profile} />
      </div>
    </div>
  );
};
