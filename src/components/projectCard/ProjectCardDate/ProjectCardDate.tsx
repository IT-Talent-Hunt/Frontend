import './ProjectCardDate.scss';

type Props = {
  date: string,
};

export const ProjectCardDate: React.FC<Props> = ({ date }) => {
  return (
    <div className="projectDate">
      <div className="projectDate__icon" />
      {date}
    </div>
  );
};
