import React from 'react';
import classNames from 'classnames';
import { LoaderSmall } from '../../Loader/LoaderSmall';
import './EditProjectButton.scss';

type Props = {
  title: string,
  isDisabled?: boolean,
  onClick?: () => void,
  isLoader?: boolean,
};

export const EditProjectButton: React.FC<Props> = ({
  title,
  isDisabled = true,
  onClick,
  isLoader = false,
}) => {
  return (
    <button
      type="submit"
      className={classNames(
        'editProjectButton',
        { 'editProjectButton-disable': !isDisabled },
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
