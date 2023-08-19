import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
// import classNames from 'classnames';
import { Header } from './components/Header/Header';
// import { Footer } from './components/Footer/Footer';
import { MainPage } from './pages/MainPage/MainPage';
import { ProjectPage } from './components/ProjectPage/ProjectPage';
import { ProfilePage } from './components/ProfilePage/ProfilePage';
import { EditProject } from './components/EditProject/EditProject';
import { SignInPage } from './pages/SignInPage/SignInPage';
import { PasswordRecovery } from './components/PasswordRecovery/PasswordRecovery';
import { RecoveryComplete } from './components/RecoveryComplete/RecoveryComplete';
import { CreateProfile } from './components/CreateProfile/CreateProfile';
import { SignUp } from './pages/SignUpPage/SignUp';
import { ModalProvider } from './Providers/ModalProvider';
import { useAppSelector } from './redux/hooks';

export const App: React.FC = () => {
  // const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSideBar, setIsSideBar] = useState(false);

  const { projects } = useAppSelector(state => state.projects);

  const project = projects[3];

  return (
    <ModalProvider>
      <div className="starter">
        <header>
          <Header isSideBar={isSideBar} setIsSideBar={setIsSideBar} />
        </header>
        <main>
          <Routes>
            <Route path="main" element={<Navigate to="/" replace />} />
            <Route index element={<MainPage isSideBar={isSideBar} />} />
            <Route path="createProject" element={<ProjectPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="edit_project" element={<EditProject project={project} />} />
            <Route path="signIn" element={<SignInPage />} />
            <Route path="recovery" element={<PasswordRecovery />} />
            <Route path="recoveryComplete" element={<RecoveryComplete />} />
            <Route path="profileCreate" element={<CreateProfile />} />
            <Route path="signUp" element={<SignUp />} />
          </Routes>
        </main>
        {/* { isSignedIn && (
          <footer>
            <Footer />
          </footer>
        )} */}
      </div>
    </ModalProvider>
  );
};
