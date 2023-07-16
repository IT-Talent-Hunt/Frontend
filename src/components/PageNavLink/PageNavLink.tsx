import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { IconButton } from '../IconButton/IconButton';

type Props = {
  to: string,
  text?: string,
  img?: string,
};

export const PageNavLink: React.FC<Props> = ({ to, text = false, img = false }) => {
  const location = useLocation();

  return (
    <NavLink
      to={{
        pathname: `/${to}`,
        search: location.search,
      }}
      style={{ cursor: 'pointer' }}
    >

      {typeof img === 'string' && (
        <IconButton svg={img} />
      )}

      {text && (
        <span>{text}</span>
      )}

    </NavLink>
  );
};
