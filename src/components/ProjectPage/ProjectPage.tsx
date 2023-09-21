import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { InputField } from '../InputField/InputField';
import { textValidation } from '../../helpers/validation';
import { ProfileInputField } from '../ProfileInputField/ProfileInputField';
import { ProjectPositions } from './ProjectPositions/ProjectPositions';
import { ContactItem } from '../ContactsList/ContactItem/ContactItem';
import { Contact } from '../../Types/Contact';
import { CompleteButton } from '../Buttons/CompleteButton/CompleteButton';
import { existContacts } from '../../helpers/Variables';
// import { postData } from '../../helpers/helpers';
import './ProjectPage.scss';
import { User } from '../../Types/User';
import { Select } from '../../Types/InputField';
import { ShineMessage } from '../ShineMessage/ShineMessage';
import { Error } from '../Error/Error';
// import { Container } from '../Container/Container';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import * as projectsActions from '../../redux/features/projects/projects';
import { CreateComplete } from '../CreateComplete/CreateComplete';

export const ProjectPage = () => {
  const [name, setName] = useState('');
  const [isNameDirty, setIsNameDirty] = useState(false);
  const [nameMessage, setNameMessage] = useState('');
  const [isNameSuccess, setIsNameSuccess] = useState(false);
  const [user] = useLocalStorage<User | null>('user', null);

  const [selectedPositions, setSelectedPositions] = useState<Select[]>([]);
  const preparetedPositions = selectedPositions.map((position) => position.name);

  const [description, setDescription] = useState('');
  const [contacts, setContacts] = useState<Contact[]>(existContacts);
  const [currentContact, setCurrentContact] = useState<Contact>(contacts[1]);

  // const [isLoader, setIsLoader] = useState(false);
  // const [isError, setIsError] = useState(false);
  const [isUpLoad, setIsUpLoad] = useState(false);

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.projects);

  const restList = [...contacts]
    .filter((contact) => contact.platform !== currentContact.platform);

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

  // const loadNewProject = async () => {
  //   try {
  //     setIsLoader(true);

  //     const newProject = {
  //       name,
  //       ownerId: user.id,
  //       description,
  //       teamRequestDto: {
  //         userIds: [user.id],
  //         requiredSpecialities: preparetedPositions,
  //       },
  //       socialLink: currentContact,
  //       status: 'RECRUITMENT',
  //     };

  //     await postData('projects', newProject);
  //     setIsSuccess(true);
  //   } catch (error) {
  //     setIsError('f');

  //     setTimeout(() => {
  //       setIsError('');
  //     }, 4000);
  //   } finally {
  //     setTimeout(() => {
  //       setIsLoader(false);
  //     }, 4000);
  //   }
  // };

  const loadNewProject = async () => {
    const newProject = {
      name,
      ownerId: user?.id,
      description,
      teamRequestDto: { //
        userIds: [user?.id],
        requiredSpecialities: preparetedPositions,
      },
      socialLink: currentContact,
      status: 'Recruitment',
    };

    await dispatch(projectsActions.push(newProject));
    setIsUpLoad(true);
  };

  const isValid = name.length > 0
  && description.length > 0
  && selectedPositions.length > 0
  && currentContact.url.length > 0;

  return (
    <>
      {isUpLoad && typeof error === 'boolean' && !loading ? (
        <CreateComplete projectName={name} />
      ) : (
        <section className="project">
          <form method="GET" onSubmit={(event) => event.preventDefault()} className="project__container">
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
                Project members
              </h4>

              <div className="project__positions">
                <h6 className="project__title-sub">Positions</h6>
                <ProjectPositions
                  selectedPositions={selectedPositions}
                  setSelectedPositions={setSelectedPositions}
                />
              </div>

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

            <div className="project__button">
              <CompleteButton
                title="Create"
                onClick={loadNewProject}
                isLoader={loading}
                isDisabled={isValid}
              />
            </div>
          </form>
        </section>
      )}
    </>
  );
};
