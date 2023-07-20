import React, {
  FC, FormEvent, useEffect, useState,
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
  const [email, setEmail] = useState('');
  const [isEmailDirty, setIsEmailDirty] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [isEmailSucces, setIsEmailSucces] = useState(false);

  const [password, setPassword] = useState('');
  const [isPasswordlDirty, setIsPasswordlDirty] = useState(false);
  const [passwordMessage, setPasswordMessgae] = useState('');
  const [isPasswordSucces, setIsPasswordSucces] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConfirmPasswordDirty, setIsConfirmPasswordDirty] = useState(false);
  const [isConfirmPasswordSucces, setIsConfirmPasswordSucces] = useState(false);
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');

  const [isServer, setIsServer] = useState('');
  const [user, setUser] = useLocalStorage<User | any>('user', {});

  let isValidForms = !!isEmailSucces && !!isPasswordSucces;

  const navigate = useNavigate();

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLSpanElement>) => {
    if (evt.key === 'Enter') {
      setIsSigningUp(true);
    }
  };

  async function getLoginData() {
    let answear: any;

    try {
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

      /* eslint-disable-next-line */
      console.log('a', answear);

      if (answear.message !== undefined) {
        setIsServer(answear.message.split(': ')[0].trim());
      } else {
        setUser(answear);
        setIsServer('success');
      }
    } catch (error) {
      if (isSigningUp) {
        /* eslint-disable-next-line */
        console.warn('ERROR abowed: ', error);
        // setIsEmailSucces(false);
        // setIsEmailDirty(true);
        // setEmailMessage('Email already registered');
      } else {
        setIsEmailSucces(false);
        setIsEmailDirty(true);
        setEmailMessage('Email is not registered yet');
      }
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

    if (isSigningUp) {
      isValidForms = !!isEmailSucces
      && !!isPasswordSucces && !!isConfirmPasswordSucces;
    }

    if (isValidForms) {
      getLoginData();
      // if (isSigningUp) {
      //   getLoginData();
      // }
    }
  };

  /* eslint-disable-next-line */
  console.log(isServer);

  useEffect(() => {
    if (isSigningUp) {
      if (isServer === 'Email is already registered') {
        setIsEmailSucces(false);
        setIsEmailDirty(true);
        setEmailMessage(isServer);
      } else if (isServer === 'success') {
        navigate('/profileCreate');
      }
    } else if (user.email) {
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
