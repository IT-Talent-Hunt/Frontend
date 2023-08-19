import { useState } from 'react';
import { Contact } from '../../Types/Contact';
import { ContactItem } from './ContactItem/ContactItem';
import './ContactsList.scss';

type Props = {
  list: Contact[],
  // list: any,
  isEdit: boolean,
  setUserContacts: (value: Contact[]) => void,
};

export const ContactsList: React.FC<Props> = ({ list, isEdit = false, setUserContacts }) => {
  const [firstContact, setFirstContact] = useState<Contact>(list[0]);
  const [secondContact, setSecondContact] = useState<Contact>(list[1]);
  const [thirdContact, setThirdContact] = useState<Contact>(list[2]);

  const usedTypesContacts = [firstContact.platform, secondContact.platform, thirdContact.platform];

  const restContacts: Contact[] = [...list]
    .filter((contact) => !usedTypesContacts.includes(contact.platform));

  /* eslint-disable-next-line */
  console.log(restContacts, usedTypesContacts);

  return (
    <ul className="contactsList">
      <ContactItem
        key={firstContact.platform}
        contact={firstContact}
        restList={restContacts}
        setContact={setFirstContact}
        setContacts={setUserContacts}
        isEdit={isEdit}
      />

      <ContactItem
        key={secondContact.platform}
        contact={secondContact}
        restList={restContacts}
        setContact={setSecondContact}
        setContacts={setUserContacts}
        isEdit={isEdit}
      />

      <ContactItem
        key={thirdContact.platform}
        contact={thirdContact}
        restList={restContacts}
        setContact={setThirdContact}
        setContacts={setUserContacts}
        isEdit={isEdit}
      />
    </ul>
  );
};
