/* eslint-disable */

import { NavLink } from 'react-router-dom';
import { Icon } from '../../Icon/Icon';
import profile from '../../../svg/profile-black.png';
import './ProjectCardMemberItem.scss';
import { User } from '../../../Types/User';

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
