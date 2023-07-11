import logo from '../../svg/logo.svg';
import './Logo.scss';

export const Logo = () => {
  return (
    <div className="logo" style={{ backgroundImage: `url('${logo}')` }} />
  );
};
