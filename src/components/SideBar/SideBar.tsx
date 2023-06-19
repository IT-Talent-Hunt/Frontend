import { FC, useCallback, useState } from 'react';
import styles from './sideBar.module.scss';
import { CheckBoxList } from '../CheckBoxList/CheckBoxList';
import { RadioBtnList } from '../RadioBtnList/RadioBtnList';

export const SideBar: FC = () => {
  const [positions, setPositions] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [teamSize, setTeamSize] = useState('4');
  const [displayProjects, setDisplayProjects] = useState('16');
  const preMadePositions = ['Front-end developer', 'Back-end developer', 'Full-stack developer', 'DevOps', 'QA', 'Project Manager', 'UI/UX Designer'];
  const preMadeStatuses = ['All', 'Recruitment', 'In progress', 'Finished'];
  const preMadeTechnologies = ['TypeScript', 'Java', 'C#', 'Python', 'Assembly', 'Figma', 'HTML/CSS'];
  const teamSizes = ['2', '3', '4', '5', '6+'];
  const displayProjectsArr = ['8', '16', '24', '32'];

  const handleCheckbox = useCallback((evt: React.ChangeEvent<HTMLInputElement>, stateType: 'position' | 'status' | 'technologies') => {
    const val = evt.target.name;

    if (stateType === 'position') {
      if (positions.includes(val)) {
        setPositions(positions.filter((el) => el !== val));
      } else {
        setPositions([...positions, val]);
      }
    } else if (stateType === 'status') {
      if (statuses.includes(val)) {
        setStatuses(statuses.filter((el) => el !== val));
      } else {
        setStatuses([...statuses, val]);
      }
    } else if (stateType === 'technologies') {
      if (technologies.includes(val)) {
        setTechnologies(technologies.filter((el) => el !== val));
      } else {
        setTechnologies([...technologies, val]);
      }
    }
  }, [statuses, positions, technologies]);

  const handleClearAll = () => {
    setPositions([]);
    setStatuses([]);
    setTechnologies([]);
    setTeamSize('4');
    setDisplayProjects('16');
  };

  return (
    <div className={styles.main}>
      <div className={styles.heading__container}>
        <h4 className={styles.heading}>Filters</h4>
        <button type="button" onClick={handleClearAll}>
          Clear all
        </button>
      </div>
      <CheckBoxList
        list={preMadePositions}
        callbackFn={handleCheckbox}
        stateType="position"
        heading="Position"
        state={positions}
      />
      <CheckBoxList
        list={preMadeStatuses}
        callbackFn={handleCheckbox}
        stateType="status"
        heading="Status"
        state={statuses}
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
        state={technologies}
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
