/* eslint-disable */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { RemoveModal } from '../RemoveModal/RemoveModal';

type Props = {
  onSend: (name: string, messgae: string) => void,
  onClose: (value: boolean) => void,
  project: ProjectCardProps,
};

export const LetterModal: React.FC<Props> = ({ onSend, onClose, project }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const { exportLoader, exportError } = useAppSelector(state => state.exportRequests);
  const [isLoaded, setIsLoaded] = useState(false);

  const [user] = useLocalStorage<User | null>('user', null);
  const [letter, setLetter] = useState<string>('');

  const onApply = async(project: ProjectCardProps) => {
    const request = {
      userId: user?.id,
      projectId: project.id,
      message: letter,
    }

    await dispatch(exportRequestsActions.send(request));
    setIsLoaded(true);
  };

  useEffect(() => {
    if (!exportError && !exportLoader && isLoaded) {
      navigation('/requests');
    };
  }, [isLoaded])

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
          onClick={() => onApply(project)}
          isLoader={exportLoader}
        />

        <CompleteReverseButton title="Cancel" onClick={() => onClose(false)} />
      </div>
    </div>
  );
};
