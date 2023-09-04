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
import * as projectActions from '../../redux/features/projects/projects';

type Props = {
  onSend: (name: string, messgae: string) => void,
  onClose: (value: boolean) => void,
  project: ProjectCardProps,
};

export const LetterModal: React.FC<Props> = ({ onSend, onClose, project }) => {
  const dispatch = useAppDispatch();
  // const { projects } = useAppSelector(state => state.projects);

  const [user] = useLocalStorage<User | null>('user', null);
  const [letter, setLetter] = useState<string>('');

  const onApply = (project: ProjectCardProps) => {
    const request = {
      userId: user?.id,
      projectId: project.id,
      message: letter,
    }

    dispatch(projectActions.apply(request));
  };

  return (
    <div className="letter">
      <h1 className="letter__title">Cover Letter</h1>

      <ProfileInputField value={letter} setValue={setLetter} name="letter" />

      <div className="letter__buttons">
        <CompleteButton
          title="Send"
          // onClick={() => onSend(
          //   `${user?.firstName} ${user?.lastName}`, letter,
          // )}
          onClick={() => onApply(project)}
        />
        <CompleteReverseButton title="Cancel" onClick={() => onClose(false)} />
      </div>
    </div>
  );
};
