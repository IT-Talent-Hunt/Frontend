import './ProjectCardMembers.scss';

type Props = {
  members: number,
  maxMembers: number,
};

export const ProjectCardMembers: React.FC<Props> = ({ members, maxMembers }) => {
  return (
    <div className="projectMembers">
      <div className="projectMembers__icon" />
      {`${members}/${maxMembers} members`}
    </div>
  );
};
