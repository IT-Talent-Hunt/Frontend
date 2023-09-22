import { FC, useState } from 'react';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { Container } from '../../components/Container/Container';
// import { ProjectContainer } from '../../components/ProjectContainer/ProjectContainer';

export const SignInPage: FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="container">
      <Container>
        <LoginForm isSigningUp={isSignUp} setIsSigningUp={setIsSignUp} />
      </Container>
    </div>
  );
};
