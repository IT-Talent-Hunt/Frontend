/* eslint-disable */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
// import { Outlet } from 'react-router-dom';
import './App.scss';
import {
  Navigate,
  Route,
  Routes,
  useMatch,
  useNavigate,
  useParams,
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
import { SavedPage } from './pages/Saved/SavedPage';
import { getData } from './helpers/helpers';
import { Messages } from './components/Messages/Messages';
import SockJsClient from 'react-stomp';
import { Modal } from './components/Modal/Modal';
import { ProjectModal } from './Modals/ProjectModal/ProjectModal';
import { SuccessApplyModal } from './Modals/SuccessApplyModal/SuccessApplyModal';
import { CenceledApplyModal } from './Modals/CanceledApplyModal/CanceledApplyModal';
import { LetterModal } from './Modals/LetterModal/LetterModal';
import { LoaderBig } from './components/Loader/LoaderBig';
import { RequestsPage } from './pages/RequestsPage/RequestsPage';
import { NotFound } from './components/NotFound/NotFound';
import { BASE_URL } from './helpers/fetchProd';

export const App: React.FC = () => {
  const navigation = useNavigate();
  const [currentProject, setCurrentProject] = useState<ProjectCardProps | null>(null);
  const [onApplyProject, setOnApplyProject] = useState<ProjectCardProps | null>(null);

  const { projects } = useAppSelector(state => state.projects);
  const [user] = useLocalStorage<User | null>('user', null);
  // const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const dispatch = useAppDispatch();

  const [isSideBar, setIsSideBar] = useState(false);
  const [toEditProject, setToEditProject] = useState<ProjectCardProps | any>(projects[1]);

  const { isModal, setIsModal } = useContext(ModalContext);

  const [isApplyCanceled, setIsApplyCanceled] = useState<boolean>(false);
  const [isFavoriteCanceled, setIsFavoriteCanceled] = useState<boolean>(false);
  const [isCoverLetter, setIsCoverLetter] = useState<boolean>(false);

  const [cenceledMessage, setCenceledMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  // const match = useMatch('/profile/:userId');
  // const userId = match?.params.userId;

  const [messages, setMessages] = useLocalStorage<any>('messages', []);
  const [typedMessage, setTypedMessage] = useState('Kolya privet');
  const [name, setName] = useState('DB');

  const clientRef = useRef<any>(null);
  const [isTokenValid, setIsTokenValid] = useLocalStorage('isTokenValid', true);

  const sendMessage = (name: string, message: string) => {
    if (clientRef.current) {
      clientRef.current.sendMessage('/app/user-all', JSON.stringify({
        name,
        message,
      }));
    }
  };

  // const getUser = async(userId: string) => {
  //   if (userId) {
  //     setIsModal(false);
  //     await getData(`users/${userId}`)
  //     .then((res: any) => setSelectedUser(res));
  //   }
  // }

  // useEffect(() => {
  //   getUser(userId!);
  // }, [userId])

  const handleCardClick = useCallback((project: ProjectCardProps) => {
    setIsModal(true);
    setCurrentProject(project);
  }, []);

  const onSuccessApplied = (projectName: string) => {
    // setIsModal(true);
    // setSuccessMessage(`You have successfuly applied to the "${projectName}" project.`)
  }

  const onCanceledApply = (projectName: string) => {
    setIsModal(true);
    setIsApplyCanceled(true);

    if (user && user.id) {
      setCenceledMessage(
        `You cannot apply to the project because you don't have the required specialization.`,
      )
    } else {
      setCenceledMessage(`You need to sign in before applying to the project.`);
    }
  }

  const onCanceledClose = () => {
    setCenceledMessage('');
    setIsApplyCanceled(false);
  }

  const onCanceledFavorite = (projectName: string) => {
    setIsModal(true);
    setIsFavoriteCanceled(true);
    // setCenceledMessage(`For a adding project "${projectName}", you mist sign in.`);
    setCenceledMessage(
      "Sorry, the 'Add to Favorites' feature is only available to registered users. Please sign in.",
    );
  }

  const selectEditProject = (event: React.MouseEvent, projectId: number | any) => {
    event.stopPropagation();

    // console.log(projects);

    if (projectId && projects) {
      const editProject = projects.find((project: ProjectCardProps) => project.id === projectId);

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
    setOnApplyProject(project);

    if (user && user.id) {
      const itPositionHas = project.teamResponseDto.requiredSpecialities.includes(user.speciality);

      if (itPositionHas) {
        // dispatch(projectActions.apply({ teamId: project.teamResponseDto.id, userId: user.id! }));
        // onSuccessApplied(project.name);
        setIsCoverLetter(true);
        setIsModal(true);
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

  console.log('messages', messages);

  return (
      <div className="starter">
        {isModal && currentProject && (
          <Modal>
            <ProjectModal
              project={currentProject}
              onApply={applyProject}
              onFavorite={onCanceledFavorite}
              onProjectModalClose={onProjectModalClose}
            />
          </Modal>
        )}

        {isModal && isCoverLetter && (
          <Modal>
            <LetterModal onSend={sendMessage} onClose={setIsCoverLetter} project={onApplyProject!} />
          </Modal>
        )}

        {isModal && !isApplyCanceled && successMessage &&   (
          <Modal>
             <SuccessApplyModal message={successMessage} onClose={setSuccessMessage}/>
          </Modal>
        )}

        {isModal && isApplyCanceled && cenceledMessage && (
          <Modal>
            <CenceledApplyModal message={cenceledMessage} onClose={onCanceledClose} />
          </Modal>
        )}

        {isModal && isFavoriteCanceled && cenceledMessage && (
          <Modal>
            <CenceledApplyModal message={cenceledMessage} onClose={onCanceledClose} />
          </Modal>
        )}

        {!isTokenValid && (
          <Modal>
            <CenceledApplyModal
              message={'Your token has expired, please sign in.'}
              onClose={() => setIsTokenValid(true)} />
          </Modal>
        )}
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
                  applyProject={applyProject}
                  cardClick={handleCardClick}
                />
              }
            />
            <Route path="createProject" element={<ProjectPage />} />
            <Route path="profile">
            <Route index
              element={
                <ProfilePage
                  onCardClick={handleCardClick}
                />
              }
            />

              <Route path=":userId"
                element={
                  <ProfilePage
                    onCardClick={handleCardClick}
                  />
                }
              />
            </Route>
            <Route path="edit_project" element={<EditProject project={toEditProject!} />} />
            <Route path="signIn" element={<SignInPage />} />
            <Route path="recovery" element={<PasswordRecovery />} />
            <Route path="recoveryComplete" element={<RecoveryComplete />} />
            <Route path="profileCreate" element={<CreateProfile />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="messages" element={<Messages />} />
            <Route path="requests" element={<RequestsPage cardClick={handleCardClick}/>} />

            <Route path="requests">
              <Route index element={<RequestsPage cardClick={handleCardClick}/>} />
              <Route path=":requestId" element={<RequestsPage cardClick={handleCardClick}/>} />

            </Route>

            <Route path="saved"
              element={
                <SavedPage
                  onCardClick={handleCardClick}
                  setEditProject={selectEditProject}
                  onApply={applyProject}
                  onFavorite={onCanceledFavorite}
                  applyProject={applyProject}
                />
              }
            />
            <Route path="*" element={<Navigate to='/' replace />} />
          </Routes>

          <SockJsClient
            url={`${BASE_URL}/websocket-chat/`}
            topics={['/topic/user', `/user/${user?.email}/queue/notification`]}
            onConnect={() => {
              console.log('connected');
            }}
            onDisconnect={() => {
              console.log('Disconnected');
            }}
            onMessage={(msg: any) => {
              setMessages((current: any): any => [...current, msg]);
              console.log(messages, msg);
            }}
            ref={(client: any) => {
              clientRef.current = client;
            }}
          />
        </main>
        {/* { isSignedIn && (
          <footer>
            <Footer />
          </footer>
        )} */}
      </div>
  );
};
