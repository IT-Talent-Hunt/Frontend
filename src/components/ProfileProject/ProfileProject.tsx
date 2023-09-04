/* eslint-disable */

import { ProjectCardProps } from '../../Types/ProjectCardProps';
import { ProjectCardDate } from '../projectCard/ProjectCardDate/ProjectCardDate';
import { ProjectCardMembers } from '../projectCard/ProjectCardMembers/ProjectCardMembers';
import { formatDate } from '../../helpers/helpers';
import './ProfileProject.scss';
import classNames from 'classnames';
import { User } from '../../Types/User';

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
    // <li className="profileProject">
    //   <button
    //     type="button"
    //     onClick={() => onClick(project)}
    //     className="profileProject__button"
    //   >
    //     <h1 className="profileProject__title">{name}</h1>

    //     <div className="profileProject__wrapper">
    //       <div className="profileProject__members">
    //         <ProjectCardMembers
    //           members={teamResponseDto.userResponseDtos.length}
    //           // members={0}
    //           maxMembers={teamResponseDto.maxMembers}
    //           isProfile={!!true}
    //         />
    //       </div>

    //       <div className="profileProject__date">
    //         <ProjectCardDate date={formatedDate} />
    //       </div>
    //     </div>
    //   </button>
    // </li>

    <li className="profileProject">
      <button
        type="button"
        onClick={() => onClick(project)}
        className="profileProject__button"
      >
        <div className="profileProject__top">
          <div className="profileProject__wrapper">
            <h5 className="profileProject__name">{project.name}</h5>

            <p className={classNames(
              'profileProject__status',
              { 'profileProject__status--green': project.status === 'In progress' },
              { 'profileProject__status--orange': project.status === 'Recruitment' },
            )}/>
          </div>

          <p className="profileProject__cross"/>
        </div>

        <div className="profileProject__owner">
          <p className="profileProject__owner-name"/>
          <p className="profileProject__owner-is"/>
        </div>
        <div className="profileProject__specializations">
          <div>
            <div className="profileProject__members">
              <p className="profileProject__members_icon"/>
              <p className="profileProject__members_title"/>
            </div>

            <ul className="profileProject__users">
              <li className="profileProject__user">
                <p className="profileProject__user_circle profileProject__user_circle-blue"/>
                <p className="profileProject__user_position"/>
              </li>

              <li className="profileProject__user">
                <p className="profileProject__user_circle profileProject__user_circle-green"/>
                <p className="profileProject__user_position"/>
              </li>

              <li className="profileProject__user">
                <p className="profileProject__user_circle profileProject__user_circle-red"/>
                <p className="profileProject__user_position"/>
              </li>
            </ul>
          </div>


          <ul className="profileProject__required">
            <p className="profileProject__required_title"/>
              <li className="profileProject__required_item">
                <p className="profileProject__required_icon"/>
                <p className="profileProject__required_position"/>
              </li>

              <li className="profileProject__required_item">
                <p className="profileProject__required_icon"/>
                <p className="profileProject__required_position"/>
              </li>

              <li className="profileProject__required_item">
                <p className="profileProject__required_icon"/>
                <p className="profileProject__required_position"/>
              </li>
          </ul>
        </div>

        <div className="profileProject__container">
          <div className="profileProject__field">
           <p className="profileProject__field__title"/>

           <p className="profileProject__description"/>
          </div>

          <div className="profileProject__field">
            <p className="profileProject__field__title"/>

            <div className="profileProject__link">
            <p className="profileProject__link_circle"/>

              <p className="profileProject__link_type"/>
              <p className="profileProject__link_to"/>
            </div>
          </div>

          <div className="profileProject__bottom">
            <div className="profileProject__actions">
              <p className="profileProject__actions_button"/>
              <p className="profileProject__actions_like"/>
            </div>

            <div className="profileProject__date">
              <p className="profileProject__date_circle"/>
              <p className="profileProject__date_is"/>
            </div>
          </div>
        </div>
      </button>
  </li>
  );
};
