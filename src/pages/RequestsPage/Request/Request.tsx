/* eslint-disable no-nested-ternary */
/* eslint-disable */

import { ProjectCardProps } from '../../../Types/ProjectCardProps';
import { Request } from '../../../Types/Request';
import { ProfileProject } from '../../../components/ProfileProject/ProfileProject';
import { ProjectCardMemberItem } from '../../../components/projectCard/ProjectCardMemberItem/ProjectCardMemberItem';
import { EditProjectButton } from '../../EditPage/EditProject/EditProjectButton/EditProjectButton';
import { EditReverseButton } from '../../EditPage/EditProject/EditReverseButton/EditReverseButton';
import { truncateText } from '../../../helpers/truncateText';
import './Request.scss';
import { Icon } from '../../../components/Icon/Icon';
import pending from '../../../svg/pending.png';
import accepted from '../../../svg/accepted.png';
import rejected from '../../../svg/rejected.png';
import { useEffect, useState } from 'react';
import { patchData } from '../../../helpers/helpers';
import { LoaderSmall } from '../../../components/Loader/LoaderSmall';
import error from '../../../svg/error-icon.svg';
import { IconButton } from '../../../components/IconButton/IconButton';
import { requestStatusHandler } from '../../../redux/features/requests/import/api';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import * as importActions from '../../../redux/features/requests/import/import';
import { useMatch } from 'react-router-dom';
import iconRight from '../../../svg/arrow-right--light.png'
import deleted from '../../../svg/deleted.png';
import remove from '../../../svg/delete-icon--red.png';


type Props = {
  request: Request,
  cardClick: (value: ProjectCardProps) => void,
  isExport?: boolean,
};

export const ImportRequest: React.FC<Props> = ({
  request,
  cardClick,
  isExport,
}) => {
  const { userResponseDto, projectResponseDto } = request;

  const formatedMessage = truncateText(request.message, 255);

  const [isStatusLoader, setIsStatusLoader] = useState<boolean>(false);
  const [isStatusError, setIsStatusError] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const match = useMatch('requests/:requestId');
  const selectedRequestId = match?.params.requestId;


  const onAction = async (requestId: number, status: any) => {
    setIsStatusLoader(true);

    try {
      const res = await requestStatusHandler(requestId, status);

      dispatch(importActions.change({ requestId: requestId, status: status }));
    } catch (error) {
      setIsStatusError(true);
      console.log(error);
    } finally {
      setIsStatusLoader(false);
    }
  };

  return (
    <div className="request">
      {projectResponseDto !== null ? (
        <ProfileProject project={projectResponseDto} onClick={cardClick} />
      ) : (
        <div className="request__deleted">
          <div className="request__deleted_icon">
            <Icon icon={deleted} />
          </div>
        </div>
      )}

      <div className="request__wrapper">
        <div className="request__shell">
          <div className="request__user">
            <ProjectCardMemberItem member={userResponseDto} />

            <span>
              {isExport ? (
                'You'
              ) : (
                `${userResponseDto.firstName} ${userResponseDto.lastName}`
              )}
            </span>

            <span className="request__position">
              {userResponseDto.speciality}
            </span>
          </div>

          <div className="request__container">
            <div className="request__message">
              {formatedMessage}
            </div>

            {!isExport ? (
              <>
                {isStatusLoader ? (
                  <div className="request__field">
                    <LoaderSmall />
                  </div>
                ) : (
                  <>
                    {isStatusError ? (
                      <div className="request__field">
                        <IconButton svg={error} onClick={() => setIsStatusError(false)} />
                      </div>
                    ) : (
                      <>
                        {request.status === 'PENDING' && (
                          <div className="request__buttons">
                            <EditProjectButton
                              title="Accept"
                              onClick={() => onAction(request.id, 'ACCEPTED')}
                            />

                            <EditReverseButton
                              title="Reject"
                              onClick={() => onAction(request.id, 'REJECTED')}
                            />
                          </div>
                        )}

                        {request.status === 'ACCEPTED' && (
                          <div className="request__field">
                            <Icon icon={accepted} />
                          </div>
                        )}

                        {request.status === 'REJECTED' && (
                          <div className="request__field">
                            <Icon icon={rejected} />
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <div className="request__status">
                <Icon
                  icon={
                    projectResponseDto === null
                    ? remove : request.status === 'ACCEPTED'
                    ? accepted : request.status === 'PENDING'
                    ? pending : rejected
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {request.id === +selectedRequestId! && (
        <div className="request__selected">
          <div className="request__selected_icon">
            <Icon icon={iconRight} />
          </div>
        </div>
      )}
    </div>
  );
};
