/* eslint-disable no-nested-ternary */

import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { MessagesTypes } from '../../../redux/features/Messages/messages';
import joinIcon from '../../../svg/join.png';
import rejected from '../../../svg/rejected.png';
import accpeted from '../../../svg/accepted.png';
import { formatVisibleDate } from '../../../helpers/helpers';
import './MessageItem.scss';
import { Icon } from '../../../components/Icon/Icon';
import { useAppDispatch } from '../../../redux/hooks';
import * as messagesActions from '../../../redux/features/Messages/messages';

type Props = {
  propsMessage: MessagesTypes,
};

export const MessageItem: React.FC<Props> = ({ propsMessage }) => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();

  const {
    message,
    requestId,
    creationDate,
    read,
  } = propsMessage;

  const displayedDate: string = formatVisibleDate(creationDate);

  function onMessagesClick(messageP: MessagesTypes) {
    dispatch(messagesActions.readedHandler(messageP.id));
    dispatch(messagesActions.take(messageP));
    navigation(`/requests/${requestId}`);
  }

  return (
    <li
      className={classNames(
        'messageItem',
        { messageItem__marker: !read },
      )}
    >
      <button
        type="button"
        onClick={() => onMessagesClick(propsMessage)}
        className="messageItem__button"
      >

        <Icon
          icon={
            message.includes('want to apply')
              ? joinIcon : message.includes('rejected')
                ? rejected : accpeted
          }
        />

        <p className="messageItem__message">
          {message}
        </p>

        <div className="messageItem__date">
          {displayedDate}
        </div>

      </button>
    </li>
  );
};
