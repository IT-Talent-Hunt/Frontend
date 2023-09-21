import React from 'react';
import classNames from 'classnames';
import { LoaderSmall } from '../../Loader/LoaderSmall';
import './CompleteButton.scss';

type Props = {
  title: string,
  isDisabled?: boolean,
  onClick?: (value: React.MouseEvent) => void,
  isLoader?: boolean,
};

export const CompleteButton: React.FC<Props> = ({
  title,
  isDisabled = true,
  onClick,
  isLoader = false,
}) => {
  return (
    <button
      type="submit"
      className={classNames(
        'completeButton',
        { 'completeButton-disable': !isDisabled },
      )}
      disabled={!isDisabled}
      onClick={onClick}
    >

      {isLoader ? (
        <LoaderSmall />
      ) : (
        <span>{title}</span>
      )}
    </button>
  );
};
