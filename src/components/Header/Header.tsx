import { FC, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { IconButton } from '../IconButton/IconButton';
import cross from '../../svg/cross2.png';
import filter from '../../svg/icon-filter.png';

type Props = {
  isSideBar: boolean
  setIsSideBar: (value: boolean) => void,
};

export const Header: FC<Props> = ({ isSideBar, setIsSideBar }) => {
  const navigation = useNavigate();
  const location = useLocation();
  const [user] = useLocalStorage<User | any>('user', {});

  const [isTools, setIsTools] = useState(false);

  return (
    <div className={styles.header}>
      <div className={styles.icons}>
        {location.pathname === '/' && (
          <>
            {isSideBar ? (
              <span className={styles.button}>
                <IconButton svg={cross} onClick={() => setIsSideBar(false)} />
              </span>
            ) : (
              <span className={styles.button__scale}>
                <IconButton svg={filter} onClick={() => setIsSideBar(true)} />
              </span>
            )}
          </>
        )}

        <div>
          <Logo />
        </div>
      </div>

      <div className={styles.wrapper}>
        {window.innerWidth > 640 && (
          <SearchInput />
        )}

        {user.email ? (
          <div className={styles.controls}>

            <button
              type="button"
              className={styles.create_button}
              onClick={() => navigation('createProject')}
            >
              Create
            </button>

            <div className={styles.actions}>
              <div className={styles.shell}>
                <PageNavLink to="" img={bell} />
              </div>

              <div className={styles.shell}>
                <PageNavLink img={profile} onClick={() => setIsTools(!isTools)} />
              </div>
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
    </div>
  );
};
