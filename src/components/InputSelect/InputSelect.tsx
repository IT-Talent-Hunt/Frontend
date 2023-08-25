import classNames from 'classnames';
import { useState } from 'react';
import styles from '../InputField/InputField.module.scss';
import { InputFieldType } from '../../Types/InputField';
import { List } from '../List/List';
import './InputSelect.scss';
import arrow from '../../svg/arrow-bottom.svg';

type Props = {
  input : InputFieldType,
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
    isSuccess,
    text,
    selections,
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
    <label
      htmlFor={type}
      className={styles.label}
      id={type}
    >
      <div className="inputSelect">
        <div>
          <h4 className="inputSelect__title">{text}</h4>
          <button
            type="button"
            onClick={() => {
              setIsSelected(!isSeleted);
              setHovered('Choose');
            }}
            className="inputSelect__button"
          >
            <input
              type={type}
              id={type}
              name={name}
              value={value}
              onBlur={onBlur}
              className={classNames(styles.input,
                { [styles.input__error]: isDirty && !isSuccess },
                { [styles.input__success]: !isDirty && isSuccess })}
              placeholder={hoveres}
              disabled={!!true}
            />
          </button>
        </div>

        {isDirty && (
          <span className={styles.input__error_message}>
            <i className="bx bx-error" />
            <span>{message}</span>
          </span>
        )}

        {isSuccess && (
          <span className={styles.input__success_message}>
            <i className="bx bx-check" />
            <span>Success</span>
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

        {isSeleted && (
          <List
            selections={selections || null}
            onSelect={onPositionSelect}
            onHover={onSelectHover}
          />
        )}
      </div>
    </label>
  );
};
