import { ProjectCardProps } from '../../Types/ProjectCardProps';
import { ProjectCardDate } from '../projectCard/ProjectCardDate/ProjectCardDate';
import { ProjectCardMembers } from '../projectCard/ProjectCardMembers/ProjectCardMembers';
import { formatDate } from '../../helpers/helpers';
import './ProfileProject.scss';

type Props = {
  // project: ProjectCardProps,
  project: any,
  onClick: (value: ProjectCardProps) => void,
};

export const ProfileProject: React.FC<Props> = ({ project, onClick }) => {
  const {
    teamResponseDto,
    name,
    creationDate,
  } = project;

  const formatedDate = formatDate(creationDate);

  return (
    <li className="profileProject">
      <button
        type="button"
        onClick={() => onClick(project)}
        className="profileProject__button"
      >
        <h1 className="profileProject__title">{name}</h1>

        <div className="profileProject__wrapper">
          <div className="profileProject__members">
            <ProjectCardMembers
              members={teamResponseDto.userResponseDtos.length}
              // members={0}
              maxMembers={teamResponseDto.maxMembers}
              isProfile={!!true}
            />
          </div>

          <div className="profileProject__date">
            <ProjectCardDate date={formatedDate} />
          </div>
        </div>
      </button>
    </li>
  );
};
