import React, { useState } from 'react';
import './PasswordRecovery.scss';
import { useNavigate } from 'react-router-dom';
import { BackTo } from '../BackTo/BackTo';
import { emailValidate } from '../../helpers/validation';
import { InputField } from '../InputField/InputField';
import { CompleteButton } from '../Buttons/CompleteButton/CompleteButton';

export const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [isEmailDirty, setIsEmailDirty] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');

  const navigation = useNavigate();

  const emailFied = {
    id: 0,
    type: 'email',
    name: 'email',
    value: email,
    message: emailMessage,
    isDirty: isEmailDirty,
    text: 'Email',
  };

  const onBlurHandler = () => {
    emailValidate(email, setIsEmailDirty, setEmailMessage);
  };

  const isValid = !isEmailDirty && !!email;

  const onSubmit = () => {
    if (isValid) {
      navigation('/recoveryComplete');
    }
  };

  return (
    <section className="recovery">
      <div className="recovery__wrapper">
        <BackTo />
        <div className="recovery__shell">
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

          <CompleteButton title="Send" isDisabled={isValid} onClick={onSubmit} />
        </div>
      </div>
    </section>
  );
};
