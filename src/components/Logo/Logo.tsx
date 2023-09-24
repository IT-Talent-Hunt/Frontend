import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../svg/logo.svg';
import './Logo.scss';

export const Logo = () => {
  const location = useLocation();

  return (
    <NavLink
      to={{
        pathname: '/',
        search: location.search,
      }}
    >
      <div
        className="logo"
        style={{ backgroundImage: `url('${logo}')` }}
      />
    </NavLink>
  );
};
