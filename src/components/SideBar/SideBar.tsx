import {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './sideBar.module.scss';
import { CheckBoxList } from '../CheckBoxList/CheckBoxList';
import { RadioBtnList } from '../RadioBtnList/RadioBtnList';
import { FilterByList } from '../FilterByList/FilterByList';
import { updateSeachParams } from '../../helpers/UpdateSearchParams';

type Props = {
  position: string,
  setPosition: (prev: string) => void,
  status: string,
  setStatus: (value: string) => void,
  teamSize: string,
  setTeamSize: (value: string) => void,
};

export const SideBar: FC<Props> = ({
  position,
  setPosition,
  status,
  setStatus,
  teamSize,
  setTeamSize,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || '4';
  const preMadePositions = ['Front-end developer', 'Back-end developer', 'Full-stack developer', 'DevOps', 'QA', 'Project Manager', 'UI/UX Designer'];
  const preMadeStatuses = ['Recruitment', 'In progress', 'Finished'];
  const teamSizes = ['2', '3', '4', '5', '6+'];
  const displayProjectsArr = ['4', '8', '16', '24', '32'];

  const [allFilters, setAllFilters] = useState<string[]>([]);

  const pageReset = () => {
    setSearchParams(updateSeachParams(searchParams, { page: null }));
  };

  const setDisplayProjects = (value: string | null) => {
    setSearchParams(updateSeachParams(searchParams, { perPage: value }));
  };

  const filterHanlders = (stateType: string, value: string) => {
    if (stateType === 'position') {
      setAllFilters((current) => [...current].filter((el) => !preMadePositions.includes(el)));

      if (allFilters.includes(value)) {
        setPosition('');
      } else {
        setPosition(value);
      }
    } else if (stateType === 'status') {
      setAllFilters((current) => [...current].filter((el) => !preMadeStatuses.includes(el)));

      if (allFilters.includes(value)) {
        setAllFilters((current) => [...current].filter((el) => el !== value));
        setStatus('');
      } else {
        setStatus(value);
      }
    }
  };

  const onFilterHandler = (val: string) => {
    let valueStatus = '';

    if (preMadePositions.includes(val)) {
      valueStatus = 'position';
    } else {
      valueStatus = 'status';
    }

    filterHanlders(valueStatus, val);

    if (val.includes('members')) {
      setTeamSize('');
    }

    if (val.includes('displayed')) {
      setDisplayProjects('16');
    }

    setAllFilters((current) => [...current].filter((filter) => filter !== val));
  };

  const handleCheckbox = useCallback((evt: React.ChangeEvent<HTMLInputElement>, stateType: 'position' | 'status' | 'technologies') => {
    const val = evt.target.name;

    pageReset();

    filterHanlders(stateType, val);

    if (allFilters.includes(val)) {
      onFilterHandler(val);
    } else {
      setAllFilters((current) => [...current, val]);
    }
  }, [status, position]);

  const handleClearAll = () => {
    setPosition('');
    setStatus('');
    setTeamSize('');
    setDisplayProjects(null);
    setAllFilters([]);
  };

  useEffect(() => {
    if (teamSize) {
      setAllFilters((current) => {
        return [
          ...current.filter((el) => !el.includes('members')),
          `${teamSize} members`,
        ];
      });
    }
  }, [teamSize]);

  useEffect(() => {
    setAllFilters((current) => {
      return [
        ...current.filter((el) => !el.includes('displayed')),
        `${perPage} displayed`,
      ];
    });
  }, [perPage]);

  return (
    <div className={styles.main}>
      <div className={styles.heading__container}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <h4 className={styles.heading}>Filters</h4>

          <button type="button" onClick={handleClearAll} className={styles.clearAll}>
            Clear all
          </button>
        </div>

        {allFilters && (
          <FilterByList list={allFilters} onFilter={onFilterHandler} />
        )}
      </div>

      <CheckBoxList
        list={preMadePositions}
        callbackFn={handleCheckbox}
        stateType="position"
        heading="Position"
        state={allFilters}
      />

      <RadioBtnList
        list={teamSizes}
        state={teamSize}
        setState={setTeamSize}
        heading="Team size"
        groupName="team"
      />

      <CheckBoxList
        list={preMadeStatuses}
        callbackFn={handleCheckbox}
        stateType="status"
        heading="Status"
        state={allFilters}
      />

      <RadioBtnList
        list={displayProjectsArr}
        state={perPage}
        setState={setDisplayProjects}
        heading="Display projects"
        groupName="projects"
      />
    </div>
  );
};
