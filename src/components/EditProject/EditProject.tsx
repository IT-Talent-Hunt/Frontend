import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { ProjectCardProps } from '../../Types/ProjectCardProps';
import { textValidation } from '../../helpers/validation';
import { CompleteButton } from '../Buttons/CompleteButton/CompleteButton';
import { ContactItem } from '../ContactsList/ContactItem/ContactItem';
import { ProfileInputField } from '../ProfileInputField/ProfileInputField';
import { ProjectContainer } from '../ProjectContainer/ProjectContainer';
import { ShineMessage } from '../ShineMessage/ShineMessage';
// import { useLocalStorage } from 'usehooks-ts';
// import { User } from '../../Types/User';
import { Contact } from '../../Types/Contact';
import { existContacts } from '../../helpers/Variables';
import { InputField } from '../InputField/InputField';
import { Error } from '../Error/Error';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { Select } from '../../Types/InputField';
import * as projectsActions from '../../redux/features/projects/projects';
import { MemberItem } from './MemberItem';
import { User } from '../../Types/User';
import { Success } from '../Success/Success';

type Props = {
  project: ProjectCardProps,
};

export const EditProject: React.FC<Props> = ({ project }) => {
  // const navigation = useNavigate();
  const [name, setName] = useState(project.name);
  const [isNameDirty, setIsNameDirty] = useState(false);
  const [nameMessage, setNameMessage] = useState('');
  const [isNameSuccess, setIsNameSuccess] = useState(false);
  // const [user] = useLocalStorage<User | any>('user', {});

  // const [selectedPositions, setSelectedPositions] = useState<Select[]>([]);
  // const preparetedPositions = selectedPositions.map((position) => position.name);

  const [description, setDescription] = useState(project.description);
  const [contacts, setContacts] = useState<Contact[]>(existContacts);
  const [currentContact, setCurrentContact] = useState<Contact>(project.socialLink);
  const [userMembers, setUserMemeers] = useState<User[]>(project.teamResponseDto.userResponseDtos);
  const [isUpLoad, setIsUpLoad] = useState(false);

  const membersIds = userMembers.map((member) => member.id);

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

  const restList = [...contacts]
    .filter((contact) => contact.platform !== currentContact.platform);

  const editProjetcData = () => {
    const editedProject = {
      ...project,
      name,
      description,
      socialLink: currentContact,
      teamRequestDto: {
        ...project.teamResponseDto,
        userIds: membersIds,
      },
    };

    dispatch(projectsActions.edit({ projectId: project.id, newData: editedProject }));
    setIsUpLoad(true);

    setTimeout(() => {
      setIsUpLoad(false);
      // navigation('/main');
    }, 4100);
  };

  /* eslint-disable-next-line */
  console.log(project);

  const onUserKick = (user: User) => {
    setUserMemeers((current) => [...current].filter((member: User) => member.id !== user.id));
  };

  return (
    <ProjectContainer>
      <>
        {isUpLoad && typeof error === 'boolean' && !loading && (
          <ShineMessage>
            <Success message="The requested updates to the user's information have been applied without any issues. The user's data has been successfully modified in the system.\nThank you for using our services!" />
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

          {/* {project.teamResponseDto.userResponseDtos.map((u) => (
            <p key={}>
              <span>{u.specialities}</span>
            </p>
          ))} */}

          <div className="project__field">
            <h4 className="project__title">
              Project members
            </h4>

            <ul className="project__members">
              {userMembers.map((user) => (
                <MemberItem key={user.id} user={user} onKick={onUserKick} />
              ))}
            </ul>
          </div>

          <div className="project__field">
            <h4 className="project__title">
              Communication
            </h4>

            <div>
              <h6 className="project__title-sub">Link for communication</h6>

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

          <CompleteButton
            title="Save"
            onClick={editProjetcData}
            isLoader={loading}
          />
        </form>
      </>
    </ProjectContainer>
  );
};
