/* eslint-disable */

import React, { useCallback, useContext, useEffect, useState } from 'react';
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
import * as projectActions from './redux/features/projects/projects';
import { ModalContext, ModalProvider } from './Providers/ModalProvider';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { ProjectCardProps } from './Types/ProjectCardProps';
import { useLocalStorage } from 'usehooks-ts';
import { User } from './Types/User';

// import { useAppSelector } from './redux/hooks';

export const App: React.FC = () => {
  const navigation = useNavigate();
  const [currentProject, setCurrentProject] = useState<ProjectCardProps | null>(null);

  const { projects } = useAppSelector(state => state.projects);
  const [user] = useLocalStorage<User | null>('user', null);

  const dispatch = useAppDispatch();

  const [isSideBar, setIsSideBar] = useState(false);
  const [toEditProject, setToEditProject] = useState<ProjectCardProps | any>(projects[1]);

  const { isModal, setIsModal } = useContext(ModalContext);

  const [isApplyCanceled, setIsApplyCanceled] = useState<boolean>(false);
  const [isFavoriteCanceled, setIsFavoriteCanceled] = useState<boolean>(false);

  const [cenceledMessage, setCenceledMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleCardClick = useCallback((project: ProjectCardProps) => {
    setIsModal(true);
    setCurrentProject(project);
  }, []);

  const onSuccessApplied = (projectName: string) => {
    setIsModal(true);
    setSuccessMessage(`You have successfuly applied to the "${projectName}" project.`)
  }

  const onCanceledApply = (projectName: string) => {
    setIsModal(true);
    setIsApplyCanceled(true);

    if (user && user.id) {
      setCenceledMessage(
        `Unfortunately, you don't have needed specialty for the project "${projectName}".`,
      )
    } else {
      setCenceledMessage(`You must sign in for apply to the "${projectName}" project.`);
    }

  }

  const onCanceledFavorite = (projectName: string) => {
    setIsModal(true);
    setIsFavoriteCanceled(true);
    setCenceledMessage(`For a adding project "${projectName}", you mist sign in.`);
  }

  const selectEditProject = (event: React.MouseEvent, projectId: number | any) => {
    event.stopPropagation();

    // console.log(projects);

    if (projectId && projects) {
      const editProject = projects.find((project) => project.id === projectId);

      if (editProject) {
        setToEditProject(editProject);
        navigation('edit_project');
      }
    }
  };

  console.log(isModal);

  const applyProject = (event: React.MouseEvent<HTMLButtonElement>, project: ProjectCardProps) => {
    event.stopPropagation();
    event.preventDefault();

    if (user && user.id) {
      const itPositionHas = project.teamResponseDto.requiredSpecialities.includes(user.speciality);

      if (itPositionHas) {
        dispatch(projectActions.apply({ teamId: project.teamResponseDto.id, userId: user.id! }));
        onSuccessApplied(project.name);
      } else {
        onCanceledApply(project.name);
      }
    } else {
      onCanceledApply(project.name);
    }
  }

  const onProjectModalClose = () => {
    setIsModal(false);
    setCurrentProject(null);
  }

  return (
      <div className="starter">
        <header>
          <Header isSideBar={isSideBar} setIsSideBar={setIsSideBar} />
        </header>
        <main>
          <Routes>
            <Route path="main" element={<Navigate to="/" replace />} />
            <Route
              index
              element={
                <MainPage
                  isSideBar={isSideBar}
                  setEditProject={selectEditProject}
                  onCanceledFavorite={onCanceledFavorite}
                  isApplyCanceled={isApplyCanceled}
                  cenceledMessage={cenceledMessage}
                  isFavoriteCanceled={isFavoriteCanceled}
                  applyProject={applyProject}
                  successMessage={successMessage}
                  setSuccessMessage={setSuccessMessage}
                  setCenceledMessage={setCenceledMessage}
                  cardClick={handleCardClick}
                  currentProject={currentProject}
                  onProjectModalClose={onProjectModalClose}
                />
              }
            />
            <Route path="createProject" element={<ProjectPage />} />
            <Route path="profile" element={
              <ProfilePage
                onApply={applyProject}
                onFavorite={onCanceledFavorite}
                onProjectModalClose={onProjectModalClose}
              />
            } />
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
  );
};
