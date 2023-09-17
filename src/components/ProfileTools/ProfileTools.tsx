import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { ProfileToolsItem } from './ProfileToolsItem/ProfileToolsItem';
import { profileTools } from '../../helpers/Variables';
import './ProfileTools.scss';

type Props = {
  onClose: () => void,
};

export const ProfileTools: React.FC<Props> = ({ onClose }) => {
  const navigation = useNavigate();
  const [user, setUser] = useLocalStorage('user', {});
  const [token, setToken] = useLocalStorage('tokenId', '');

  /* eslint-disable-next-line */
  console.log(user, token);

  const onLogOut = () => {
    setUser({});
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
