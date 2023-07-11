import React, { useState } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './InputField.module.scss';

import eyeOpen from '../../svg/eye-open.svg';
import eyeLock from '../../svg/eye-locked.svg';

// Please, don`t forget to use TypeScript ;> 'input: any'

type Props = {
  input : any,
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void,
  setValue: (value: string) => void,
  setIsValueDirty: (value: boolean) => void,
  isSignedUp?: boolean
};

export const InputField: React.FC<Props> = ({
  input,
  onBlur,
  setValue,
  setIsValueDirty,
  isSignedUp = false,
}) => {
  const {
    type,
    name,
    value,
    message,
    isDirty,
    text,
  } = input;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleInput = (
    setState: (valueData: string) => void,
    setStateDirty: (valueDirty: boolean) => void,
    evt: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setState(evt.target.value);
    setStateDirty(false);
  };

  return (
    <label
      htmlFor={type}
      className={styles.label}
      id={type}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <div style={{ width: '100%', textAlign: 'left' }}>
        <p>{text}</p>
        <input
          type={!isPasswordVisible && type === 'password' ? 'password' : 'text'}
          id={type}
          name={name}
          // required
          minLength={type === 'password' ? 5 : 0}
          value={value}
          onChange={(evt) => handleInput(setValue, setIsValueDirty, evt)}
          onBlur={(event) => onBlur(event)}
          className={classNames(styles.input, { [styles.input__error]: isDirty })}
          placeholder={
            name === 'confirmPassword' ? text : `Enter ${name}`
          }
        />

        {name === 'password' && !isSignedUp && (
          <NavLink to="/recovery" className={styles.link_recovery}>
            <span>Forgot password?</span>
          </NavLink>
        )}

      </div>

      {isDirty && (
        <span className={styles.input__error_message}>
          <i className="bx bx-error" />
          <span>{message}</span>
        </span>
      )}

      {type === 'password' && (
        <button
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <div
            className={styles.img__eye}
            style={{ backgroundImage: `url('${isPasswordVisible ? eyeOpen : eyeLock}')` }}
          />
        </button>
      )}
    </label>
  );
};
