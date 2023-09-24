/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { Container } from '../Container/Container';
import { InputField } from '../InputField/InputField';
import './CreateProfile.scss';
import { InputSelect } from '../InputSelect/InputSelect';
import { CompleteButton } from '../Buttons/CompleteButton/CompleteButton';
import { textValidation } from '../../helpers/validation';
import { User } from '../../Types/User';
import { patchData } from '../../helpers/helpers';
import { socialities } from '../../helpers/variables';
import error from '../../svg/error-icon.svg';
import { Icon } from '../Icon/Icon';

export const CreateProfile = () => {
  const navigation = useNavigate();

  const [user, setUser] = useLocalStorage<User | null>('user', null);

  const [name, setName] = useState(user?.firstName ? user.firstName : '');
  const [isNameDirty, setIsNameDirty] = useState(false);
  const [nameMessage, setNameMessage] = useState('');
  const [isNameSuccess, setIsNameSuccess] = useState(false);

  const [surName, setSurName] = useState(user?.lastName ? user.lastName : '');
  const [isSurNameDirty, setIsSurNameDirty] = useState(false);
  const [surNameMessage, setSurNameMessage] = useState('');
  const [isSurNameSuccess, setIsSurNameSuccess] = useState(false);

  const [position, setPosition] = useState(user?.speciality ? user.speciality : '');

  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const isValid = isNameDirty === false
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
    value: position,
    text: 'Position',
    selections: socialities,
  };

  async function upLoadUserData(userId: number) {
    setIsLoader(true);

    try {
      const chagedUserKeys = {
        firstName: name,
        lastName: surName,
        speciality: position,
      };

      await patchData(`users/${userId}`, chagedUserKeys)
        .then((res: any) => setUser(res))

      if (isValid) {
        navigation('/profile');
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoader(false);

      setTimeout(() => {
        setIsError(false);
      }, 4000);
    }
  }

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    textValidation(name, 'name', setIsNameDirty,
      setNameMessage, setIsNameSuccess,
    );

    textValidation(surName, 'surname', setIsSurNameDirty,
      setSurNameMessage, setIsSurNameSuccess,
    );

    upLoadUserData(user?.id!);
  };

  return (
    <section className="profileCreate">
      <Container>
        <form method="POST" onSubmit={onSubmitHandler} className="profileCreate__shell">
          <h1 className="profileCreate__title">Profile</h1>

          {isError && (
            <div className="profileCreate__error">
              <p className="profileCreate__error_message">An error was occured</p>

              <Icon icon={error} />
            </div>
          )}

          <InputField
            input={nameFied}
            onBlur={() => textValidation(
              name, 'name', setIsNameDirty,
              setNameMessage, setIsNameSuccess, setName
            )}
            setValue={setName}
            setIsValueDirty={setIsNameDirty}
          />

          <InputField
            input={surNameField}
            onBlur={() => textValidation(
              surName, 'surname',
              setIsSurNameDirty, setSurNameMessage,
              setIsSurNameSuccess, setSurName
            )}
            setValue={setSurName}
            setIsValueDirty={setIsSurNameDirty}
          />

          <InputSelect
            input={selectPositionField}
            setValue={setPosition}
          />

          <CompleteButton
            title="Sign up"
            isDisabled={isValid}
            isLoader={isLoader}
          />
        </form>
      </Container>
    </section>
  );
};
