import React from 'react';
import './TransparentButton.scss';

type Props = {
  title: string,
  onClick: (value: React.MouseEvent) => void,
};

export const TransparentButton: React.FC<Props> = ({ title, onClick }) => {
  return (
    <button
      type="button"
      className="transparentButton"
      onClick={onClick}
    >
      {title}
    </button>
  );
};
