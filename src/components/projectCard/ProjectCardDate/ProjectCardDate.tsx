import './ProjectCardDate.scss';

type Props = {
  date: string,
};

export const ProjectCardDate: React.FC<Props> = ({ date }) => {
  return (
    <div className="projectDare">
      <div className="projectDare__icon" />
      {date}
    </div>
  );
};
