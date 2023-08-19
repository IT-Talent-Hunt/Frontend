import './ProjectCardComunaction.scss';
import { Communication } from '../../../Types/ProjectCardProps';

type Props = {
  comunication: Communication,
};

export const ProjectCardComunaction: React.FC<Props> = ({ comunication }) => {
  const { name, img, link } = comunication;

  return (
    <div className="projectComunacation">
      <div className="projectComunacation__communication">
        <i className={`${img} projectComunacation__icon`} />
        <span className="projectComunacation__app">{`${name}:`}</span>
      </div>

      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="projectComunacation__link"
      >
        {link}
      </a>
    </div>
  );
};
