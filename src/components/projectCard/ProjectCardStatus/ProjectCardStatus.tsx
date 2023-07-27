import classNames from 'classnames';
import './ProjectCardStatus.scss';

type Props = {
  status: string,
};

export const ProjectCardStatus: React.FC<Props> = ({ status }) => {
  return (
    <div
      className={classNames(
        'projectStatus',
        { 'projectStatus--green': status === 'In progress' },
        { 'projectStatus--orange': status === 'Recruitment' },
      )}
    >
      {status}
    </div>
  );
};
