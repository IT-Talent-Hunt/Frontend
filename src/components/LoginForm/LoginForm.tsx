import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.scss';

export const LoginForm: FC = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    localStorage.setItem('isSignedIn', 'true');

    navigate('/main');
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
          required
          id="email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          className={styles.input}
          placeholder="Enter email"
        />
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          required
          minLength={5}
          id="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          className={styles.input}
          placeholder="Enter your password"
        />
        <button type="submit" className={styles.button}>
          Sign in
        </button>
      </form>
      <span className={styles.span}>
        Don&apos;t have an account yet?
        <a href="/" className={styles.link}> Register now</a>
      </span>
    </div>
  );
};
