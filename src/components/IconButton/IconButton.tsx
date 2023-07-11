import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './IconButton.module.scss';

type Props = {
  svg: string;
  submit?: boolean;
};

export const IconButton: FC<Props> = ({ svg, submit = false }) => {
  const navigate = useNavigate();

  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={style.button}
      onClick={
        submit ? () => {} : () => navigate('profile')
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
