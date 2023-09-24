import { NavLink } from 'react-router-dom';
import { Icon } from '../../Icon/Icon';
import profile from '../../../svg/profile-black.png';
import { User } from '../../../Types/User';
import './ProjectCardMemberItem.scss';

type Props = {
  member: User,
};

export const ProjectCardMemberItem: React.FC<Props> = ({ member }) => {
  const isColor = member.profileImage?.includes('#');

  return (
    <NavLink
      to={`/profile/${member.id}`}
      className={`projectMember projectMember-${member.id}`}
      style={{ backgroundColor: isColor ? `${member.profileImage}` : '' }}
    >
      <Icon icon={profile} />

    </NavLink>
  );
};
