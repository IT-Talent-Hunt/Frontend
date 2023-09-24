import { Icon } from '../../Icon/Icon';
import users from '../../../svg/users.png';
import './ProjectCardMembers.scss';

type Props = {
  members: number,
  maxMembers: number,
  isProfile?: boolean
};

export const ProjectCardMembers: React.FC<Props> = ({ members, maxMembers, isProfile = false }) => {
  return (
    <div className="projectMembers">
      <Icon icon={users} />

      {`${members}/${maxMembers} ${isProfile ? '' : 'members'}`}
    </div>
  );
};
