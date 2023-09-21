import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Icon } from '../Icon/Icon';
import notificationIcon from '../../svg/notification.png';
import { MessagesTypes } from '../../redux/features/Messages/messages';
import './Notification.scss';
import cross from '../../svg/cross--icon-black.png';

type Props = {
  notification: MessagesTypes,
};

export const Notification: React.FC<Props> = ({ notification }) => {
  const [isMoveBack, setIsMoveBack] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsMoveBack(true);
    }, 10000);
  }, []);

  return (
    <div
      className={classNames(
        'notification',
        { notification__back: isMoveBack },
      )}
    >
      <button type="button" className="notification__icon-cross" onClick={() => setIsMoveBack(true)}>
        <Icon icon={cross} />
      </button>

      <div className="notification__icon-notification">
        <Icon icon={notificationIcon} />
      </div>

      <div className="notification__wrapper">
        <h4 className="notification__title">Notification</h4>

        <div className="notification__message">{notification.message}</div>
      </div>
    </div>
  );
};
