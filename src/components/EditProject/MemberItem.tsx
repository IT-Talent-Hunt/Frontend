import { useLocalStorage } from 'usehooks-ts';
import { User } from '../../Types/User';
import { EditProjectButton } from './EditProjectButton/EditProjectButton';

type Props = {
  user: User,
  onKick: (user: User) => void,
};

export const MemberItem: React.FC<Props> = ({ user, onKick }) => {
  const [currentUser] = useLocalStorage<any>('user', {});
  const { speciality, firstName, lastName } = user;

  return (
    <li className="project__member">
      <div className="project__member_title">{speciality}</div>
      <div className="project__member_title">{`${firstName} ${lastName}`}</div>

      <EditProjectButton
        title="Kick"
        onClick={() => onKick(user)}
        isDisabled={currentUser.id !== user.id}
      />
    </li>
  );
};
