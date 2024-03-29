import React from 'react';
import { Select } from '../../Types/InputField';

type Props = {
  selections: Select[] | null,
  onSelect: (value: string) => void,
  onHover?: (value: string) => void,
};

export const List: React.FC<Props> = ({ selections, onSelect, onHover = () => {} }) => {
  return (
    <ul className="inputSelect__list">
      {selections?.map((selectEl: Select) => (
        <button
          type="button"
          key={selectEl.id}
          className="inputSelect__item"
          onMouseOver={() => onHover(selectEl.name)}
          onClick={() => onSelect(selectEl.name)}
          onFocus={() => onSelect(selectEl.name)}
        >
          <li>
            <span>
              {selectEl.name}
            </span>
          </li>
        </button>
      ))}
    </ul>
  );
};
