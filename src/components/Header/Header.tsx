import { FC, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import styles from './Header.module.scss';
import bell from '../../svg/bell-white.png';
import profile from '../../svg/profile.png';
import { Logo } from '../Logo/Logo';
import { User } from '../../Types/User';
import { PageNavLink } from '../PageNavLink/PageNavLink';
import { SearchInput } from '../SearchInput/SearchInput';
import { TransparentButton } from '../Buttons/TransparentButton/TransparentButton';
import { ProfileTools } from '../../pages/ProfilePage/ProfileTools/ProfileTools';
import { IconButton } from '../IconButton/IconButton';
import cross from '../../svg/cross2.png';
import filterIcon from '../../svg/icon-filter.png';
import { MessagesTypes } from '../../redux/features/Messages/messages';
import { FiltersEnumTypes } from '../../Types/FilterEnumTypes';

type Props = {
  isSideBar: boolean
  setIsSideBar: (value: boolean) => void,
  newMessages: MessagesTypes[],
  filter: FiltersEnumTypes
};

export const Header: FC<Props> = ({
  isSideBar,
  setIsSideBar,
  newMessages,
  filter,
}) => {
  const navigation = useNavigate();
  const location = useLocation();

  const [user] = useLocalStorage<User | null>('user', null);
  const [isTools, setIsTools] = useState<boolean>(false);

  return (
    <div className={styles.header}>
      <div className={styles.icons}>
        {location.pathname === '/' && (
          <>
            {isSideBar ? (
              <span className={styles.button}>
                <IconButton
                  svg={cross}
                  onClick={() => setIsSideBar(false)}
                />
              </span>
            ) : (
              <span className={styles.button__scale}>
                <IconButton
                  svg={filterIcon}
                  onClick={() => setIsSideBar(true)}
                />
              </span>
            )}
          </>
        )}

        <div>
          <Logo />
        </div>
      </div>

      <div className={styles.wrapper}>
        {window.innerWidth > 640
        && location.pathname === '/'
        && filter !== FiltersEnumTypes.FAVORITES
        && (
          <SearchInput />
        )}

        {user?.email ? (
          <div className={styles.controls}>

            <TransparentButton
              title="Create"
              onClick={() => navigation('createProject')}
            />

            <div className={styles.actions}>
              <div className={styles.shell}>
                {!!newMessages.length && (
                  <p className={styles.notification}>
                    {newMessages.length}
                  </p>
                )}

                <PageNavLink to="messages" img={bell} />
              </div>

              <div className={styles.shell}>
                <PageNavLink
                  img={profile}
                  onClick={() => setIsTools(!isTools)}
                />
              </div>
            </div>

            {isTools && (
              <div className={styles.tools}>
                <ProfileTools onClose={() => setIsTools(false)} />
              </div>
            )}

          </div>
        ) : (
          <TransparentButton
            title="Sign In"
            onClick={() => navigation('/signIn')}
          />
        )}
      </div>
    </div>
  );
};
