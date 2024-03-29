import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocalStorage } from 'usehooks-ts';
import classNames from 'classnames';
import { ProjectCardProps } from '../../../Types/ProjectCardProps';
import { textValidation } from '../../../helpers/validation';
import { CompleteButton } from '../../../components/Buttons/CompleteButton/CompleteButton';
import { ContactItem } from '../../../components/ContactsList/ContactItem/ContactItem';
import { ProfileInputField } from '../../ProfilePage/ProfileInputField/ProfileInputField';
import { ShineMessage } from '../../../components/ShineMessage/ShineMessage';
import { Contact } from '../../../Types/Contact';
import { existContacts, socialities, projectStatuses } from '../../../helpers/variables';
import { InputField } from '../../../components/InputField/InputField';
import { Error } from '../../../components/Error/Error';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import * as projectsActions from '../../../redux/features/projects/projects';
import { MemberItem } from './MemberItem';
import { User } from '../../../Types/User';
import { Success } from '../../../components/Success/Success';
import { InputSelect } from '../../../components/InputSelect/InputSelect';
import { EditProjectButton } from './EditProjectButton/EditProjectButton';
import { EditReverseButton } from './EditReverseButton/EditReverseButton';
import { PositionItem } from './PositionItem/PositionItem';
import { ProjectCardStatus } from '../../../components/projectCard/ProjectCardStatus/ProjectCardStatus';

type Props = {
  project: ProjectCardProps,
};

