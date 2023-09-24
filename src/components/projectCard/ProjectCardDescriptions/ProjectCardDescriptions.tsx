import './ProjectCardDescriptions.scss';
import { truncateText } from '../../../helpers/truncateText';

type Props = {
  description: string,
  isModal?: boolean,
};

export const ProjectCardDescriptions: React.FC<Props> = ({
  description,
  isModal = false,
}) => {
  let displayedDescription = description;

  if (!isModal) {
    displayedDescription = truncateText(description, 120);
  }

  return (
    <p className="projectDescription">{displayedDescription}</p>
  );
};
