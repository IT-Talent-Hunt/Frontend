import './ProjectCardMembers.scss';
import { Icon } from '../../Icon/Icon';
import users from '../../../svg/users.png';

type Props = {
  members: number,
  maxMembers: number,
  isProfile?: boolean
};

export const ProjectCardMembers: React.FC<Props> = ({ members, maxMembers, isProfile = false }) => {
  return (
    <div className="projectMembers">
      {/* <div className="projectMembers__icon" /> */}

      <Icon icon={users} />
      {`${members}/${maxMembers} ${isProfile ? '' : 'members'}`}
    </div>
  );
};
