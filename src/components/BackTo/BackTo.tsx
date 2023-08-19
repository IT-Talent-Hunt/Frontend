/* eslint-disable no-confusing-arrow */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackTo.scss';

type Props = {
  onClick?: (value: any) => void,
};

export const BackTo: React.FC<Props> = ({ onClick }) => {
  const navigation = useNavigate();

  return (
    <button
      type="button"
      className="back"
      onClick={() => onClick ? onClick(false) : navigation(-1)}
    >
      <div className="back__arrow" />

      <span className="back__title">Back</span>
    </button>
  );
};
