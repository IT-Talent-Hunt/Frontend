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
import { socialities } from '../../helpers/Variables';

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

  const [user, setUser] = useLocalStorage<User | any>('user', {});
  const navigation = useNavigate();

  // const visiblePosition = socialities
  //   .find((sociality) => sociality.name === user.specialities[0].specialityName);

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
    selections: socialities,
  };

  function upLoadUserData(userId: number) {
    const chagedUserKeys = {
      firstName: name,
      lastName: surName,
      speciality: position,
    };

    return patchData(`users/${userId}`, chagedUserKeys)
    /* eslint-disable-next-line */
    .then((returnedUser) => returnedUser)
  }

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    textValidation(name, 'name', setIsNameDirty, setNameMessage, setIsNameSuccess);
    textValidation(surName, 'surname', setIsSurNameDirty, setSurNameMessage, setIsSurNameSuccess);
    selectValidation(position, 'position', setIsPositionDirty, setPositionMessage, setIsPositionSuccess);

    const updatedUser = await upLoadUserData(user.id);

    setUser(updatedUser);

    if (isValid) {
      navigation('/signIn');
    }
  };

  return (
    <section className="profileCreate">
      <Container>

        <form method="GET" onSubmit={onSubmitHandler} className="profileCreate__shell">
          <h1 className="profileCreate__title">Profile</h1>
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