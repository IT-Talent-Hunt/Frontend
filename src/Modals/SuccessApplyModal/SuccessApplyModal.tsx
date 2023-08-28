import './SuccessApplyModal.scss';
// import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompleteButton } from '../../components/Buttons/CompleteButton/CompleteButton';
// import { ModalContext } from '../../Providers/ModalProvider';

type Props = {
  message: string,
  onClose: (value: string) => void,
};

export const SuccessApplyModal: React.FC<Props> = ({ message, onClose }) => {
  // const { setIsModal } = useContext(ModalContext);
  const navigaton = useNavigate();

  const onBack = () => {
    // setIsModal(false);
    onClose('');
    navigaton('/main');
  };

  return (
    <div className="successApply">
      <h1 className="successApply__title">Congratulations!</h1>

      <p className="successApply__title_sub">
        {message}
      </p>

      <CompleteButton title="Go back" onClick={onBack} />
    </div>
  );
};
