/* eslint-disable react/jsx-no-bind,
react/jsx-wrap-multilines,
@typescript-eslint/no-non-null-asserted-optional-chain  */

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import './App.scss';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import SockJsClient from 'react-stomp';
import { Header } from './components/Header/Header';
import { MainPage } from './pages/MainPage/MainPage';
import { ProjectPage } from './components/ProjectPage/ProjectPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { SignInPage } from './pages/SignInPage/SignInPage';
import { PasswordRecovery } from './components/PasswordRecovery/PasswordRecovery';
import { RecoveryComplete } from './components/RecoveryComplete/RecoveryComplete';
import { CreateProfile } from './components/CreateProfile/CreateProfile';
import { SignUp } from './pages/SignUpPage/SignUp';
import { ModalContext } from './Providers/ModalProvider';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { ProjectCardProps } from './Types/ProjectCardProps';
import { User } from './Types/User';
import { SavedPage } from './pages/Saved/SavedPage';
import { Messages } from './pages/MessagesPage/MessagesPage';
import { Modal } from './components/Modal/Modal';
import { ProjectModal } from './components/Modals/ProjectModal/ProjectModal';
import { CenceledApplyModal } from './components/Modals/CanceledApplyModal/CanceledApplyModal';
import { LetterModal } from './components/Modals/LetterModal/LetterModal';
import { RequestsPage } from './pages/RequestsPage/RequestsPage';
import { BASE_URL } from './helpers/fetchProd';
import * as notificationsActions from './redux/features/Notification/notification';
import * as messagesAction from './redux/features/Messages/messages';
import { Notification } from './components/Notification/Notification';
import { RemoveModal } from './components/Modals/RemoveModal/RemoveModal';
import { EditPage } from './pages/EditPage/EditPage';
import { MessagesTypes } from './redux/features/Messages/messages';
import { FiltersEnumTypes } from './Types/FilterEnumTypes';

