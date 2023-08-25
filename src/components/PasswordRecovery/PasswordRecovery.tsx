import React, { useState } from 'react';
import './PasswordRecovery.scss';
import { useNavigate } from 'react-router-dom';
import { BackTo } from '../BackTo/BackTo';
import { emailValidate } from '../../helpers/validation';
import { InputField } from '../InputField/InputField';
import { CompleteButton } from '../Buttons/CompleteButton/CompleteButton';
import { Container } from '../Container/Container';

export const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [isEmailDirty, setIsEmailDirty] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [isEmailSuccess, setIsEmailSuccess] = useState(false);

  const navigation = useNavigate();

  const emailFied = {
    id: 0,
    type: 'email',
    name: 'email',
    value: email,
    message: emailMessage,
    isDirty: isEmailDirty,
    isSuccess: isEmailSuccess,
    text: 'Email',
  };

  const onBlurHandler = () => {
    emailValidate(email, setIsEmailDirty, setEmailMessage, setIsEmailSuccess);
  };

  // const isValid = !!isEmailSuccess;

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    emailValidate(email, setIsEmailDirty, setEmailMessage, setIsEmailSuccess);

    if (isEmailSuccess) {
      navigation('/recoveryComplete');
    }
  };

  return (
    <section className="recovery">
      <Container>
        <form action="" onSubmit={(event) => onSubmit(event)}>
          <div className="recovery__back">
            <BackTo />
          </div>
          <h1 className="recovery__title">Password recovery</h1>
          <p className="recovery__title_sub">
            {
              `To reset your password,
              enter the email used to log in.
              A recovery link will be sent to it.`
            }
          </p>

          <InputField
            input={emailFied}
            onBlur={onBlurHandler}
            setValue={setEmail}
            setIsValueDirty={setIsEmailDirty}
          />

          <div className="recovery__button">
            <CompleteButton title="Send" isDisabled={isEmailSuccess} />
          </div>
        </form>
      </Container>
    </section>
  );
};
