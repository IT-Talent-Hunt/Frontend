import { FC } from 'react';
import style from './IconButton.module.scss';

type Props = {
  svg: string;
  onClick?: (value: any) => void,
};

export const IconButton: FC<Props> = ({ svg, onClick }) => {
  return (
    <button
      type="button"
      className={style.button}
      onClick={onClick}
    >
      <div
        style={{ backgroundImage: `url(${svg})` }}
        className={style.icon}
      >
      </div>
    </button>
  );
};
