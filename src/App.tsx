/* eslint-disable */

import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
import './App.scss';
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
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
import { ProjectCardProps } from './Types/ProjectCardProps';
// import { useAppSelector } from './redux/hooks';

export const App: React.FC = () => {
  const navigation = useNavigate();
  const { projects } = useAppSelector(state => state.projects);
  // const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSideBar, setIsSideBar] = useState(false);
  const [toEditProject, setToEditProject] = useState<ProjectCardProps | null>(null);

  const selectEditProject = (event: React.MouseEvent, projectId: number | any) => {
    event.stopPropagation();

    if (projectId && projects) {
      const editProject = projects.find((project) => project.id === projectId);

      if (editProject) {
        setToEditProject(editProject);
        navigation('edit_project');
      }
    }
  };

  /* eslint-disable-next-line */
  console.log(toEditProject);

  return (
    <ModalProvider>
      <div className="starter">
        <header>
          <Header isSideBar={isSideBar} setIsSideBar={setIsSideBar} />
        </header>
        <main>
          <Routes>
            <Route path="main" element={<Navigate to="/" replace />} />
            <Route
              index
              element={<MainPage isSideBar={isSideBar} setEditProject={selectEditProject} />}
            />
            <Route path="createProject" element={<ProjectPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="edit_project" element={<EditProject project={toEditProject!} />} />
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
