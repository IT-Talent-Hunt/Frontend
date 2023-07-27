import './ProjectCardOwner.scss';

type Props = {
  owner: string,
};

export const ProjectCardOwner: React.FC<Props> = ({ owner }) => {
  return (
    <div className="projectOwner">
      <h5 className="projectOwner__name">{owner}</h5>
    </div>
  );
};
