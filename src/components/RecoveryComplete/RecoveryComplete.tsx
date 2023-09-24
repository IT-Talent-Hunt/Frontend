import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompleteButton } from '../Buttons/CompleteButton/CompleteButton';
import { Container } from '../Container/Container';
import './RecoveryComplete.scss';

export const RecoveryComplete = () => {
  const navigation = useNavigate();

  const onSubmit = useCallback(() => {
    navigation('/signIn');
  }, []);

  return (
    <section className="recoveryComplete">
      <Container>
        <h1 className="recoveryComplete__title">
          Link send to your email!
        </h1>

        <p className="recoveryComplete__title-sub">
          Follow the links to recover your password.
        </p>

        <div className="recoveryComplete__button">
          <CompleteButton title="Log in" onClick={onSubmit} />
        </div>
      </Container>
    </section>
  );
};
