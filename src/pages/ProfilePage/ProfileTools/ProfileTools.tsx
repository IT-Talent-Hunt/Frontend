/* eslint-disable @typescript-eslint/no-unused-vars */

import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { ProfileToolsItem } from './ProfileToolsItem/ProfileToolsItem';
import { profileTools } from '../../../helpers/variables';
import { User } from '../../../Types/User';
import './ProfileTools.scss';

type Props = {
  onClose: () => void,
};

export const ProfileTools: React.FC<Props> = ({ onClose }) => {
  const navigation = useNavigate();
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [token, setToken] = useLocalStorage<string>('tokenId', '');

  const onLogOut = () => {
    setUser(null);
    setToken('');
    navigation('/main');
  };

  return (
    <ul className="profileTools">
      <ProfileToolsItem tool={profileTools[0]} onClick={onClose} />
      <ProfileToolsItem tool={profileTools[1]} onClick={onClose} />
      <ProfileToolsItem tool={profileTools[3]} onClick={onClose} />
      <ProfileToolsItem
        tool={profileTools[2]}
        onClick={() => {
          onLogOut();
          onClose();
        }}
      />
    </ul>
  );
};
