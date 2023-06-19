import { FC } from 'react';
import style from './IconButton.module.scss';

type Props = {
  svg: string;
  submit?: boolean;
};

export const IconButton: FC<Props> = ({ svg, submit = false }) => {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={style.button}
      onClick={
        submit ? () => {} : () => window.open('https://youtu.be/dQw4w9WgXcQ')
      }
    >
      <div
        style={{ backgroundImage: `url(${svg})` }}
        className={style.icon}
      >
      </div>
    </button>
  );
};
