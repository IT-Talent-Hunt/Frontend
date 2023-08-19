import { useState } from 'react';
import { ProjectCardProps } from '../../Types/ProjectCardProps';
import { textValidation } from '../../helpers/validation';
import { CompleteButton } from '../Buttons/CompleteButton/CompleteButton';
import { ContactItem } from '../ContactsList/ContactItem/ContactItem';
import { CreateComplete } from '../CreateComplete/CreateComplete';
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

type Props = {
  project: ProjectCardProps,
};

export const EditProject: React.FC<Props> = ({ project }) => {
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
  const [isUpLoad, setIsUpLoad] = useState(false);

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
    // const editedProject = {
    //   ...project,
    //   name,
    //   description,
    //   socialLink: currentContact,
    // };

    dispatch(projectsActions.edit(project.id));
    setIsUpLoad(true);
  };

  return (
    <ProjectContainer>
      <>
        {isUpLoad && typeof error === 'boolean' && !loading ? (
          <CreateComplete projectName={name} />
        ) : (
          <form method="GET" onSubmit={(event) => event.preventDefault()}>
            <h1 className="createProject__title-main">
              Create your own project with a team!
            </h1>

            {isUpLoad && typeof error === 'string' && (
              <ShineMessage>
                <Error message={error} />
              </ShineMessage>
            )}

            <h4 className="createProject__title">
              Name and description
            </h4>

            <div className="createProject__field">
              <InputField
                input={nameFied}
                onBlur={() => textValidation(name, 'name', setIsNameDirty, setNameMessage, setIsNameSuccess, setName)}
                setValue={setName}
                setIsValueDirty={setIsNameDirty}
              />

              <div>
                <h6 className="createProject__title-sub">Project description</h6>

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

            <div className="createProject__field">
              <h4 className="createProject__title">
                Project members
              </h4>

              {/* <div className="createProject__positions">
                <h6 className="createProject__title-sub">Positions</h6>
                <ProjectPositions
                  selectedPositions={selectedPositions}
                  setSelectedPositions={setSelectedPositions}
                />
              </div> */}

            </div>

            <div className="createProject__field">
              <h4 className="createProject__title">
                Communication
              </h4>

              <div>
                <h6 className="createProject__title-sub">Link for communication</h6>

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
              isDisabled={false}
            />
          </form>
        )}
      </>
    </ProjectContainer>
  );
};
