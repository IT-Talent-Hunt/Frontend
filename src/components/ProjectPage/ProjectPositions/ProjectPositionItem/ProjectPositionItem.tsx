import classNames from 'classnames';
import { Select } from '../../../../Types/InputField';

type Props = {
  item: Select,
  onPosition: (value: Select) => any,
  selectedPositions: Select[],
};

export const ProjectPositionItem: React.FC<Props> = ({ item, onPosition, selectedPositions }) => {
  const isDisabled = selectedPositions.includes(item);

  return (
    <li
      className={classNames(
        'projectPositions__list-item',
        { 'projectPositions__list-item--disabled': isDisabled },
      )}
    >
      <button
        type="button"
        onClick={() => onPosition(item)}
      >
        {item.name}
      </button>
    </li>
  );
};
