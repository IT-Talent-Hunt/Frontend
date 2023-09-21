/* eslint-disable no-param-reassign */

import { Contact } from '../../Types/Contact';
import { ContactItem } from './ContactItem/ContactItem';
import { existContacts } from '../../helpers/Variables';
import './ContactsList.scss';

type Props = {
  list: Contact[],
  isEdit: boolean,
  setUserContacts: (value: Contact[]) => void,
};

export const ContactsList: React.FC<Props> = ({ list, isEdit = false, setUserContacts }) => {
  const usedTypesContacts = list.map((contact) => contact.platform);

  const restContacts: Contact[] = existContacts
    .filter((contact) => !usedTypesContacts.includes(contact.platform));

  const updateContact = (contact: Contact, prevContactPlatform: string) => {
    setUserContacts(list.map((element: Contact) => {
      if (element.platform === prevContactPlatform) {
        element = contact;
      }

      return element;
    }));
  };

  const wroteUserContact = list.filter((contact) => contact.url.length > 0);

  return (
    <ul className="contactsList">
      {isEdit ? (
        <>
          {list.map((contact) => (
            <ContactItem
              key={contact.platform}
              contact={contact}
              restList={restContacts}
              setContact={updateContact}
              setContacts={setUserContacts}
              isEdit={isEdit}
            />
          ))}
        </>
      ) : (
        <>
          {wroteUserContact.map((contact) => (
            <ContactItem
              key={contact.platform}
              contact={contact}
              restList={restContacts}
              setContact={updateContact}
              setContacts={setUserContacts}
              isEdit={isEdit}
            />
          ))}
        </>
      )}
    </ul>
  );
};
