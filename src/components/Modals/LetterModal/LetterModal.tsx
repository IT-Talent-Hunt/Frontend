import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { CompleteButton } from '../../Buttons/CompleteButton/CompleteButton';
import { ProfileInputField } from '../../../pages/ProfilePage/ProfileInputField/ProfileInputField';
import { CompleteReverseButton } from '../../Buttons/CompleteReverseButton/CompleteReverseButton';
import './LetterModal.scss';
import { User } from '../../../Types/User';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { ProjectCardProps } from '../../../Types/ProjectCardProps';
import * as exportRequestsActions from '../../../redux/features/requests/export/export';
import error from '../../../svg/error-icon.svg';
import { Icon } from '../../Icon/Icon';

type Props = {
  onClose: (value: boolean) => void,
  project: ProjectCardProps,
};

export const LetterModal: React.FC<Props> = ({ onClose, project }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const { exportLoader, exportError } = useAppSelector(state => state.exportRequests);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [user] = useLocalStorage<User | null>('user', null);
  const [letter, setLetter] = useState<string>('');

  const onApply = useCallback(async (projectId: number) => {
    const request = {
      userId: user?.id,
      projectId,
      message: letter,
    };

    await dispatch(exportRequestsActions.send(request));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!exportError && !exportLoader && isLoaded) {
      navigation('/requests');
    }
  }, [isLoaded]);

  useEffect(() => {
    return () => {
      onClose(false);
    };
  }, []);

  return (
    <div className="letter">
      <h1 className="letter__title">Cover Letter</h1>

      {exportError && isLoaded && (
        <div className="letter__error">
          <Icon icon={error} />
        </div>
      )}

      <ProfileInputField
        value={letter}
        setValue={setLetter}
        name="letter"
      />

      <div className="letter__buttons">
        <CompleteButton
          title="Send"
          onClick={() => onApply(project.id)}
          isLoader={exportLoader}
        />

        <CompleteReverseButton
          title="Cancel"
          onClick={() => onClose(false)}
        />
      </div>
    </div>
  );
};
