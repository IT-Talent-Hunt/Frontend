import { useState } from 'react';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { Logo } from '../../components/Logo/Logo';
import './SignUp.scss';

export const SignUp = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(true);

  return (
    <section className="signUp">
      <div className="signUp__container">
        <LoginForm isSigningUp={isSignUp} setIsSigningUp={setIsSignUp} />
      </div>

      <div className="signUp__wrapper">
        <div style={{ margin: '0 auto' }}>
          <Logo />
          <h1 className="signUp__title">
            Your way to gain experience
          </h1>

          <p className="signUp__title-sub">
            Just a few clicks and you&apos;ll start your journey in IT!
          </p>
        </div>
      </div>
    </section>
  );
};