export const App: React.FC = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const [currentProject, setCurrentProject] = useState<ProjectCardProps | null>(null);
  const [onApplyProject, setOnApplyProject] = useState<ProjectCardProps | null>(null);

  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector(state => state.notifications);
  const { messages } = useAppSelector(state => state.messages);
  const [user] = useLocalStorage<User | null>('user', null);

  const [filter, setFilter] = useState(FiltersEnumTypes.ALL);
  const [isSideBar, setIsSideBar] = useState(false);
  const [isRemove, setIsRemove] = useState<boolean>(false);

  const [toRemoveProject, setToRemoveProject] = useState<ProjectCardProps | null>(null);
  const { isModal, setIsModal } = useContext(ModalContext);

  const [isApplyCanceled, setIsApplyCanceled] = useState<boolean>(false);
  const [isFavoriteCanceled, setIsFavoriteCanceled] = useState<boolean>(false);
  const [isCoverLetter, setIsCoverLetter] = useState<boolean>(false);
  const [cenceledMessage, setCenceledMessage] = useState<string>('');

  const clientRef = useRef<any>(null);
  const [isTokenValid, setIsTokenValid] = useLocalStorage('isTokenValid', true);

  const [newMessages, setNewMessages] = useState<MessagesTypes[]>([]);

  // const newMessages = messages.filter((m) => m.read === false);

  // needs in future
  // const sendMessage = (name: string, message: string) => {
  //   if (clientRef.current) {
  //     clientRef.current.sendMessage('/app/user-all', JSON.stringify({
  //       name,
  //       message,
  //     }));
  //   }
  // };

  const handleCardClick = useCallback((project: ProjectCardProps) => {
    setIsModal(true);
    setCurrentProject(project);
  }, []);

  const onCanceledApply = () => {
    setIsModal(true);
    setIsApplyCanceled(true);

    if (user && user.id) {
      setCenceledMessage(
        'You cannot apply to the project because you don`t have the required specialization.',
      );
    } else {
      setCenceledMessage('You need to sign in before applying to the project.');
    }
  };

  const onCanceledClose = useCallback(() => {
    setCenceledMessage('');
    setIsApplyCanceled(false);
  }, []);

  const onCanceledFavorite = () => {
    setIsModal(true);
    setIsFavoriteCanceled(true);
    setCenceledMessage(
      "Sorry, the 'Add to Favorites' feature is only available to registered users. Please sign in.",
    );
  };

  const selectEditProject = useCallback((event: React.MouseEvent, projectId: number) => {
    event.stopPropagation();
    navigation(`edit/${projectId}`);
  }, []);

  const applyProject = useCallback((
    event: React.MouseEvent<HTMLButtonElement>,
    project: ProjectCardProps,
  ) => {
    event.stopPropagation();
    event.preventDefault();
    setOnApplyProject(project);

    if (user && user.id) {
      const itPositionHas = project.teamResponseDto.requiredSpecialities.includes(user.speciality);

      if (itPositionHas) {
        setIsCoverLetter(true);
        setIsModal(true);
      } else {
        onCanceledApply();
      }
    } else {
      onCanceledApply();
    }
  }, [user, onApplyProject]);

  const onProjectModalClose = useCallback(() => {
    setIsModal(false);
    setCurrentProject(null);
  }, []);

  const removeHandler = useCallback((
    event: React.MouseEvent<HTMLButtonElement>,
    project: ProjectCardProps,
  ) => {
    event.stopPropagation();
    event.preventDefault();

    setToRemoveProject(project);
    setIsModal(true);
    setIsRemove(true);
  }, []);

  useEffect(() => {
    setIsModal(false);
  }, [location.pathname]);

  useEffect(() => {
    setNewMessages([...messages].filter((m) => m.read === false));
  }, [messages, notifications]);

  return (
    <div className="starter">
      {isModal && currentProject && (
        <Modal>
          <ProjectModal
            project={currentProject}
            onApply={applyProject}
            onFavorite={onCanceledFavorite}
            onProjectModalClose={onProjectModalClose}
            setEditProject={selectEditProject}
            removeHandler={removeHandler}
          />
        </Modal>
      )}

      {isModal && isRemove && toRemoveProject && (
        <Modal>
          <RemoveModal
            project={toRemoveProject}
            onCancel={() => {
              setToRemoveProject(null);
              setIsModal(false);
              setIsRemove(false);
            }}
          />
        </Modal>
      )}

      {!!notifications.length && (
        <ul>
          {notifications.map((notification) => (
            <Notification key={notification.id} notification={notification} />
          ))}
        </ul>
      )}

      {isModal && isCoverLetter && (
        <Modal>
          <LetterModal onClose={setIsCoverLetter} project={onApplyProject!} />
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
            message="Your token has expired, please sign in."
            onClose={() => setIsTokenValid(true)}
          />
        </Modal>
      )}
      <header>
        <Header
          isSideBar={isSideBar}
          setIsSideBar={setIsSideBar}
          newMessages={newMessages}
          filter={filter}
        />
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
                removeHandler={removeHandler}
                filter={filter}
                setFilter={setFilter}
              />
            }
          />
          <Route path="createProject" element={<ProjectPage />} />
          <Route path="profile">
            <Route
              index
              element={
                <ProfilePage
                  onCardClick={handleCardClick}
                />
              }
            />

            <Route
              path=":userId"
              element={
                <ProfilePage
                  onCardClick={handleCardClick}
                />
              }
            />
          </Route>

          <Route path="edit">
            <Route path=":editId" element={<EditPage />} />
          </Route>

          <Route path="signIn" element={<SignInPage />} />
          <Route path="recovery" element={<PasswordRecovery />} />
          <Route path="recoveryComplete" element={<RecoveryComplete />} />
          <Route path="profileCreate" element={<CreateProfile />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="messages" element={<Messages newMessages={newMessages} />} />
          <Route path="requests">
            <Route index element={<RequestsPage cardClick={handleCardClick} />} />
            <Route path=":requestId" element={<RequestsPage cardClick={handleCardClick} />} />

          </Route>

          <Route
            path="saved"
            element={
              <SavedPage
                onCardClick={handleCardClick}
                setEditProject={selectEditProject}
                onApply={applyProject}
                onFavorite={onCanceledFavorite}
                applyProject={applyProject}
                removeHandler={removeHandler}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <SockJsClient
          url={`${BASE_URL}/websocket-chat/`}
          topics={['/topic/user', `/user/${user?.email}/queue/notification`]}
          onConnect={() => {
            /* eslint-disable-next-line */
            console.log('connected');
          }}
          onDisconnect={() => {
            /* eslint-disable-next-line */
            console.log('Disconnected');
          }}
          onMessage={(msg: any) => {
            dispatch(notificationsActions.add(msg));
            dispatch(messagesAction.add(msg));
          }}
          ref={(client: any) => {
            clientRef.current = client;
          }}
        />
      </main>
    </div>
  );
};
