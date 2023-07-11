import React from 'react';
import classNames from 'classnames';
import './CompleteButton.scss';

type Props = {
  title: string,
  isDisabled?: boolean,
  onClick?: () => void,
};

export const CompleteButton: React.FC<Props> = ({ title, isDisabled = true, onClick }) => {
  return (
    <button
      type="submit"
      className={classNames(
        'completeButton',
        { 'completeButton-disable': !isDisabled },
      )}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
