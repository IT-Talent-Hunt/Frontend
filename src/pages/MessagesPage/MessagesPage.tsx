/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import * as messagesActions from '../../redux/features/Messages/messages';
import { User } from '../../Types/User';
import './MessagesPage.scss';
import { LoaderBig } from '../../components/Loader/LoaderBig';
import { Error } from '../../components/Error/Error';
import { MessageItem } from './MessageItem/MessageItem';
import bell from '../../svg/bell--purple.png';
import messagesIcon from '../../svg/notification.png';
import { Icon } from '../../components/Icon/Icon';
import { Empty } from '../../components/Empty/Empty';

export const Messages = () => {
  const dispatch = useAppDispatch();
  const { messages, messagesError, messagesLoader } = useAppSelector(state => state.messages);

  const [user] = useLocalStorage<User | null>('user', null);

  useEffect(() => {
    dispatch(messagesActions.init(user?.id!));

    return () => {
      dispatch(messagesActions.clear());
    };
  }, []);

  /* eslint-disable-next-line */
  console.log(messages);

  const arhiveMessage = messages.filter((m) => m.read === true);
  const newMessages = messages.filter((m) => m.read === false);

  /* eslint-disable-next-line */
  console.log(arhiveMessage, newMessages);

  return (
    <section className="messagesPage">

      {messagesLoader ? (
        <LoaderBig />
      ) : (
        <>
          {typeof messagesError === 'string' ? (
            <Error message={messagesError} />
          ) : (
            <>
              <div className="messagesPage__wrapper">
                <div className="messagesPage__container">
                  <div className="messagesPage__top">
                    <Icon icon={bell} />

                    <h3 className="messagesPage__title">New messages</h3>
                  </div>

                  {newMessages.length ? (
                    <ul className="messagesPage__list">
                      {newMessages.map((message) => (
                        <MessageItem key={message.id} propsMessage={message} />
                      ))}
                    </ul>
                  ) : (
                    <Empty />
                  )}
                </div>

                <div className="messagesPage__container">
                  <div className="messagesPage__top">
                    <Icon icon={messagesIcon} />

                    <h3 className="messagesPage__title">Messages</h3>
                  </div>

                  {arhiveMessage.length ? (
                    <ul className="messagesPage__list">
                      {arhiveMessage.map((message) => (
                        <MessageItem key={message.id} propsMessage={message} />
                      ))}
                    </ul>
                  ) : (
                    <Empty />
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};
