/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC } from 'react';
import styles from './ProjectModal.module.scss';
import { ProjectCardProps } from '../../Types/ProjectCardProps';
import favorite from '../../svg/heartEmpty.svg';

interface Props extends ProjectCardProps {
  onClick: (value: React.SetStateAction<boolean>) => void;
}

export const ProjectModal: FC<Props> = ({
  title,
  owner,
  status,
  members,
  maxMembers,
  description,
  creationDate,
  isFavorite,
  onClick,
}) => {
  return (
    <div className={styles.container}>

      <div className={styles.background} onClick={() => onClick(false)}></div>
      <div className={styles.modal}>
        <div className={styles.heading}>
          <div className={styles.heading__container}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.status}>{status}</div>
          </div>
        </div>
        <div className={styles.owner}>
          <h5 className={styles.owner__name}>{owner}</h5>
        </div>
        <div className={styles.members}>
          <div className={styles.members__icon} />
          {`${members}/${maxMembers} members`}
          {' '}

        </div>
        <div className={styles.members__boxFase}>
          <div className={styles.members__fase1}></div>
          <div className={styles.members__fase2}></div>
          <div className={styles.members__fase3}></div>
          <div className={styles.members__fase4}></div>
        </div>
        <h3 className={styles.communication}>Description</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.box}>
          <h3 className={styles.communication}>Communication</h3>
          <p className={styles.communication}>Telegram: https://t.me/+t_i2s-3vk1phZjEy</p>
        </div>
        <div className={styles.footer}>
          <div className={styles.footer__box}>
            <button type="button" className={styles.btn}>
              Apply
            </button>
            <div
              className={styles.favorite}
              style={{
                backgroundImage: isFavorite
                  ? `url(${favorite})`
                  : `url(${favorite})`,
              }}
            >
            </div>
            <p>Save</p>
          </div>
          <div className={styles.date__container}>
            <div className={styles.calendar__icon} />
            {creationDate}
          </div>
        </div>
      </div>
    </div>
  );
};
