import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecoveryComplete.scss';
import { CompleteButton } from '../Buttons/CompleteButton/CompleteButton';
import { Container } from '../Container/Container';

export const RecoveryComplete = () => {
  const navigation = useNavigate();

  const onSubmit = () => {
    navigation('/signIn');
  };

  return (
    <section className="recoveryComplete">
      <Container>
        <h1 className="recoveryComplete__title">
          Link send to your email!
        </h1>

        <p className="recoveryComplete__title-sub">
          Follow the links to recover your password.
        </p>

        <CompleteButton title="Log in" onClick={onSubmit} />
      </Container>
    </section>
  );
};
