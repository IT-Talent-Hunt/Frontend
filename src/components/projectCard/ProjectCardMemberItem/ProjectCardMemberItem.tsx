import { IconButton } from '../../IconButton/IconButton';
import profile from '../../../svg/profile.svg';
import './ProjectCardMemberItem.scss';

type Props = {
  member: number,
};

export const ProjectCardMemberItem: React.FC<Props> = ({ member }) => {
  return (
    <li className={`projectMember projectMember-${member}`}>
      <IconButton svg={profile} />
    </li>
  );
};
