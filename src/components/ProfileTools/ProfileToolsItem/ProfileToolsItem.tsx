import { ProfileTool } from '../../../Types/ProfileTool';
import { IconButton } from '../../IconButton/IconButton';

import '../ProfileTools.scss';

type Props = {
  tool: ProfileTool,
  onClick: Function,
};

export const ProfileToolsItem: React.FC<Props> = ({ tool, onClick }) => {
  const { title, img } = tool;

  return (
    <button type="button" onClick={() => onClick()}>
      <li className="profileTools__item">
        <IconButton svg={img} />

        <span className="profileTools__item-title">{title}</span>
      </li>
    </button>
  );
};
