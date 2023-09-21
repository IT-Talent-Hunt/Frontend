import { useState } from 'react';
import { socialities } from '../../../helpers/Variables';
import { Select } from '../../../Types/InputField';
import { ProjectPositionItem } from './ProjectPositionItem/ProjectPositionItem';
import cross from '../../../svg/cross2.png';
import './ProjectPositions.scss';

type Props = {
  selectedPositions: Select[],
  setSelectedPositions: Function,
};

export const ProjectPositions: React.FC<Props> = ({ selectedPositions, setSelectedPositions }) => {
  const [query, setQuery] = useState<string>('');

  const onQueryHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
  };

  const onSelectedPositionsAdd = (item: Select) => {
    if (selectedPositions.indexOf(item) === -1) {
      setQuery('');
      setSelectedPositions((current: Select[]): Select[] => [...current, item]);
    }
  };

  const onSelectedPositionsFilter = (item: Select) => {
    setSelectedPositions((current: Select[]) => [...current].filter((el) => el.name !== item.name));
  };

  const visiblePosition = [...socialities].filter((position) => {
    const lowerPositionName = position.name.toLowerCase();
    const lowerQuery = query.toLowerCase();

    return lowerPositionName.includes(lowerQuery);
  });

  return (
    <div className="projectPositions">
      <label className="projectPositions__container" htmlFor="input">
        <ul className="projectPositions__selected_list">
          {selectedPositions.map((position) => (
            <li
              key={position.id}
              className="projectPositions__selected_item"
            >
              <span className="projectPositions__selected_item-name">{position.name}</span>

              <button
                type="button"
                className="projectPositions__selected_cross"
                onClick={() => onSelectedPositionsFilter(position)}
              >
                <div
                  style={{ backgroundImage: `url('${cross}')` }}
                  className="projectPositions__selected_cross-img"
                />
              </button>
            </li>
          ))}

          <input
            id="input"
            className="projectPositions__input"
            type="text"
            value={query}
            onChange={(event) => onQueryHandle(event)}
            placeholder="Type the position"
          />
        </ul>
      </label>

      {query && (
        <ul className="projectPositions__list">
          {!visiblePosition.length && (
            <span className="projectPositions__nothing">Nothing found</span>
          )}

          {visiblePosition.map((sociality) => (
            <ProjectPositionItem
              key={sociality.id}
              item={sociality}
              onPosition={onSelectedPositionsAdd}
              selectedPositions={selectedPositions}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
