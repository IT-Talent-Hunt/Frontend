import './FilterByItem.scss';
import cross from '../../../svg/cross-icon.svg';

type Props = {
  filter: string,
  onFilter: (value: string) => void,
};

export const FilterByItem: React.FC<Props> = ({ filter, onFilter }) => {
  return (
    <li className="filterByItem">
      <span>{filter}</span>

      <button
        type="button"
        className="filterByItem__cross"
        onClick={() => onFilter(filter)}
      >
        <div
          style={{ backgroundImage: `url('${cross}')` }}
          className="filterByItem__cross-img"
        />
      </button>
    </li>
  );
};
