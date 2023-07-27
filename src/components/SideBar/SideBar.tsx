import {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styles from './sideBar.module.scss';
import { CheckBoxList } from '../CheckBoxList/CheckBoxList';
import { RadioBtnList } from '../RadioBtnList/RadioBtnList';
import { FilterByList } from '../FilterByList/FilterByList';

type Props = {
  positions: string[],
  setPositions: (prev: string[]) => void,
}
;
export const SideBar: FC<Props> = ({ positions, setPositions }) => {
  // const [positions, setPositions] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [teamSize, setTeamSize] = useState('4');
  const [displayProjects, setDisplayProjects] = useState('16');
  const preMadePositions = ['Front-end developer', 'Back-end developer', 'Full-stack developer', 'DevOps', 'QA', 'Project Manager', 'UI/UX Designer'];
  const preMadeStatuses = ['All', 'Recruitment', 'In progress', 'Finished'];
  const preMadeTechnologies = ['TypeScript', 'Java', 'C#', 'Python', 'Assembly', 'Figma', 'HTML/CSS'];
  const teamSizes = ['2', '3', '4', '5', '6+'];
  const displayProjectsArr = ['8', '16', '24', '32'];

  const [allFilters, setAllFilters] = useState<string[]>([]);

  const onFilterHandler = (val: string) => {
    if (val.includes('members')) {
      setTeamSize('4');
    }

    if (val.includes('displayed')) {
      setDisplayProjects('16');
    }

    setAllFilters((current) => [...current].filter((filter) => filter !== val));
  };

  const handleCheckbox = useCallback((evt: React.ChangeEvent<HTMLInputElement>, stateType: 'position' | 'status' | 'technologies') => {
    const val = evt.target.name;

    if (stateType === 'position') {
      setAllFilters((current) => [...current].filter((el) => !preMadePositions.includes(el)));

      if (allFilters.includes(val)) {
        setAllFilters((current) => [...current].filter((el) => el !== val));
        setPositions([]);
      } else {
        setPositions([val]);
      }
    } else if (stateType === 'status') {
      setAllFilters((current) => [...current].filter((el) => !preMadeStatuses.includes(el)));

      if (allFilters.includes(val)) {
        setAllFilters((current) => [...current].filter((el) => el !== val));
        setStatuses([]);
      } else {
        setStatuses([val]);
      }
    } else if (stateType === 'technologies') {
      if (technologies.includes(val)) {
        setTechnologies(technologies.filter((el) => el !== val));
      } else {
        setTechnologies([...technologies, val]);
      }
    }

    if (allFilters.includes(val)) {
      onFilterHandler(val);
    } else {
      setAllFilters((current) => [...current, val]);
    }
  }, [statuses, positions, technologies]);

  const handleClearAll = () => {
    setPositions([]);
    setStatuses([]);
    setTechnologies([]);
    setTeamSize('4');
    setDisplayProjects('16');
    setAllFilters([]);
  };

  useEffect(() => {
    setAllFilters((current) => {
      return [
        ...current.filter((el) => !el.includes('members')),
        `${teamSize} members`,
      ];
    });
  }, [teamSize]);

  useEffect(() => {
    setAllFilters((current) => {
      return [
        ...current.filter((el) => !el.includes('displayed')),
        `${displayProjects} displayed`,
      ];
    });
  }, [displayProjects]);

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
      <CheckBoxList
        list={preMadeStatuses}
        callbackFn={handleCheckbox}
        stateType="status"
        heading="Status"
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
        list={preMadeTechnologies}
        callbackFn={handleCheckbox}
        stateType="technologies"
        heading="Technologies"
        state={allFilters}
      />
      <RadioBtnList
        list={displayProjectsArr}
        state={displayProjects}
        setState={setDisplayProjects}
        heading="Display projects"
        groupName="projects"
      />
    </div>
  );
};
