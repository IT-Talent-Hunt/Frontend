import { NavLink, useLocation } from 'react-router-dom';
import { ProfileTool } from '../../../Types/ProfileTool';

import '../ProfileTools.scss';

type Props = {
  tool: ProfileTool,
  onClick: () => void,
};

export const ProfileToolsItem: React.FC<Props> = ({ tool, onClick = () => {} }) => {
  const location = useLocation();
  const { title, img, to } = tool;

  return (
    <NavLink
      to={{
        pathname: `/${to}`,
        search: location.search,
      }}
      onClick={() => onClick()}
    >
      <li className="profileTools__item">
        <div
          style={{ backgroundImage: `url('${img}')` }}
          className="profileTools__item-img"
        />

        <span className="profileTools__item-title">{title}</span>
      </li>
    </NavLink>
  );
};
