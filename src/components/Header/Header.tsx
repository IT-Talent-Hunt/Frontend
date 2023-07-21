import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import styles from './Header.module.scss';
import bell from '../../svg/bell.svg';
import profile from '../../svg/profile.svg';
import { Logo } from '../Logo/Logo';

import { User } from '../../Types/User';
import { PageNavLink } from '../PageNavLink/PageNavLink';
import { SearchInput } from '../SearchInput/SearchInput';
import { TransparentButton } from '../Buttons/TransparentButton/TransparentButton';
import { ProfileTools } from '../ProfileTools/ProfileTools';

export const Header: FC = () => {
  const navigation = useNavigate();
  const [user] = useLocalStorage<User | any>('user', {});

  const [isTools, setIsTools] = useState(false);

  return (
    <div className={styles.header}>
      <Logo />
      {user.email ? (
        <div className={styles.controls}>
          <SearchInput />

          <button
            type="button"
            className={styles.create_button}
            onClick={() => navigation('edit_project')}
          >
            Create
          </button>

          <div className={styles.shell}>
            <PageNavLink to="" img={bell} />
          </div>

          <div className={styles.shell}>
            <PageNavLink img={profile} onClick={() => setIsTools(!isTools)} />
          </div>

          {isTools && (
            <div className={styles.tools}>
              <ProfileTools />
            </div>
          )}

        </div>
      ) : (
        <TransparentButton title="Sign In" onClick={() => navigation('/signIn')} />
      )}
    </div>
  );
};