export const EditProject: React.FC<Props> = ({ project }) => {
  const [name, setName] = useState<string>(project.name);
  const [isNameDirty, setIsNameDirty] = useState<boolean>(false);
  const [nameMessage, setNameMessage] = useState<string>('');
  const [isNameSuccess, setIsNameSuccess] = useState<boolean>(false);
  const [currentUser] = useLocalStorage<User | null>('user', null);

  const [description, setDescription] = useState<string>(project.description);
  const [contacts, setContacts] = useState<Contact[]>(existContacts);
  const [currentContact, setCurrentContact] = useState<Contact>(project.socialLink);
  const [userMembers, setUserMemeers] = useState<User[]>(project.teamResponseDto.userResponseDtos);
  const [projectPositions, setProjectPositions] = useState<string[]>(
    project.teamResponseDto.requiredSpecialities,
  );
  const [projectStatus, setProjectStatus] = useState<string>(project.status);

  const [isUpLoad, setIsUpLoad] = useState<boolean>(false);
  const [isAddPosition, setIsAddPosition] = useState<boolean>(false);
  const [isProjectStatuses, setIsProjectStatuses] = useState<boolean>(false);

  const [position, setPosition] = useState<string>('');

  const membersIds = userMembers.map((member) => member.id);
  const visibleMembers: User[] = userMembers.filter((member) => member.id !== currentUser?.id);
  const preparetedStatuses: string[] = projectStatuses.filter((status) => status !== projectStatus);

  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector(state => state.projects);

  const nameFied = {
    id: 0,
    type: 'text',
    name: 'name',
    value: name,
    message: nameMessage,
    isDirty: isNameDirty,
    isSuccess: isNameSuccess,
    text: 'Project name',
  };

  const restList = useMemo(() => [...contacts]
    .filter((contact) => contact.platform !== currentContact.platform), [currentContact]);

  const editProjetcData = () => {
    const editedProject = {
      ...project,
      id: project.id,
      name,
      description,
      socialLink: currentContact,
      status: projectStatus,
      teamRequestDto: {
        ...project.teamResponseDto,
        userIds: membersIds,
        requiredSpecialities: projectPositions,
      },
    };

    dispatch(projectsActions.edit({
      projectId: project.id,
      teamId: project.teamResponseDto.id,
      newData: editedProject,
    }));
    setIsUpLoad(true);

    setTimeout(() => {
      setIsUpLoad(false);
    }, 4100);
  };

  const onUserKick = useCallback((user: User) => {
    setUserMemeers((current) => [...current].filter((member: User) => member.id !== user.id));
    setProjectPositions((current) => [...current, user.speciality]);
  }, []);

  const onPositionAdd = useCallback(() => {
    setProjectPositions((current) => [...current, position]);
    setIsAddPosition(false);
  }, [position]);

  const onPositionCancel = () => {
    setPosition('');
    setIsAddPosition(false);
  };

  const onPositionRevome = useCallback((removePosition: string) => {
    setProjectPositions((current) => [...current].filter((pos) => pos !== removePosition));
  }, []);

  const onStatusChange = useCallback((newStatus: string) => {
    setProjectStatus(newStatus);
    setIsProjectStatuses(false);
  }, []);

  useEffect(() => {
    return () => {
      setIsUpLoad(false);
    };
  }, []);

  const selectPositionField = {
    id: 2,
    type: 'text',
    value: position,
    text: 'Position',
    selections: socialities,
  };

  return (
    <div className="editPage__wrapper">
      <>
        {isUpLoad && typeof error === 'boolean' && !loading && (
          <ShineMessage>
            <Success message="The requested updates to the user's information have been applied without any issues. The user's data has been successfully modified in the system. Thank you for using our services!" />
          </ShineMessage>
        )}
        <form method="GET" onSubmit={(event) => event.preventDefault()}>
          <h1 className="project__title-main">
            Create your own project with a team!
          </h1>

          {isUpLoad && typeof error === 'string' && (
            <ShineMessage>
              <Error message={error} />
            </ShineMessage>
          )}

          <h4 className="project__title">
            Name and description
          </h4>

          <div className="project__field">
            <InputField
              input={nameFied}
              onBlur={() => textValidation(name, 'name', setIsNameDirty, setNameMessage, setIsNameSuccess, setName)}
              setValue={setName}
              setIsValueDirty={setIsNameDirty}
            />

            <div>
              <h6 className="project__title-sub">Project description</h6>

              <ProfileInputField
                value={description}
                setValue={setDescription}
                name="description"
              />
            </div>
          </div>

          <div className="project__field">
            <h4 className="project__title">
              Project status
            </h4>

            <button
              type="button"
              onClick={() => setIsProjectStatuses((current) => !current)}
              className="project__status"
            >
              <ProjectCardStatus status={projectStatus} />
            </button>

            {isProjectStatuses && (
              <ul className="project__statuses">
                {preparetedStatuses.map((newStatus) => (
                  <button
                    key={newStatus}
                    type="button"
                    className={classNames(
                      'project__statuses_item',
                      { 'project__statuses_item-green': newStatus === 'In progress' },
                      { 'project__statuses_item-yellow': newStatus === 'Recruitment' },
                    )}
                    onClick={() => onStatusChange(newStatus)}
                  >
                    <ProjectCardStatus status={newStatus} />
                  </button>
                ))}
              </ul>
            )}
          </div>

          <div className="project__field">
            <h4 className="project__title">
              Project members
            </h4>

            <ul className="project__members">
              {visibleMembers.map((user) => (
                <MemberItem key={user.id} user={user} onKick={onUserKick} />
              ))}
            </ul>

            <ul className="project__positions">
              {projectPositions.map((requiredPosition) => (
                <PositionItem
                  key={requiredPosition}
                  position={requiredPosition}
                  onRemove={onPositionRevome}
                />
              ))}
            </ul>

            {!isAddPosition && (
              <button
                type="button"
                className="project__addPosition_button"
                onClick={() => setIsAddPosition(true)}
              >
                <span className="project__addPosition_button-title">
                  Add position
                </span>

                <span className="project__addPosition_button-plus">+</span>
              </button>
            )}

            {isAddPosition && (
              <div className="project__addPosition">
                <InputSelect
                  input={selectPositionField}
                  setValue={setPosition}
                />

                <div className="project__addPosition_buttons">
                  <EditProjectButton title="Add" isDisabled={!!position} onClick={onPositionAdd} />
                  <EditReverseButton title="Cancel" onClick={onPositionCancel} />
                </div>
              </div>
            )}
          </div>

          <div className="project__field">
            <h4 className="project__title">
              Communication
            </h4>

            <div>
              <h6 className="project__title-sub">
                Link for communication
              </h6>

              <ContactItem
                key={currentContact.platform}
                contact={currentContact}
                restList={restList}
                setContact={setCurrentContact}
                setContacts={setContacts}
                isEdit={!!true}
              />
            </div>
          </div>

          <div className="project__button">
            <CompleteButton
              title="Save"
              onClick={editProjetcData}
              isLoader={loading}
            />
          </div>
        </form>
      </>
    </div>
  );
};
