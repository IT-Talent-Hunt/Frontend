import
{
  ChangeEvent,
  FC,
  // SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
// import Chips from 'react-chips';
// import classnames from 'classnames';
import styles from './EditProject.module.scss';
import { MemberItem } from './MemberItem';
import { PositionItem } from './PositionItem';

interface Person {
  name: string;
  role: string;
  id: number;
}

const dataMembers: Person[] = [
  { id: 1, name: 'Vitalii Rudenko', role: 'UI/UX Designer' },
  { id: 2, name: 'Pavel Ohiiko', role: 'Front-end developer' },
  { id: 3, name: 'Oleh Ivanuk', role: 'Front-end developer' },
  { id: 4, name: 'Artem Rymarchuk', role: 'Back-end developer' },
  { id: 5, name: 'Ivan Kucher', role: 'QA engineer' },
  { id: 6, name: '', role: 'QA engineer' },
];

export const EditProject: FC = () => {
  const [name, setName] = useState('Taskify');
  const [description, setDescription] = useState('"Taskify" is a simple web application with a user-friendly interface for task management. Users can create, track, and update their tasks, assign priorities, and set deadlines. The application also allows for collaborative task management, where teams can communicate and share files. The project\'s goal is to create a straightforward, efficient, and intuitive solution for task management to enhance productivity and organization in the work environment.');
  const [members, setMembers] = useState(dataMembers);
  const [messenger, setMessenger] = useState('Telegram');
  const [link, setLink] = useState('');
  const [newPosition, setNewPosition] = useState(true);

  const removeMember = async (memberId: number) => {
    setMembers(prevMembers => prevMembers.filter(({ id }) => id !== memberId));
  };

  // const projectRole = ['UI/UX designer',
  // 'Front-end developer', 'Back-end developer',
  // 'QA engineer', 'Project-manager', 'DevOps', 'Mentor'];

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [description]);

  const cleareForm = () => {
    setName('');
    setDescription('');
    setMessenger('Telegram');
    setLink('');
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    cleareForm();
  };

  const handleCancel = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleClickPlus = () => {
    setNewPosition(!newPosition);
  };

  const handleChangeMessenger = (event: ChangeEvent<HTMLSelectElement>) => {
    setMessenger(event.target.value);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptiChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  return (
    <div className={styles.newProject__wrapper}>
      <div className={styles.newProject__container}>
        <form
          className={`${styles.newProject__form} ${styles.form}`}
          onSubmit={handleSave}
        >
          <h1 className={styles.form__header}>Edit project</h1>
          <ul className={`${styles.form__list} ${styles.list}`}>
            <li className={`${styles.list__item} ${styles.item} ${styles.descriptions}`}>
              <div className={styles.item__title}>Name and description</div>
              <label htmlFor="name" className={styles.item__label}>
                Project name
              </label>
              <input
                type="text"
                required
                id="name"
                value={name}
                onChange={handleNameChange}
                className={styles.item__input}
                placeholder="Enter the name of the project"
              />
              <label htmlFor="description" className={styles.item__label}>
                Project description
              </label>
              <textarea
                required
                ref={textareaRef}
                id="description"
                value={description}
                onChange={handleDescriptiChange}
                className={`${styles.item__input} ${styles.description}`}
                placeholder="Enter the description of the project"
              />
            </li>
            <li className={`${styles.list__item} ${styles.item} ${styles.members}`}>
              <div className={styles.item__title}>Project members</div>
              {members.map((member) => {
                return (
                  <MemberItem
                    removeMember={removeMember}
                    member={member}
                    key={member.id}
                  />
                );
              })}
              {newPosition && (
                <PositionItem />
              )}
              <div className={styles.position}>
                <label
                  htmlFor="addPositionButton"
                  className={styles.position__label}
                >
                  Add position
                </label>
                <button
                  className={styles.position__button}
                  id="addPositionButton"
                  type="button"
                  onClick={handleClickPlus}
                >
                  +
                </button>
              </div>
            </li>
            <li className={`${styles.list__item} ${styles.item} ${styles.communication}`}>
              <div className={styles.item__title}>Communication</div>
              <label htmlFor="communication" className={styles.item__label}>
                Link for communication
              </label>
              <div className={styles.communication__item} id="communication">
                <select
                  name="select"
                  className={styles.item__select}
                  value={messenger}
                  onChange={handleChangeMessenger}
                >
                  <option value="Telegram">Telegram</option>
                  <option value="Discord">Discord</option>
                  <option value="Slack">Slack</option>
                </select>
                <input
                  type="link"
                  required
                  value={link}
                  onChange={handleLinkChange}
                  className={`${styles.item__input} ${styles.link}`}
                  placeholder={`Enter ${messenger} link`}
                />
              </div>
            </li>
          </ul>
          <div className={`${styles.form__buttons} ${styles.buttons}`}>
            <button
              type="submit"
              onClick={handleSave}
              className={`${styles.buttons__button} ${styles.buttons__save}`}
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={`${styles.buttons__button} ${styles.buttons__cancel}`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};
