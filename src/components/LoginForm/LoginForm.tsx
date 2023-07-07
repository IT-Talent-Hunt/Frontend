import React, {
  FC, FormEvent, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.scss';
import { InputField } from '../InputField/InputField';
import { passwordValidate, confirmPasswordValidate, emailValidate } from '../../helpers/validation';
import { CompleteButton } from '../Buttons/CompleteButton/CompleteButton';
// import { Container } from '../Container/Container';

import 'boxicons';

type Props = {
  isSigningUp: boolean,
  setIsSigningUp: (value: boolean) => void,
};

export const LoginForm: FC<Props> = ({ isSigningUp, setIsSigningUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isEmailDirty, setIsEmailDirty] = useState(false);
  const [isPasswordlDirty, setIsPasswordlDirty] = useState(false);
  const [isConfirmPasswordDirty, setIsConfirmPasswordDirty] = useState(false);

  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessgae] = useState('');
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');

  let isValidForms = isEmailDirty === false
  && email.length > 0
  && !!isPasswordlDirty === false
  && password.length > 0;

  // const [isSigningUp, setIsSigningUp] = useState(false);
  const navigate = useNavigate();

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLSpanElement>) => {
    if (evt.key === 'Enter') {
      setIsSigningUp(true);
    }
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    passwordValidate(password, setIsPasswordlDirty, setPasswordMessgae);
    emailValidate(email, setIsEmailDirty, setEmailMessage);
    confirmPasswordValidate(
      confirmPassword,
      password,
      setIsConfirmPasswordDirty,
      setConfirmPasswordMessage,
    );

    if (isSigningUp) {
      isValidForms = isEmailDirty === false
      && email.length > 0
      && isPasswordlDirty === false
      && password.length > 0
      && isConfirmPasswordDirty === false
      && confirmPassword.length > 0;
    }

    if (isValidForms) {
      if (isSigningUp) {
        navigate('/profileCreate');
      } else {
        navigate('/main');
      }
    }
  };

  const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;

    switch (name) {
      case 'email':
        emailValidate(email, setIsEmailDirty, setEmailMessage);

        break;

      case 'password':
        passwordValidate(password, setIsPasswordlDirty, setPasswordMessgae);

        break;

      case 'confirmPassword':
        confirmPasswordValidate(
          confirmPassword,
          password,
          setIsConfirmPasswordDirty,
          setConfirmPasswordMessage,
        );
        break;
      default:
        break;
    }
  };

  const inputEmail = {
    id: 0,
    type: 'email',
    name: 'email',
    value: email,
    message: emailMessage,
    isDirty: isEmailDirty,
    text: 'Email',
  };

  const inputPassword = {
    id: 1,
    type: 'password',
    name: 'password',
    value: password,
    message: passwordMessage,
    isDirty: isPasswordlDirty,
    text: 'Password',
  };

  const inputConfirmPassword = {
    id: 2,
    type: 'password',
    name: 'confirmPassword',
    value: confirmPassword,
    message: confirmPasswordMessage,
    isDirty: isConfirmPasswordDirty,
    text: 'Confirm Password',
  };

  return (
    <section style={{ width: '100%' }}>
      <form onSubmit={handleSubmit} className={styles.form} method="get">
        <h1 className={styles.header}>Sign in</h1>

        <InputField
          input={inputEmail}
          onBlur={onBlurHandler}
          setValue={setEmail}
          setIsValueDirty={setIsEmailDirty}
        />

        <InputField
          input={inputPassword}
          onBlur={onBlurHandler}
          setValue={setPassword}
          setIsValueDirty={setIsPasswordlDirty}
          isSignedUp={isSigningUp}
        />

        {isSigningUp && (
          <>
            <InputField
              input={inputConfirmPassword}
              onBlur={onBlurHandler}
              setValue={setConfirmPassword}
              setIsValueDirty={setIsConfirmPasswordDirty}
            />
          </>
        )}

        <CompleteButton
          title={isSigningUp ? 'Sign up' : 'Sign in'}
          isDisabled={isValidForms}
        />
      </form>

      <p className={styles.p}>
        {isSigningUp ? (
          <span>Don&apos;t have an account yet?&nbsp;</span>
        ) : (
          <span>Have an account?&nbsp;</span>
        )}

        <span
          className={styles.link}
          onClick={() => {
            if (isSigningUp) {
              navigate('/signIn');
            } else {
              navigate('/signUp');
            }
          }}
          onKeyDown={(evt) => handleKeyDown(evt)}
          role="link"
          tabIndex={0}
        >

          {isSigningUp ? (
            <span>Sign in </span>
          ) : (
            <span>Register now</span>
          )}
        </span>
      </p>
    </section>
  );
};
