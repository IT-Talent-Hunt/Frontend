import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { IconButton } from '../IconButton/IconButton';

type Props = {
  to?: string,
  text?: string,
  img?: string,
  onClick?: () => void,
};

export const PageNavLink: React.FC<Props> = ({
  to,
  text = false,
  img = false,
  onClick,
}) => {
  const location = useLocation();

  return (
    <NavLink
      to={{
        pathname: to ? `/${to}` : location.pathname,
        search: location.search,
      }}
      style={{ cursor: 'pointer' }}
    >

      {typeof img === 'string' && (
        <IconButton svg={img} onClick={onClick} />
      )}

      {text && (
        <span>{text}</span>
      )}

    </NavLink>
  );
};
