import './ProjectCardMembers.scss';

type Props = {
  members: number,
  maxMembers: number,
  isProfile?: boolean
};

export const ProjectCardMembers: React.FC<Props> = ({ members, maxMembers, isProfile = false }) => {
  return (
    <div className="projectMembers">
      <div className="projectMembers__icon" />
      {`${members}/${maxMembers} ${isProfile ? '' : 'members'}`}
    </div>
  );
};
