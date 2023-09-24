/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {
  FC, FormEvent, useCallback, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { postData } from '../../helpers/helpers';
import styles from './LoginForm.module.scss';
import { InputField } from '../InputField/InputField';
import { passwordValidate, confirmPasswordValidate, emailValidate } from '../../helpers/validation';
import { CompleteButton } from '../Buttons/CompleteButton/CompleteButton';
import 'boxicons';
import { User } from '../../Types/User';

type Props = {
  isSigningUp: boolean,
  setIsSigningUp: (value: boolean) => void,
};

export const LoginForm: FC<Props> = ({ isSigningUp, setIsSigningUp }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [isEmailDirty, setIsEmailDirty] = useState<boolean>(false);
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [isEmailSucces, setIsEmailSucces] = useState<boolean>(false);

  const [password, setPassword] = useState<string>('');
  const [isPasswordlDirty, setIsPasswordlDirty] = useState<boolean>(false);
  const [passwordMessage, setPasswordMessgae] = useState<string>('');
  const [isPasswordSucces, setIsPasswordSucces] = useState<boolean>(false);

  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isConfirmPasswordDirty, setIsConfirmPasswordDirty] = useState<boolean>(false);
  const [isConfirmPasswordSucces, setIsConfirmPasswordSucces] = useState<boolean>(false);
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState<string>('');

  const [isServer, setIsServer] = useState<string>('');
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [token, setToken] = useLocalStorage<string>('tokenId', '');
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const isValidForms: boolean = !!isEmailSucces
  && isSigningUp ? !!isConfirmPasswordSucces && !!isPasswordSucces : !!isPasswordSucces;

  const isButtonDisabled: boolean = !!email.length
  && isSigningUp ? !!confirmPassword.length && !!password.length : !!password.length;

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLSpanElement>) => {
    if (evt.key === 'Enter') {
      setIsSigningUp(true);
    }
  };

  async function getLoginData() {
    let answear: any;

    try {
      setIsLoader(true);

      if (isSigningUp) {
        answear = await postData('auth/signUp', {
          email,
          password,
          confirmPassword,
        });
      } else {
        answear = await postData('auth/signIn', {
          email,
          password,
        });
      }

      setIsServer(answear);

      if (answear.message !== undefined) {
        setIsServer(answear.message.split(': ')[0].trim());
      } else {
        setUser(answear.userResponseDto);
        setToken(answear.token);
        setIsServer('success');
      }
    } catch (error) {
      if (isSigningUp) {
        setIsEmailSucces(false);
        setIsEmailDirty(true);
        setEmailMessage('Email is already registered');
      } else {
        setIsEmailSucces(false);
        setIsEmailDirty(true);
        setEmailMessage('Invalid email or password');
      }
    } finally {
      setIsLoader(false);
    }
  }

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    passwordValidate(password, setIsPasswordlDirty, setPasswordMessgae, setIsPasswordSucces);
    emailValidate(email, setIsEmailDirty, setEmailMessage, setIsEmailSucces);
    confirmPasswordValidate(
      confirmPassword,
      password,
      setIsConfirmPasswordDirty,
      setConfirmPasswordMessage,
      setIsConfirmPasswordSucces,
    );

    if (isValidForms) {
      getLoginData();
    }
  };

  useEffect(() => {
    if (isSigningUp) {
      if (isServer === 'Email is already registered') {
        setIsEmailSucces(false);
        setIsEmailDirty(true);
        setEmailMessage(isServer);
      } else if (isServer === 'success') {
        navigate('/profileCreate');
      }
    } else if (user?.email) {
      navigate('/main');
    }
  }, [isServer]);

  const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;

    switch (name) {
      case 'email':
        emailValidate(email, setIsEmailDirty, setEmailMessage, setIsEmailSucces);

        break;

      case 'password':
        passwordValidate(password, setIsPasswordlDirty, setPasswordMessgae, setIsPasswordSucces);

        break;

      case 'confirmPassword':
        confirmPasswordValidate(
          confirmPassword,
          password,
          setIsConfirmPasswordDirty,
          setConfirmPasswordMessage,
          setIsConfirmPasswordSucces,
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
    isSuccess: isEmailSucces,
    text: 'Email',
  };

  const inputPassword = {
    id: 1,
    type: 'password',
    name: 'password',
    value: password,
    message: passwordMessage,
    isDirty: isPasswordlDirty,
    isSuccess: isPasswordSucces,
    text: 'Password',
  };

  const inputConfirmPassword = {
    id: 2,
    type: 'password',
    name: 'confirmPassword',
    value: confirmPassword,
    message: confirmPasswordMessage,
    isDirty: isConfirmPasswordDirty,
    isSuccess: isConfirmPasswordSucces,
    text: 'Confirm Password',
  };

  return (
    <section className={styles.login}>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
        method="POST"
      >
        <h1 className={styles.header}>
          {`Sign ${isSigningUp ? 'up' : 'in'}`}
        </h1>

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

        <div className={styles.complete}>
          <CompleteButton
            title={isSigningUp ? 'Sign up' : 'Sign in'}
            isDisabled={isValidForms && isButtonDisabled}
            isLoader={isLoader}
          />
        </div>
      </form>

      <p className={styles.p}>
        {!isSigningUp ? (
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

          {!isSigningUp ? (
            <span>Register now</span>
          ) : (
            <span>Sign in</span>
          )}
        </span>
      </p>
    </section>
  );
};
