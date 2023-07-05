import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../Container/Container';
import { InputField } from '../InputField/InputField';
import './CreateProfile.scss';
import { InputSelect } from '../InputSelect/InputSelect';
import { CompleteButton } from '../Buttons/CompleteButton/CompleteButton';
import { nameValidation } from '../../helpers/validation';

export const CreateProfile = () => {
  const [name, setName] = useState('');
  const [isNameDirty, setIsNameDirty] = useState(false);
  const [nameMessage, setNameMessage] = useState('');

  const [surName, setSurName] = useState('');
  const [isSurNameDirty, setIsSurNameDirty] = useState(false);
  const [surNameMessage, setSurNameMessage] = useState('');

  const [position, setPosition] = useState('');
  const [isPositionDirty, setIsPositionDirty] = useState(false);
  const [positionMessage, setPositionMessage] = useState('');

  const [userProfile, setUserProfile] = useState({});
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
    text: 'Name',
  };

  const surNameField = {
    id: 1,
    type: 'text',
    name: 'surname',
    value: surName,
    message: surNameMessage,
    isDirty: isSurNameDirty,
    text: 'Surname',
  };

  const selectPositionField = {
    id: 2,
    type: 'text',
    name: 'position',
    value: position,
    message: positionMessage,
    isDirty: isPositionDirty,
    text: 'Position',
    setlections: [
      { id: 0, name: 'UI/UX designer' },
      { id: 1, name: 'Front-end developer' },
      { id: 2, name: 'Back-end developer' },
      { id: 3, name: 'DevOps' },
      { id: 4, name: 'Project manager' },
      { id: 5, name: 'QA Engineer' },
      { id: 6, name: 'Mentor' },
    ],
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    nameValidation(name, 'name', setIsNameDirty, setNameMessage);
    nameValidation(surName, 'surname', setIsSurNameDirty, setSurNameMessage);
    nameValidation(position, 'position', setIsPositionDirty, setPositionMessage);

    if (isValid) {
      navigation('/signIn');
    }

    event.preventDefault();
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
            onBlur={() => nameValidation(name, 'name', setIsNameDirty, setNameMessage)}
            setValue={setName}
            setIsValueDirty={setIsNameDirty}
          />

          <InputField
            input={surNameField}
            onBlur={() => nameValidation(surName, 'surname', setIsSurNameDirty, setSurNameMessage)}
            setValue={setSurName}
            setIsValueDirty={setIsSurNameDirty}
          />

          <InputSelect
            input={selectPositionField}
            onBlur={() => nameValidation(position, 'position', setIsPositionDirty, setPositionMessage)}
            setValue={setPosition}
            setIsValueDirty={setIsPositionDirty}
          />

          <CompleteButton title="Sign up" isDisabled={isValid} />
        </form>
      </Container>
    </section>
  );
};
