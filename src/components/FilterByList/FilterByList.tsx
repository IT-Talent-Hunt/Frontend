import { FilterByItem } from './FilterByItem/FilterByItem';
import './FilterByList.scss';

type Props = {
  list: string[],
  onFilter: (value: string) => void,
};

export const FilterByList: React.FC<Props> = ({ list, onFilter }) => {
  return (
    <ul className="filterByList">
      {list.map((filter) => (
        <FilterByItem
          key={filter}
          filter={filter}
          onFilter={onFilter}
        />
      ))}
    </ul>
  );
};
