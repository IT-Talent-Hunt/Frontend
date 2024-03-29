import classNames from 'classnames';
import { useCallback, useState } from 'react';
import styles from '../InputField/InputField.module.scss';
import { SelectFieldType } from '../../Types/InputField';
import { List } from '../List/List';
import './InputSelect.scss';
import arrow from '../../svg/arrow-bottom.svg';

type Props = {
  input: SelectFieldType,
  setValue: (value: string) => void,
  isSignedUp?: boolean
};

export const InputSelect: React.FC<Props> = ({
  input,
  setValue,
}) => {
  const [isSeleted, setIsSelected] = useState<boolean>(false);
  const [hoveres, setHovered] = useState<string>('Choose');

  const {
    value,
    text,
    selections,
  } = input;

  const onPositionSelect = useCallback((selectName: string) => {
    setValue(selectName);
    setIsSelected(false);
  }, []);

  const onSelectHover = useCallback((selectName: string) => {
    setHovered(selectName);
  }, []);

  return (
    <label
      className={styles.label}
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
            <div className={classNames(styles.input, 'inputSelect__input')}>
              {value ? (
                <h1 className="inputSelect__placeholder inputSelect__placeholder-value">
                  {value}
                </h1>
              ) : (
                <h1 className="inputSelect__placeholder">
                  {hoveres}
                </h1>
              )}
            </div>
          </button>
        </div>

        <button
          type="button"
        >
          <div
            className={classNames(
              'inputSelect__arrow',
              [{ 'inputSelect__arrow-move': isSeleted }],
            )}
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
