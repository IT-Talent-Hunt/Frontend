import React from 'react';
import classNames from 'classnames';
import { LoaderSmall } from '../../Loader/LoaderSmall';
import './ProjectCardButton.scss';

type Props = {
  title: string,
  isDisabled?: boolean,
  onClick?: (event: React.MouseEvent<any>) => void,
  isLoader?: boolean,
};

export const ProjectCardButton: React.FC<Props> = ({
  title,
  isDisabled = true,
  onClick,
  isLoader = false,
}) => {
  return (
    <button
      type="submit"
      className={classNames(
        'projectButton',
        { 'projectButton-disable': !isDisabled },
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
