/* eslint-disable no-nested-ternary, no-param-reassign */
import { useState } from 'react';
import classNames from 'classnames';
import { Contact } from '../../../Types/Contact';
import { Icon } from '../../Icon/Icon';
import arrowBottom from '../../../svg/arrow-bottom.svg';
import arrowTop from '../../../svg/arrow-top.svg';
import './ContactItem.scss';

type Props = {
  contact: Contact,
  restList: Contact[],
  setContact: (value: Contact) => void,
  setContacts: Function,
  isEdit: boolean
};

export const ContactItem: React.FC<Props> = ({
  contact,
  restList,
  setContact,
  setContacts,
  isEdit,
}) => {
  const [isRest, setIsRest] = useState(false);

  const { url, platform } = contact;

  const onContactValueHandle = (setValue: Function, event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setValue({ ...contact, url: value });

    setContacts((current: Contact[]) => [...current]
      .map((contactEl: Contact) => {
        if (contactEl.platform === contact.platform) {
          contactEl.url = value;
        }

        return contactEl;
      }));
  };

  const placeholder = `Enter ${platform} ${platform === 'Telegram'
    ? 'user name'
    : platform === 'Email'
      ? 'adress' : 'link'
  }`;

  return (
    <li className="contactItem">
      <div
        className={classNames(
          'contactItem-type',
          { 'contactItem-type--active': isRest },
        )}
      >
        <button type="button" onClick={() => setIsRest((current) => !current)}>
          <p className="contactItem-type_text">
            {platform}
          </p>

          <div
            className={classNames(
              { 'contactItem-type_arrow': isEdit },
              { 'contactItem-type_arrow-rotate': isRest },
            )}
          >
            {isEdit && (
              <Icon icon={isRest ? arrowTop : arrowBottom} />
            )}
          </div>
        </button>

        {isRest && isEdit && (
          <ul className="contactItem__rest">
            {restList.map((rest) => (
              <button
                key={rest.platform}
                type="button"
                onClick={() => setContact(rest)}
                className="contactItem__rest_button"
              >
                <li key={rest.platform} className="contactItem__rest_item">
                  <span className="contactItem__rest_item-text">{rest.platform}</span>
                </li>
              </button>
            ))}
          </ul>
        )}
      </div>

      {isEdit ? (
        <label className="contactItem__label">
          {platform === 'Telegram' && (
            <span>@:</span>
          )}

          <input
            type="text"
            id={platform}
            value={url}
            className="contactItem__input"
            placeholder={placeholder}
            onChange={(event) => onContactValueHandle(setContact, event)}
          />
        </label>
      ) : (
        <>
          {url ? (
            <a
              href={
                platform === 'Email'
                  ? `mailto:${url}`
                  : platform === 'Telegram'
                    ? `https://t.me/${url}/`
                    : url
              }
              target="_blank"
              rel="noreferrer"
              className="contactItem_link"
            >
              <span>{platform === 'Telegram' ? `@${url}` : url}</span>
            </a>
          ) : (
            <span className="contactItem_link">{placeholder}</span>
          )}
        </>
      )}
    </li>
  );
};
