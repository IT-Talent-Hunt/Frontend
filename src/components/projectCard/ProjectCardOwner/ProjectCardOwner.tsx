import { User } from '../../../Types/User';
import './ProjectCardOwner.scss';

type Props = {
  owner: User,
};

export const ProjectCardOwner: React.FC<Props> = ({ owner }) => {
  return (
    <div className="projectOwner">
      <h5 className="projectOwner__name">{owner.firstName}</h5>
    </div>
  );
};
