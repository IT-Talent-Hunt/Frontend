import { FC } from 'react';
import style from './IconButton.module.scss';

type Props = {
  svg: string;
  submit?: boolean;
};

export const IconButton: FC<Props> = ({ svg, submit = false }) => {
  return (
    <button type={submit ? 'submit' : 'button'} className={style.button}>
      <div
        style={{ backgroundImage: `url(${svg})` }}
        className={style.icon}
      >
      </div>
    </button>
  );
};
