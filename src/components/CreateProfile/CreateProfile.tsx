import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { Container } from '../Container/Container';
import { InputField } from '../InputField/InputField';
import './CreateProfile.scss';
import { InputSelect } from '../InputSelect/InputSelect';
import { CompleteButton } from '../Buttons/CompleteButton/CompleteButton';
import { textValidation, selectValidation } from '../../helpers/validation';
import { User } from '../../Types/User';
import { patchData } from '../../helpers/helpers';

export const CreateProfile = () => {
  const [name, setName] = useState('');
  const [isNameDirty, setIsNameDirty] = useState(false);
  const [nameMessage, setNameMessage] = useState('');
  const [isNameSuccess, setIsNameSuccess] = useState(false);

  const [surName, setSurName] = useState('');
  const [isSurNameDirty, setIsSurNameDirty] = useState(false);
  const [surNameMessage, setSurNameMessage] = useState('');
  const [isSurNameSuccess, setIsSurNameSuccess] = useState(false);

  const [position, setPosition] = useState('');
  const [isPositionDirty, setIsPositionDirty] = useState(false);
  const [positionMessage, setPositionMessage] = useState('');
  const [isPositionSuccess, setIsPositionSuccess] = useState(false);

  const [userProfile, setUserProfile] = useState({});
  const [user, setUser] = useLocalStorage<User | any>('user', {});
  const navigation = useNavigate();

  const isValid = isPositionDirty === false
  && isNameDirty === false
  && isSurNameDirty === false
  && name.length > 0
  && surName.length > 0
  && position.length > 0;

  const nameFied = {
    id: 0,
    type: 'text',
    name: 'name',
    value: name,
    message: nameMessage,
    isDirty: isNameDirty,
    isSuccess: isNameSuccess,
    text: 'Name',
  };

  const surNameField = {
    id: 1,
    type: 'text',
    name: 'surname',
    value: surName,
    message: surNameMessage,
    isDirty: isSurNameDirty,
    isSuccess: isSurNameSuccess,
    text: 'Surname',
  };

  const selectPositionField = {
    id: 2,
    type: 'text',
    name: 'position',
    value: position,
    message: positionMessage,
    isDirty: isPositionDirty,
    isSuccess: isPositionSuccess,
    text: 'Position',
    selections: [
      { id: 0, name: 'UI/UX designer' },
      { id: 1, name: 'Front-end developer' },
      { id: 2, name: 'Back-end developer' },
      { id: 3, name: 'DevOps' },
      { id: 4, name: 'Project manager' },
      { id: 5, name: 'QA Engineer' },
      { id: 6, name: 'Mentor' },
    ],
  };

  function upLoadUserData(userId: number) {
    const chagedUserKeys = {
      firstName: name,
      lastName: surName,
      specialities: [{ specialityName: 'QA' }],
    };

    return patchData(`users/${userId}`, chagedUserKeys)
    /* eslint-disable-next-line */
    .then((res) => setUser(res))
  }

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    textValidation(name, 'name', setIsNameDirty, setNameMessage, setIsNameSuccess);
    textValidation(surName, 'surname', setIsSurNameDirty, setSurNameMessage, setIsSurNameSuccess);
    selectValidation(position, 'position', setIsPositionDirty, setPositionMessage, setIsPositionSuccess);

    upLoadUserData(user.id);

    if (isValid) {
      navigation('/signIn');
    }

    setUserProfile({
      name,
      surName,
      position,
    });

    /* eslint-disable-next-line */
    console.log(userProfile);
  };

  return (
    <section className="profileCreate">
      <Container>

        <form method="get" onSubmit={onSubmitHandler} className="profileCreate__shell">
          <h1>Profile</h1>
          <InputField
            input={nameFied}
            onBlur={() => textValidation(name, 'name', setIsNameDirty, setNameMessage, setIsNameSuccess, setName)}
            setValue={setName}
            setIsValueDirty={setIsNameDirty}
          />

          <InputField
            input={surNameField}
            onBlur={() => textValidation(surName, 'surname', setIsSurNameDirty, setSurNameMessage, setIsSurNameSuccess, setSurName)}
            setValue={setSurName}
            setIsValueDirty={setIsSurNameDirty}
          />

          <InputSelect
            input={selectPositionField}
            onBlur={() => selectValidation(position, 'position', setIsPositionDirty, setPositionMessage, setIsPositionSuccess)}
            setValue={setPosition}
            setIsValueDirty={setIsPositionDirty}
          />

          <CompleteButton title="Sign up" isDisabled={isValid} />
        </form>
      </Container>
    </section>
  );
};
