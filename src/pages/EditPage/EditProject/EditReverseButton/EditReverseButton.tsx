import React from 'react';
import classNames from 'classnames';
import { LoaderSmall } from '../../../../components/Loader/LoaderSmall';
import './EditReverseButton.scss';

type Props = {
  title: string,
  isDisabled?: boolean,
  onClick?: () => void,
  isLoader?: boolean,
};

export const EditReverseButton: React.FC<Props> = ({
  title,
  isDisabled = true,
  onClick,
  isLoader = false,
}) => {
  return (
    <button
      type="submit"
      className={classNames(
        'editReverseButton',
        { 'editReverseButton-disable': !isDisabled },
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
