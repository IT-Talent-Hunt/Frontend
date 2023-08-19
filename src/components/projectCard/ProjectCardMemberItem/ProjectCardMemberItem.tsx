import { IconButton } from '../../IconButton/IconButton';
import profile from '../../../svg/profile.svg';
import './ProjectCardMemberItem.scss';
import { User } from '../../../Types/User';

type Props = {
  member: User,
};

export const ProjectCardMemberItem: React.FC<Props> = ({ member }) => {
  return (
    <li className={`projectMember projectMember-${member.id}`}>
      <IconButton svg={profile} />
    </li>
  );
};
