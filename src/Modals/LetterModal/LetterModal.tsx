/* eslint-disable */

import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { CompleteButton } from '../../components/Buttons/CompleteButton/CompleteButton';
import { ProfileInputField } from '../../components/ProfileInputField/ProfileInputField';
import { CompleteReverseButton } from '../../components/Buttons/CompleteReverseButton/CompleteReverseButton';
import './LetterModal.scss';
import { User } from '../../Types/User';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ProjectCardProps } from '../../Types/ProjectCardProps';
import * as exportRequestsActions from '../../redux/features/requests/export/export';

import error from '../../svg/error-icon.svg';
import { Icon } from '../../components/Icon/Icon';

type Props = {
  onSend: (name: string, messgae: string) => void,
  onClose: (value: boolean) => void,
  project: ProjectCardProps,
};

export const LetterModal: React.FC<Props> = ({ onSend, onClose, project }) => {
  const dispatch = useAppDispatch();
  const { exportLoader, exportError } = useAppSelector(state => state.exportRequests);
  const [isLoaded, setIsLoaded] = useState(false);

  const [user] = useLocalStorage<User | null>('user', null);
  const [letter, setLetter] = useState<string>('');

  const onApply = (project: ProjectCardProps) => {
    const request = {
      userId: user?.id,
      projectId: project.id,
      message: letter,
    }

    dispatch(exportRequestsActions.send(request));
    setIsLoaded(true);
  };

  return (
    <div className="letter">
      <h1 className="letter__title">Cover Letter</h1>
      {exportError && isLoaded && (
        <div className="letter__error">
          <Icon icon={error} />
        </div>
      )}

      <ProfileInputField value={letter} setValue={setLetter} name="letter" />

      <div className="letter__buttons">
        <CompleteButton
          title="Send"
          // onClick={() => onSend(
          //   `${user?.firstName} ${user?.lastName}`, letter,
          // )}
          onClick={() => onApply(project)}
          isLoader={exportLoader}
        />
        <CompleteReverseButton title="Cancel" onClick={() => onClose(false)} />
      </div>
    </div>
  );
};
