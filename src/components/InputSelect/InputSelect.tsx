import classNames from 'classnames';
import { useState } from 'react';
import styles from '../InputField/InputField.module.scss';
import { InputField, Select } from '../../Types/InputField';
import './InputSelect.scss';
import arrow from '../../svg/arrow-bottom.svg';

type Props = {
  input : InputField,
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void,
  setValue: (value: string) => void,
  setIsValueDirty: (value: boolean) => void,
  isSignedUp?: boolean
};

export const InputSelect: React.FC<Props> = ({
  input,
  onBlur,
  setValue,
  setIsValueDirty,
}) => {
  const [isSeleted, setIsSelected] = useState(false);
  const [hoveres, setHovered] = useState('Choose');

  const {
    type,
    name,
    value,
    message,
    isDirty,
    text,
    setlections,
  } = input;

  const onPositionSelect = (selectName: string) => {
    setValue(selectName);
    setIsValueDirty(false);
    setIsSelected(false);
  };

  const onSelectHover = (selectName: string) => {
    setHovered(selectName);
  };

  return (
    <>
      <label
        htmlFor={type}
        className={styles.label}
        id={type}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <div style={{ width: '100%' }}>
          <p>{text}</p>
          <button
            type="button"
            onClick={() => {
              setIsSelected(!isSeleted);
              setHovered('Choose');
            }}
            style={{ width: '100%', textAlign: 'left' }}
          >
            <input
              type={type}
              id={type}
              name={name}
              value={value}
              onBlur={onBlur}
              className={classNames(styles.input, { [styles.input__error]: isDirty })}
              placeholder={hoveres}
              disabled={!!true}
              style={{ color: '#000' }}
            />
          </button>
        </div>

        {isDirty && (
          <span className={styles.input__error_message}>
            <i className="bx bx-error" />
            <span>{message}</span>
          </span>
        )}

        <button
          type="button"
        >
          <div
            className={classNames('inputSelect__arrow', [{ 'inputSelect__arrow-move': isSeleted }])}
            style={{ backgroundImage: `url('${arrow}')` }}
          />
        </button>
      </label>

      {isSeleted && (
        <ul className="inputSelect__list">
          {setlections?.map((selectEl: Select) => (
            <button
              type="button"
              key={selectEl.id}
              onClick={() => onPositionSelect(selectEl.name)}
              className="inputSelect__item"
              onMouseOver={() => onSelectHover(selectEl.name)}
              onFocus={() => {}}
            >
              <li>
                {selectEl.name}
              </li>
            </button>
          ))}
        </ul>
      )}
    </>
  );
};
