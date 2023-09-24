/* eslint-disable quote-props */
import {
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { useMatch } from 'react-router-dom';
import { ModalContext } from '../../Providers/ModalProvider';
import { ProjectCardProps } from '../../Types/ProjectCardProps';
import './ProfilePage.scss';
import { getData } from '../../helpers/helpers';
import { LoaderBig } from '../../components/Loader/LoaderBig';
import { User } from '../../Types/User';
import { Profile } from './Profile/Profile';
import { Error } from '../../components/Error/Error';

type Props = {
  onCardClick: (value: ProjectCardProps) => void,
};

export const ProfilePage: React.FC<Props> = ({
  onCardClick,
}) => {
  const { setIsModal } = useContext(ModalContext);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [user] = useLocalStorage<User | null>('user', null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  const match = useMatch('/profile/:userId');
  const userId = match?.params.userId;

  const getUser = useCallback(async (id: string) => {
    setIsModal(false);

    try {
      setIsLoading(true);
      setIsError('');

      await getData(`users/${id || user?.id}`)
        .then((res: any) => setSelectedUser(res));
    } catch (error) {
      setIsError('An error occurred while attempting to load data from the server. An internal server error may be caused by technical glitches or issues within the system. Our experts have already been notified of this problem and are actively working to resolve it.We apologize for any inconvenience caused. Please try to load the data again later.If the issue persists, please contact our support team for further assistance.Thank you for your understanding.');
    } finally {
      setIsLoading(false);
    }
  }, [userId, user?.id]);

  useEffect(() => {
    getUser(userId!);
  }, [userId, user?.id]);

  return (
    <section className="profilePage">
      {isLoading && (
        <LoaderBig />
      )}

      {selectedUser && !isLoading && (
        <Profile user={selectedUser} onCardClick={onCardClick} />
      )}

      {isError && (
        <Error message={isError} />
      )}
    </section>
  );
};
