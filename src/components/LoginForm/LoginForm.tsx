import React, {
  FC, FormEvent, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styles from './LoginForm.module.scss';
// import { FormState } from '../../Types/FormState';
// import { validation } from '../../helpers/validation';
import 'boxicons';

export const LoginForm: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isEmailDirty, setIsEmailDirty] = useState(false);
  const [isPasswordlDirty, setIsPasswordlDirty] = useState(false);
  const [isConfirmPasswordDirty, setIsConfirmPasswordDirty] = useState(false);

  const [emailMessage, setEmailMessage] = useState('123');
  const [passwordMessage, setPasswordMessgae] = useState('456');
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('789');

  const [isSigningUp, setIsSigningUp] = useState(false);
  const navigate = useNavigate();

  const handleInput = (
    setState: (value: string) => void,
    setStateDirty: (value: boolean) => void,
    evt: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = evt.target;

    setState(value);
    setStateDirty(false);
  };

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLSpanElement>) => {
    if (evt.key === 'Enter') {
      setIsSigningUp(true);
    }
  };

  const passwordValidate = (pass: string) => {
    const PASS_REF = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (pass.trim() === '') {
      setIsPasswordlDirty(true);
      setPasswordMessgae('Password can not be empty');
    } else if (!PASS_REF.test(pass)) {
      setIsPasswordlDirty(true);
      setPasswordMessgae('Password must be not empty');
    }
  };

  const emailValidate = (emailData: string) => {
    const EMAIL_REF = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailData.trim() === '') {
      setIsEmailDirty(true);
      setEmailMessage('Email field can not be empty');
    } else if (!EMAIL_REF.test(emailData)) {
      setIsEmailDirty(true);
      setEmailMessage('Email is not valid');
    }
  };

  const confirmPasswordValidate = (confirmPasswordData: string, passwordData: string) => {
    if (confirmPassword.trim() === '') {
      setIsConfirmPasswordDirty(true);
      setConfirmPasswordMessage('confirm password can not be empty');
    } else if (confirmPasswordData !== passwordData) {
      setIsConfirmPasswordDirty(true);
      setConfirmPasswordMessage('pasword is not supported');
    }
  };

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    passwordValidate(password);
    emailValidate(email);
    confirmPasswordValidate(confirmPassword, password);

    let isValidForms = isEmailDirty === false
    && email.length > 0
    && !!isPasswordlDirty === false
    && password.length > 0;

    if (isSigningUp) {
      isValidForms = isEmailDirty === false
      && email.length > 0
      && isPasswordlDirty === false
      && password.length > 0
      && isConfirmPasswordDirty === false
      && confirmPassword.length > 0;
    }

    /* eslint-disable-next-line */
    console.log(isValidForms);

    if (isValidForms) {
      navigate('/main');
    }
  };

  /* eslint-disable-next-line */
  console.log(isEmailDirty, isPasswordlDirty, isConfirmPasswordDirty);

  const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;

    switch (name) {
      case 'email':
        // setIsEmailDirty(true);
        emailValidate(email);
        break;

      case 'password':
        // setIsPasswordlDirty(true);
        passwordValidate(password);
        break;

      case 'confirmPassword':
        // setIsConfirmPasswordDirty(true);
        confirmPasswordValidate(confirmPassword, password);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.header}>Sign in</h1>
        <label htmlFor="email" className={styles.label}>
          <p>Email</p>
          <input
            // type="email"
            name="email"
            id="email"
            // required
            value={email}
            onChange={(evt) => handleInput(setEmail, setIsEmailDirty, evt)}
            onBlur={(event) => onBlurHandler(event)}
            // className={styles.input}
            className={classNames(styles.input, { [styles.input__error]: isEmailDirty })}
            placeholder="Enter email"
          />

          {isEmailDirty && (
            <span className={styles.input__error_message}>
              <i className="bx bx-error" />
              <span>{emailMessage}</span>
            </span>
          )}
        </label>
        <label htmlFor="password" className={styles.label} id="password">
          <p>Password</p>
          <input
            type="password"
            id="password"
            name="password"
            // required
            minLength={5}
            value={password}
            onChange={(evt) => handleInput(setPassword, setIsPasswordlDirty, evt)}
            onBlur={(event) => onBlurHandler(event)}
            className={classNames(styles.input, { [styles.input__error]: isPasswordlDirty })}
            placeholder="Enter password"
          />
          {isPasswordlDirty && (
            <span className={styles.input__error_message}>
              <i className="bx bx-error" />
              <span>{passwordMessage}</span>
            </span>
          )}
        </label>
        {isSigningUp && (
          <>
            <label htmlFor="confirmPassword" className={styles.label}>
              <p>Confirm password</p>

              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                // required
                minLength={5}
                value={confirmPassword}
                onChange={(evt) => handleInput(setConfirmPassword, setIsConfirmPasswordDirty, evt)}
                onBlur={(event) => onBlurHandler(event)}
                className={classNames(
                  styles.input,
                  { [styles.input__error]: isConfirmPasswordDirty },
                )}
                placeholder="Repeat password"
              />

              {isConfirmPasswordDirty && (
                <span className={styles.input__error_message}>
                  <i className="bx bx-error" />
                  <span>{confirmPasswordMessage}</span>
                </span>
              )}
            </label>
          </>
        )}
        {isSigningUp ? (
          <button type="submit" className={styles.button}>
            Sign up
          </button>
        ) : (
          <button type="submit" className={styles.button}>
            Sign in
          </button>
        )}
      </form>
      {isSigningUp ? (
        <span className={styles.span}>
          Have an account?&nbsp;
          <span
            className={styles.link}
            onClick={() => setIsSigningUp(false)}
            onKeyDown={(evt) => handleKeyDown(evt)}
            role="link"
            tabIndex={0}
          >
            Sign in
          </span>
        </span>
      ) : (
        <span className={styles.span}>
          Don&apos;t have an account yet?&nbsp;
          <span
            className={styles.link}
            onClick={() => setIsSigningUp(true)}
            onKeyDown={(evt) => handleKeyDown(evt)}
            role="link"
            tabIndex={0}
          >
            Register now
          </span>
        </span>
      )}
    </div>
  );
};
