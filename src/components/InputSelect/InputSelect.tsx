/* eslint-disable */

import classNames from 'classnames';
import { useState } from 'react';
import styles from '../InputField/InputField.module.scss';
import { InputFieldType, SelectFieldType } from '../../Types/InputField';
import { List } from '../List/List';
import './InputSelect.scss';
import arrow from '../../svg/arrow-bottom.svg';

type Props = {
  input : SelectFieldType,
  setValue: (value: string) => void,
  isSignedUp?: boolean
};

export const InputSelect: React.FC<Props> = ({
  input,
  setValue,
}) => {
  const [isSeleted, setIsSelected] = useState(false);
  const [hoveres, setHovered] = useState('Choose');

  const {
    type,
    value,
    text,
    selections,
  } = input;

  const onPositionSelect = (selectName: string) => {
    setValue(selectName);
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
              setIsSelected((current) => !current);
              setHovered('Choose');
            }}
            className="inputSelect__button"
          >
            {/* <input
              type={type}
              id={type}
              name={name}
              defaultValue={value}
              onBlur={onBlur}
              className={classNames(
                styles.input,
                "inputSelect__input",
                { [styles.input__error]: isDirty && !isSuccess },
                { [styles.input__success]: !isDirty && isSuccess })}
              placeholder={hoveres}
              disabled={!!true}
            /> */}

            <div className={classNames(styles.input, "inputSelect__input")}>
              {value ? (
                <h1 className="inputSelect__placeholder inputSelect__placeholder-value">{value}</h1>
              ) : (
                <h1 className="inputSelect__placeholder">{hoveres}</h1>
              )}
            </div>
          </button>
        </div>

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
