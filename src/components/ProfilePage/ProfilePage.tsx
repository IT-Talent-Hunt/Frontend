/* eslint-disable max-len */
import { ChangeEvent, useState } from 'react';
import classnames from 'classnames';
import styles from './ProfilePage.module.scss';

export const ProfilePage = () => {
  const [ownerCurrent, setOwnerCurrent] = useState('Vitalii Rudenko');
  const [skills, setSlills] = useState('');
  const [linkEmail, setLinkEmail] = useState('');
  const [linkLinkedin, setLinkLinkedin] = useState('');
  const [linkTelegram, setLinkTelegram] = useState('');

  const [about, setAbout] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  // const [progects, setProgects] = useState([]);
  // const [history, setHistory] = useState([]);
  // const [skills, setSlills] = useState([]);
  // const [ongoing, setOngoing] = useState([]);

  const cleareForm = () => {
    setOwnerCurrent('');
    setSlills('');
    setLinkEmail('');
    setLinkLinkedin('');
    setLinkTelegram('');
    setAbout('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    cleareForm();
  };

  const handleSkillsChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setSlills(event.target.value);
  };

  const handleAboutChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setAbout(event.target.value);
  };

  const handleLinkEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLinkEmail(event.target.value);
  };

  const handleLinkLinkedinChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLinkLinkedin(event.target.value);
  };

  const handleLinkTelegramChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLinkTelegram(event.target.value);
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    isEditing
      ? (
        <div className={styles.profilePage__wrapper}>
          <div className={styles.profilePage__container}>
            <div className={`${styles.box__item}`}>
              <button
                type="submit"
                onClick={handleBackClick}
                className={styles.profilePage__back}
              >
                &#60; Back
              </button>
              <button
                type="submit"
                onClick={() => setIsEditing(false)}
                className={styles.profilePage__edit}
              >
                Edit
              </button>

            </div>
            <div className={styles.profilePage__foto}></div>
            <form
              className={`${styles.form}`}
              onSubmit={handleSubmit}
            >
              <h1 className={styles.form__header}>
                Hi,
                {ownerCurrent}
                !
              </h1>

              <ul className={`${styles.form__list}`}>
                <li className={`${styles.list__item} ${styles.item} ${styles.skills}`}>
                  <div className={`${styles.boxSkills__item}`}>
                    <label htmlFor="skills" className={styles.item__label}>
                      Skills
                    </label>
                    <div className={styles.item__textarea}>
                      UX research: Surveys,Heuristic Interface Analysis, Analyzing competitors, In-depth interviewingm Job stories & User stories, User persona, Product hypotheses, CJM & Kano model. Information Architecture Mapping, User flow, Prototyping , Usability testing, UI design & UI kit, HTML & CSS, Figma, Adobe Photoshop, Adobe Illustrator.
                    </div>
                  </div>
                </li>

                <li className={`${styles.list__item} ${styles.item}`}>
                  <div className={`${styles.box__item}`}>
                    <label className={`${styles.title__label}`}>Contactd</label>

                    <div className={`${styles.boxRight__item}`}>
                      <div className={styles.contacts__item} id="contacts">
                        <h5>Email:</h5>
                      </div>

                      <div className={styles.contacts__item} id="contacts">
                        <h5>Linkedin:</h5>
                      </div>

                      <div className={styles.contacts__item} id="contacts">
                        <h5>Telegram:</h5>
                      </div>
                    </div>
                  </div>
                </li>

                <li className={`${styles.list__item}`}>
                  <label htmlFor="about" className={`${styles.item__label} ${styles.about}`}>
                    About
                  </label>
                  <div className={styles.about__item} id="about">
                    <div className={`${styles.item__textarea}`}>
                      I am a UI/UX designer with a passion for creativity and professional development. I have completed UI/UX design courses and completed two projects. Additionally, I have a bachelor’s degree in software engineering, specialising in front-end development. I have experience working with graphic design software and in a team during an internship. I am seeking a role to continue growing my skills and collaborate with talented designers.
                    </div>
                  </div>
                </li>

                <li className={`${styles.list__item}`}>
                  <label htmlFor="about" className={`${styles.item__label} ${styles.about}`}>
                    Your projects
                  </label>
                  <div className={styles.about__item} id="about">
                    <div className={`${styles.item__textarea}`}>
                    </div>
                  </div>
                </li>

                <li className={`${styles.list__item}`}>
                  <label htmlFor="about" className={`${styles.item__label} ${styles.about}`}>
                    Project history
                  </label>
                  <div className={styles.about__item} id="about">
                    <div className={`${styles.item__textarea}`}>
                    </div>
                  </div>
                </li>

                <li className={`${styles.list__item}`}>
                  <label htmlFor="about" className={`${styles.item__label} ${styles.about}`}>
                    Ongoing project
                  </label>
                  <div className={styles.about__item} id="about">
                    <div className={`${styles.item__textarea}`}>
                    </div>
                  </div>
                </li>
              </ul>
            </form>
          </div>
        </div>
      )
      : (
        <div className={styles.profilePage__wrapper}>
          <div className={styles.profilePage__container}>
            <button
              type="submit"
              onClick={() => setIsEditing(true)}
              className={styles.profilePage__back}
            >
              &#60; Back
            </button>
            <div className={styles.profilePage__foto}></div>
            <form
              className={`${styles.form}`}
              onSubmit={handleSubmit}
            >
              <h1 className={styles.form__header}>
                Hi,
                {ownerCurrent}
                !
              </h1>

              <ul className={`${styles.form__list}`}>
                <li className={`${styles.list__item} ${styles.item} ${styles.skills}`}>
                  <div className={`${styles.boxSkills__item}`}>
                    <label htmlFor="skills" className={styles.item__label}>
                      Skills
                    </label>

                    <textarea
                      required
                      id="skills"
                      value={skills}
                      onChange={handleSkillsChange}
                      className={styles.item__textarea}
                      placeholder="Add skills"
                    />
                  </div>
                </li>

                <li className={`${styles.list__item} ${styles.item}`}>
                  <div className={`${styles.box__item}`}>
                    <div className={`${styles.title__item}`}>Contactd</div>

                    <div className={`${styles.boxRight__item}`}>
                      <div className={styles.contacts__item} id="contacts">
                        <div className={styles.item__select}>Email</div>
                        <input
                          type="link"
                          required
                          value={linkEmail}
                          onChange={handleLinkEmailChange}
                          className={`${styles.item__input}`}
                        />
                      </div>

                      <div className={styles.contacts__item} id="contacts">
                        <div className={styles.item__select}>Linkedin</div>
                        <input
                          type="link"
                          value={linkLinkedin}
                          onChange={handleLinkLinkedinChange}
                          className={`${styles.item__input}`}
                        />
                      </div>

                      <div className={styles.contacts__item} id="contacts">
                        <div className={styles.item__select}>Telegram</div>
                        <input
                          type="link"
                          value={linkTelegram}
                          onChange={handleLinkTelegramChange}
                          className={`${styles.item__input}`}
                        />
                      </div>
                    </div>
                  </div>
                </li>

                <li className={`${styles.list__item}`}>
                  <label htmlFor="about" className={`${styles.item__label} ${styles.about}`}>
                    About
                  </label>
                  <div className={styles.about__item} id="about">
                    <textarea
                      name="about"
                      className={`${styles.item__textarea}`}
                      value={about}
                      onChange={handleAboutChange}
                      placeholder="Add about"
                    />
                  </div>
                </li>
              </ul>

              <div className={styles.boxButtons__item}>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className={classnames(`${styles.form__button}`, `${styles.button__active}`)}
                >
                  Save
                </button>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className={classnames(`${styles.form__button}`, `${styles.button__inactive}`)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )
  );
};
