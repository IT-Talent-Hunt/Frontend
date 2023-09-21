import { useState } from 'react';
import { ProjectCardProps } from '../../Types/ProjectCardProps';
import { CompleteButton } from '../../components/Buttons/CompleteButton/CompleteButton';
import { CompleteReverseButton } from '../../components/Buttons/CompleteReverseButton/CompleteReverseButton';
import { deleteData } from '../../helpers/helpers';
import './RemoveModal.scss';
import { Icon } from '../../components/Icon/Icon';
import error from '../../svg/error-icon.svg';
import { useAppDispatch } from '../../redux/hooks';
import * as projectActions from '../../redux/features/projects/projects';

type Props = {
  project: ProjectCardProps,
  onCancel: () => void,
};

export const RemoveModal: React.FC<Props> = ({ project, onCancel }) => {
  const dispatch = useAppDispatch();

  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  async function onRemove() {
    setIsLoader(true);
    setIsError(false);

    try {
      const res = await deleteData(`projects/${project.id}`);

      /* eslint-disable-next-line */
      console.log(res);

      dispatch(projectActions.take(project));

      onCancel();
    } catch {
      setIsError(true);
    } finally {
      setIsLoader(false);
    }
  }

  /* eslint-disable-next-line */
  console.log(isError, isLoader);

  return (
    <div className="remove">

      {isError && (
        <div className="remove__error">
          <Icon icon={error} />
        </div>
      )}

      <h1 className="remove__title">Attention</h1>

      <p className="remove__message">
        <span>Are you sure you want to delete the </span>
        <span className="remove__message_name">{project.name}</span>
        <span> project?</span>
      </p>

      <div className="letter__buttons">
        <CompleteButton
          title="Delete"
          onClick={() => onRemove()}
          isLoader={isLoader}
        />

        <CompleteReverseButton title="Cancel" onClick={onCancel} />
      </div>
    </div>
  );
};
