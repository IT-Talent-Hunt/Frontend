import { FC } from 'react';
// import { LoginForm } from '../../components/LoginForm/LoginForm';
import { EditProject } from '../../components/EditProject/EditProject';

export const SignInPage: FC = () => {
  return (
    <div className="container">
      {/* <LoginForm /> */}
      <EditProject />
    </div>
  );
};
