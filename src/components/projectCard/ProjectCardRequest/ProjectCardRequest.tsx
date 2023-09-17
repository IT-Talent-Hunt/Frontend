import { NavLink } from 'react-router-dom';
import { ProjectCardMemberItem } from '../ProjectCardMemberItem/ProjectCardMemberItem';
import { Request } from '../../../Types/Request';
import './ProjectCardRequest.scss';

type Props = {
  request: Request,
};

export const ProjectCardRequest: React.FC<Props> = ({ request }) => {
  const { userResponseDto } = request;

  return (
    <li className="projectRequest">
      <ProjectCardMemberItem member={userResponseDto} />

      <NavLink
        to={`requests/${request.id}`}
        className="projectRequest__link"
      >
        <span className="projectRequest__name">
          {`${userResponseDto.firstName} ${userResponseDto.lastName}`}
        </span>

        <span className="projectRequest__position">
          {userResponseDto.speciality}
        </span>
      </NavLink>
    </li>
  );
};
