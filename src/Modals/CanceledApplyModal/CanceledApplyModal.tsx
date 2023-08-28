import './CanceledApplyModal.scss';
// import { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import { CompleteButton } from '../../components/Buttons/CompleteButton/CompleteButton';
// import { ModalContext } from '../../Providers/ModalProvider';

type Props = {
  message: string,
  onClose: (value: string) => void,
};

export const CenceledApplyModal: React.FC<Props> = ({ message, onClose }) => {
  // const { setIsModal } = useContext(ModalContext);
  // const navigaton = useNavigate();

  const onBack = () => {
    onClose('');
    // setIsModal(false);
    // navigaton('/main');
  };

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
