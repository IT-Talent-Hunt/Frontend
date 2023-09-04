import { useLocalStorage } from 'usehooks-ts';
import { Icon } from '../../Icon/Icon';
import { User } from '../../../Types/User';
import reqruitmen from '../../../svg/reqruitment.png';
import './ProjectCardSpecializationItem.scss';

type Props = {
  position: string,
};

export const ProjectCardSpecializationItem: React.FC<Props> = ({ position }) => {
  const [user] = useLocalStorage<User | null>('user', null);

  return (
    <li className="speciality">
      <div className="speciality-icon">
        <Icon icon={reqruitmen} />
      </div>

      <p>{position}</p>

      {position === user?.speciality && (
        <p className="speciality-include" />
      )}
    </li>
  );
};
