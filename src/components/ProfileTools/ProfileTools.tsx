import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { ProfileToolsItem } from './ProfileToolsItem/ProfileToolsItem';
import { profileTools } from '../../helpers/Variables';
import './ProfileTools.scss';

export const ProfileTools = () => {
  const navigation = useNavigate();
  const [user, setUser] = useLocalStorage('user', {});

  /* eslint-disable-next-line */
  console.log(user);

  return (
    <ul className="profileTools">
      <ProfileToolsItem tool={profileTools[0]} onClick={() => navigation('/profile')} />
      <ProfileToolsItem tool={profileTools[1]} onClick={() => navigation('/saved')} />
      <ProfileToolsItem tool={profileTools[2]} onClick={() => setUser({})} />
    </ul>
  );
};
