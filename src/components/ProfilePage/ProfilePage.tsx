/* eslint-disable quote-props */
/* eslint-disable */
import { useState, useContext, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { BackTo } from '../BackTo/BackTo';
import { IconButton } from '../IconButton/IconButton';
import { ProfileTextField } from '../ProfileTextField/ProfileTextField';
import { ProfileProject } from '../ProfileProject/ProfileProject';
import { Modal } from '../Modal/Modal';
import { ProjectModal } from '../../Modals/ProjectModal/ProjectModal';
import { ModalContext } from '../../Providers/ModalProvider';
import { ProjectCardProps } from '../../Types/ProjectCardProps';
import { ProfileInputField } from '../ProfileInputField/ProfileInputField';
import { CompleteButton } from '../Buttons/CompleteButton/CompleteButton';
import pen from '../../svg/edit-pen--icon.svg';
import profile from '../../svg/profile.svg';
import './ProfilePage.scss';
import { CompleteReverseButton } from '../Buttons/CompleteReverseButton/CompleteReverseButton';
import { ContactsList } from '../ContactsList/ContactsList';
import { putData, getData } from '../../helpers/helpers';
import { LoaderBig } from '../Loader/LoaderBig';
import { Error } from '../Error/Error';
import { Success } from '../Success/Success';
import { Empty } from '../Empty/Empty';
import { ShineMessage } from '../ShineMessage/ShineMessage';
import { User } from '../../Types/User';
import { NavLink } from 'react-router-dom';
// import { patchData } from '../../helpers/helpers';

type Props = {
  user: User
  onApply: (event: React.MouseEvent<HTMLButtonElement>, project: ProjectCardProps) => void,
  onFavorite: (value: string) => void,
  onProjectModalClose: () => void,
}

export const ProfilePage: React.FC<Props> = ({
  user,
  onApply,
  onFavorite,
  onProjectModalClose,
}) => {
  const { isModal, setIsModal } = useContext(ModalContext);
  const [projectModal, setProjectModal] = useState<ProjectCardProps | null>(null);
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('user', null);

  const [isEdit, setIsEdit] = useState(false);

  const [userSkills, setUserSkills] = useState<string>(user.skills) || '';
  const [userAbout, setUserAbout] = useState(user.description) || '';
  const [userContacts, setUserContacts] = useState([...user.socialLinks]);

  const [userOwnedProjects, setUserOwneProjects] = useState<ProjectCardProps[]>([]);
  const [userArhivedProjects, setUserArhivedProjects] = useState<ProjectCardProps[]>([]);
  const [userOnGoingProjects, setUserOnGoingProjects] = useState<ProjectCardProps[]>([]);

  const [isUpdateLoad, setIsUpdateLoad] = useState(false);
  const [isUpdateError, setIsUpdateError] = useState('');

  const [isProjectsLoad, setIsProjectsLoad] = useState(false);
  const [isProjectsError, setIsProjectsError] = useState('');

  const [isSuccessUpdate, setIsSuccesUpdate] = useState('');

  const onProjectHandler = (project: ProjectCardProps) => {
    setProjectModal(project);
    setIsModal(true);
  };
  
  const userDataUpdate = async(userId: number, event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsUpdateLoad(true);

      const chagedUserKeys = {
        ...user,
        description: userAbout,
        skills: userSkills,
        socialLinks: userContacts,
      };

      const updatedUser: any = await putData(`users/${userId}`, chagedUserKeys)

      setCurrentUser(updatedUser);
      setIsSuccesUpdate("The requested updates to the user's information have been applied without any issues. The user's data has been successfully modified in the system.\nThank you for using our services!");

      setTimeout(() => {
        setIsSuccesUpdate('');
        setIsUpdateLoad(false);
      }, 4000)
    } catch (error) {
      setIsUpdateError('An error occurred while attempting to update user data. The requested resource was not found on the server. Please ensure that you are using a correct user identifier and try again.If the error persists, please contact the system administrator for further assistance. This error can occur due to an incorrect URL or the user being deleted from the database. Please double-check your data and retry the operation.');

      setTimeout(() => {
        setIsUpdateError('');
        setIsUpdateLoad(false);
      }, 4000)
    }
  };

  const loadUserProjectsData = async() => {
    try {
      setIsProjectsLoad(true);
      const ownedProjectData: ProjectCardProps[] | any  = await getData(`projects/by-user/${user.id}`);
      setUserOwneProjects(ownedProjectData);

      const arhivedProjects: ProjectCardProps[] | any = await getData(
        `projects/by-user/${user.id}/status?projectStatus=FINISHED`
      );
      console.log(arhivedProjects);
      setUserArhivedProjects(arhivedProjects);

      const onGoingProjects: ProjectCardProps[] | any = await getData(
        `projects/by-user/${user.id}/status?projectStatus=IN_PROGRESS`
      );
      setUserOnGoingProjects(onGoingProjects);

    } catch (error) {
      setIsProjectsError('An error occurred while attempting to load data from the server. An internal server error may be caused by technical glitches or issues within the system. Our experts have already been notified of this problem and are actively working to resolve it.We apologize for any inconvenience caused. Please try to load the data again later.If the issue persists, please contact our support team for further assistance.Thank you for your understanding.');
    } finally {
      setIsProjectsLoad(false);
    }
  }

  useEffect(() => {
    loadUserProjectsData();
  }, []);

  return (
    <section className="profile">
      <div className="profile__container">
        <div className="profile__top">
          {isEdit ? (
            <BackTo onClick={setIsEdit} />
          ) : (
            <BackTo />
          )}

          {currentUser?.id === user.id && (
            <IconButton svg={pen} onClick={() => setIsEdit((current) => !current)} />
          )}
        </div>
        {isSuccessUpdate && (
          <ShineMessage>
            <Success message={isSuccessUpdate} />
          </ShineMessage>
        )}

        {isUpdateError && (
          <ShineMessage>
            <Error message={isUpdateError} />
          </ShineMessage>
        )}

        <div className="profile__data">
          <div className="profile__profile">
            <div>
              <IconButton svg={profile} />
            </div>
          </div>

          <div className="profile__wrapper">
            <div>
              <p className="profile__name">
                Hi,
                <strong>{` ${user.firstName} ${user.lastName}!`}</strong>
              </p>
              <strong className="profile__position">{user.speciality}</strong>
            </div>

            {currentUser?.id === user.id && (
              <NavLink
                to='/profileCreate'
                className="profile__wrapper-edit"
              >
                <IconButton svg={pen} />
              </NavLink>
            )}

          </div>
        </div>

        <form action="post" onSubmit={(event) => userDataUpdate(user.id!, event)}>
          <div
            className={!isEdit ? `profile__field`: `profile__field-reverse`}
          >
            <h5 className="profile__field_title">Skills</h5>
            {isEdit ? (
              <ProfileInputField value={userSkills} setValue={setUserSkills} name="skills" />
            ) : (
              <ProfileTextField text={userSkills} name="skills" />
            )}
          </div>

          <div
            className={!isEdit ? `profile__field`: `profile__field--reverse`}
          >
            <h5 className="profile__field_title">Contacts</h5>

            <ContactsList
              list={userContacts}
              isEdit={isEdit}
              setUserContacts={setUserContacts}
            />
          </div>

          <div className="profile__field profile__field--reverse">
            <h5 className="profile__field-title">About</h5>

            {isEdit ? (
              <ProfileInputField value={userAbout} setValue={setUserAbout} name="about" />
            ) : (
              <ProfileTextField text={userAbout} name="about" />
            )}
          </div>

          {isEdit ? (
            <div className="profile__buttons">
              <CompleteButton title="Save" isLoader={isUpdateLoad} />
              <CompleteReverseButton title="Cancel" />
            </div>
          ) : (
            <>
              {isProjectsLoad ? (
                <div className="profile__bottomField--loader">
                  <LoaderBig/>
                </div>
              ) : (
                <>
                  {isProjectsError ? (
                    <div className="profile__bottomField--error">
                      <Error message={isProjectsError} />
                    </div>
                  ) : (
                    <div className="profile__projects">
                      <div className="profile__field profile__field--reverse">
                        <h5 className="profile__project_title">Your projects</h5>
  
                        {userOwnedProjects.length ? (
                          <ul className="profile__field_list">
                            {userOwnedProjects.map((project: any) => (
                              <ProfileProject
                                key={project.id}
                                project={project}
                                onClick={onProjectHandler}
                              />
                            ))}
                          </ul>
                        ) : (
                          <Empty />
                        )}
                      </div>
  
                      <div className="profile__field profile__field--reverse">
                        <h5 className="profile__project_title">Projects history</h5>
  
                        {userArhivedProjects.length ? (
                          <ul className="profile__field_list">
                            {userArhivedProjects.map((project: any) => (
                              <ProfileProject
                                key={project.id}
                                project={project}
                                onClick={onProjectHandler}
                              />
                            ))}
                          </ul>
                        ) : (
                          <Empty />
                        )}
                      </div>
  
                      <div className="profile__field profile__field--reverse">
                        <h5 className="profile__project_title">Ongoing projects</h5>

                        {userOnGoingProjects.length ? (
                          <ul className="profile__field_list">
                            {userOnGoingProjects.map((project: any) => (
                              <ProfileProject
                                key={project.id}
                                project={project}
                                onClick={onProjectHandler}
                              />
                            ))}
                          </ul>
                        ) : (
                          <Empty />
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </form>
      </div>

      {isModal && projectModal && (
        <Modal>
          <ProjectModal
            project={projectModal}
            onApply={onApply}
            onFavorite={onFavorite}
            onProjectModalClose={onProjectModalClose}
          />
        </Modal>
      )}
    </section>
  );
};
