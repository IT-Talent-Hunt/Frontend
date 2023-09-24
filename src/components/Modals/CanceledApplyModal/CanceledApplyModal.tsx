import { useCallback } from 'react';
import { CompleteButton } from '../../Buttons/CompleteButton/CompleteButton';
import './CanceledApplyModal.scss';

type Props = {
  message: string,
  onClose: () => void,
};

export const CenceledApplyModal: React.FC<Props> = ({ message, onClose }) => {
  const onBack = useCallback(() => {
    onClose();
  }, []);

  return (
    <div className="cenceledApply">
      <h1 className="cenceledApply__title">Ooops!</h1>

      <p className="cenceledApply__title_sub">
        {message}
      </p>

      <CompleteButton title="Go back" onClick={onBack} />
    </div>
  );
};
