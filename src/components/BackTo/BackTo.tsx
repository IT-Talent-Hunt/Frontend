import React from 'react';
import { useNavigate } from 'react-router-dom';
import arrow from '../../svg/arrow-left.svg';

export const BackTo = () => {
  const navigation = useNavigate();

  return (
    <button
      type="button"
      style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
      onClick={() => navigation(-1)}
    >
      <div
        style={{
          backgroundImage: `url('${arrow}')`,
          backgroundRepeat: 'no-repeat',
          width: '10px',
          height: '16px',
        }}
      />

      <span>Back</span>
    </button>
  );
};
