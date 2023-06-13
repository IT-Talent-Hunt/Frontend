import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.scss';
import { FormState } from '../../Types/FormState';
import { validation } from '../../helpers/validation';

export const LoginForm: FC = () => {
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [email, setEmail] = useState('');
  const [state, setState] = useState<FormState>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormState>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isSigningUp, setIsSigningUp] = useState(false);
  const navigate = useNavigate();

  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [evt.target.name]: [evt.target.value] });
  };

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLSpanElement>) => {
    if (evt.key === 'Enter') {
      setIsSigningUp(true);
    }
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    // localStorage.setItem('isSignedIn', 'true');
    setErrors(validation(state));

    if (!errors.email && !errors.password && !errors.confirmPassword) {
      navigate('/main');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.header}>Sign in</h1>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          // required
          value={state.email}
          onChange={(evt) => handleInput(evt)}
          className={styles.input}
          placeholder="Enter email"
        />
        {
          errors.email && <span>{ errors.email }</span>
        }
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          // required
          minLength={5}
          value={state.password}
          onChange={(evt) => handleInput(evt)}
          className={styles.input}
          placeholder="Enter password"
        />
        {
          errors.password && <span>{ errors.password }</span>
        }
        {isSigningUp && (
          <>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              // required
              minLength={5}
              value={state.confirmPassword}
              onChange={(evt) => handleInput(evt)}
              className={styles.input}
              placeholder="Repeat password"
            />
            {
              errors.confirmPassword && <span>{ errors.confirmPassword }</span>
            }
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
