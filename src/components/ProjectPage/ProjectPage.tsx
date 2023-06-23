import {
  ChangeEvent,
  FC,
  SetStateAction,
  useState,
} from 'react';
import Chips from 'react-chips';
import classnames from 'classnames';
import styles from './ProjectPage.module.scss';

export const ProjectPage: FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState([]);
  const [messenger, setMessenger] = useState('Telegram');
  const [link, setLink] = useState('');

  const projectRole = ['UI/UX designer', 'Front-end developer', 'Back-end developer', 'QA engineer', 'Project-manager', 'DevOps', 'Mentor'];

  const cleareForm = () => {
    setName('');
    setDescription('');
    setMembers([]);
    setMessenger('Telegram');
    setLink('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    cleareForm();
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

  const handleMembersChange = (newChips: SetStateAction<never[]>) => {
    setMembers(newChips);
  };

  const handleLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  return (
    <div className={styles.newProject__wrapper}>
      <div className={styles.newProject__container}>
        <form
          className={`${styles.newProject__form} ${styles.form}`}
          onSubmit={handleSubmit}
        >
          <h1 className={styles.form__header}>Create your own project with a team!</h1>
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
                id="description"
                value={description}
                onChange={handleDescriptiChange}
                className={`${styles.item__input} ${styles.description}`}
                placeholder="Enter the description of the project"
              />
            </li>
            <li className={`${styles.list__item} ${styles.item} ${styles.members}`}>
              <div className="item__title">Project members</div>
              <Chips
                value={members}
                onChange={handleMembersChange}
                suggestions={projectRole}
                uniqueChips={false}
              />
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
          <button
            type="submit"
            onClick={handleSubmit}
            className={classnames(
              ((name.length && description.length && members.length && link.length) !== 0)
                ? `${styles.form__button}`
                : `${styles.button__inactive}`,
            )}
          >
            Create
          </button>
        </form>
      </div>
    </div>

  );
};
